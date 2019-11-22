import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './sonosDefaultPlayer.scss'
import { Slider } from '@material-ui/core'

interface ISonosDeafultPlayerState {
  allSongs: ISong[]
  interval: any
  value: string
}

interface ISong {
  currentTrack: {
    artist: string
    title: string
  }
  playbackState: string
  room: string
  volume: number
}

class SonosDefaultPlayer extends React.Component<{}, ISonosDeafultPlayerState> {
  constructor(props: any) {
    super(props)
    this.state = {
      allSongs: [],
      interval: '',
      value: '',
    }
  }

  componentDidMount() {
    this.getAllCurrentlyPlaying()
    const interval = setInterval(
      () =>
        //interval to make get-request every 5sec
        this.getAllCurrentlyPlaying(),
      5000
    )

    this.setState({
      interval: interval,
    })
  }

  //clear state of interval
  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  getAllCurrentlyPlaying() {
    let songs: any = []
    const zones = ['Sjöglimt', 'Myshörnan', 'Bangården', 'Kök', 'Femman']
    //map through the original array [zones], each loop creates variable speaker
    const allRequests = zones.map(speaker => {
      return axios.get(`http://localhost:5005/${speaker}/state`)
    })

    //perform multiple get requests on the new array
    axios
      .all(allRequests)
      .then((allResponses: any) => {
        songs = allResponses.map((obj: any, index: number) => ({
          room: zones[index],
          currentTrack: obj.data.currentTrack,
          playbackState: obj.data.playbackState,
          volume: obj.data.volume,
        }))

        this.setState({
          allSongs: songs,
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  playPause = (room: string, isPlaying: boolean) => {
    const playState = isPlaying ? 'pause' : 'play'
    const roomIndex = this.state.allSongs.findIndex(song => song.room === room)

    this.setState(state => {
      const list = state.allSongs.map((song, songIndex) => {
        if (songIndex === roomIndex) {
          return {
            ...song,
            playbackState: isPlaying ? 'PAUSED_PLAYBACK' : 'PLAYING',
          }
        } else {
          return song
        }
      })
      return {
        allSongs: list,
      }
    })

    axios
      .get(`http://localhost:5005/${room}/${playState}`)
      .then((res: any) => { })
  }

  changeVolume = (e: any, newValue: any, songToRender: any) => {
    const id = songToRender.room
    const previousValue = songToRender.volume
    const diff = newValue - previousValue
    const sign = diff > 0 ? '+' : '-'
    const roomIndex = this.state.allSongs.findIndex(song => song.room === id)

    this.setState(state => {
      const list = state.allSongs.map((song, songIndex) => {
        if (songIndex === roomIndex) {
          return {
            ...song,
            volume: newValue,
          }
        } else {
          return song
        }
      })
      return {
        allSongs: list,
      }
    })

    axios
      .get(`http://localhost:5005/${id}/volume/${sign}${Math.abs(diff)}`)
      .then((res: any) => { })
  }

  public render() {
    const currentlyPlayingSingle = this.state.allSongs.filter(
      (obj: any) => obj.playbackState === 'PLAYING'
    )

    const songToRender =
      currentlyPlayingSingle.length > 0
        ? currentlyPlayingSingle[0]
        : this.state.allSongs[0]

    return songToRender ? (
      <div className="sonosdefault-container">
        <div className="sonosdefault-content-container">
          <div className="sonosdefault-top">
            <p className="sonosdefault-artist">
              {songToRender.currentTrack.artist}
            </p>
            <button
              className="music-button"
              type="submit"
              onClick={() =>
                this.playPause(
                  songToRender.room,
                  songToRender.playbackState === 'PLAYING'
                )
              }
            >
              {songToRender.playbackState === 'PLAYING' ? (
                <i className="icon far fa-pause-circle"></i>
              ) : (
                  <i className="icon far fa-play-circle"></i>
                )}
            </button>
          </div>
          <p className="sonosdefault-title">
            {songToRender.currentTrack.title}
          </p>

          <div className="slider-box">
            <Slider
              min={0}
              max={100}
              step={1}
              value={songToRender.volume}
              className="sonos-volume"
              onChange={(e: any, newValue: any) =>
                this.changeVolume(e, newValue, songToRender)
              }
            />
            <i className="volume-icon fas fa-volume-up"></i>
          </div>
          <p className="sonosdefault-room">{songToRender.room}</p>
        </div>
        <div className="sonosdefault-heading-container">
          <Link className="sonosdefault-link" to="/sonosplayers">
            <button className="sonosdefault-button">all players</button>
          </Link>
          <hr className="sonosdefault-heading-line" />
          <h2 className="sonosdefault-heading">PLAY MUSIC</h2>
        </div>
      </div>
    ) : null
  }
}

export default SonosDefaultPlayer
