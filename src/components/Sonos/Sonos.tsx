import React from 'react'
import axios from 'axios'
import './sonos.scss'
import { Link } from 'react-router-dom'
// @ts-ignore
import { Slider } from '@material-ui/core'

interface ISonosState {
  currentlyPlaying: ISongsArray[]
  interval: any
  value: string
}

interface ISongsArray {
  currentTrack: {
    artist: string
    title: string
  }

  playbackState: string
  room: string
  volume: number
}

class Sonos extends React.Component<{}, ISonosState> {
  getAllGroups: any
  constructor(props: any) {
    super(props)
    this.state = {
      currentlyPlaying: [],
      interval: '',
      value: '',
    }
  }

  componentDidMount() {
    this.getCurrentlyPlaying()

    const interval = setInterval(() => this.getCurrentlyPlaying(), 5000)
    this.setState({
      interval: interval,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  getCurrentlyPlaying() {
    let songs: any[] = []
    const rooms = ['Sjöglimt', 'Myshörnan', 'Bangården', 'Kök', 'Femman']
    const allRequests = rooms.map(group => {
      return axios.get(`http://localhost:5005/${group}/state`)
    })

    //perform multiple get-requests
    axios
      .all(allRequests)
      .then((allResponses: any) => {
        songs = allResponses.map((originalObject: any, index: number) => {
          return {
            room: rooms[index],
            currentTrack: originalObject.data.currentTrack,
            playbackState: originalObject.data.playbackState,
            volume: originalObject.data.volume,
          }
        })

        this.setState({
          currentlyPlaying: songs,
        })
      })

      .catch((error: any) => {
        console.log(error)
      })
  }

  playPause = (room: string, isPlaying: boolean) => {
    const playState = isPlaying ? 'pause' : 'play'
    const roomIndex = this.state.currentlyPlaying.findIndex(
      song => song.room === room
    )

    this.setState(state => {
      const list = state.currentlyPlaying.map((song, songIndex) => {
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
        currentlyPlaying: list,
      }
    })

    axios
      .get(`http://localhost:5005/${room}/${playState}`)
      .then((res: any) => { })
  }

  changeVolume = (e: any, newValue: any, displayedSongs: any) => {
    e.preventDefault()
    const id = displayedSongs.room
    const previousValue = displayedSongs.volume
    const diff = newValue - previousValue
    const sign = diff > 0 ? '+' : '-'
    const roomIndex = this.state.currentlyPlaying.findIndex(
      song => song.room === id
    )

    this.setState(state => {
      const list = state.currentlyPlaying.map((song, songIndex) => {
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
        currentlyPlaying: list,
      }
    })

    axios
      .get(`http://localhost:5005/${id}/volume/${sign}${Math.abs(diff)}`)
      .then((res: any) => { })
  }

  scrollUpButton = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  public render() {
    const displaySongs = this.state.currentlyPlaying

    return (
      <div className="content">
        <div className="sonos-header-wrapper">
          <div className="sonos-header-box animate fade-in-left one"></div>
          <h1 className="sonos-header animate expand-header three">sounds.</h1>
          <Link className="sonos-link animate fade-in-down two" to="/">
            <button className="sonos-button">home</button>
          </Link>
        </div>

        <div className="sonos-wrapper">
          <ul className="sonos-container">
            {displaySongs.map(displayedSongs => (
              <li className="sonos-single-container" key={displayedSongs.room}>
                <button
                  className="music-button"
                  type="submit"
                  onClick={() =>
                    this.playPause(
                      displayedSongs.room,
                      displayedSongs.playbackState === 'PLAYING'
                    )
                  }
                >
                  {displayedSongs.playbackState === 'PLAYING' ? (
                    <i className="icon far fa-pause-circle"></i>
                  ) : (
                      <i className="icon far fa-play-circle"></i>
                    )}
                </button>

                <p className="artist-heading">
                  {displayedSongs.currentTrack.artist}
                </p>

                <p className="songtitle-heading">
                  -{displayedSongs.currentTrack.title}
                </p>

                <div className="slider-box">
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={displayedSongs.volume}
                    className="sonos-volume"
                    onChange={(e: any, newValue: any) =>
                      this.changeVolume(e, newValue, displayedSongs)
                    }
                  />
                  <i className="volume-icon fas fa-volume-up"></i>
                </div>
                <div className="sonos-heading-container">
                  <hr className="sonos-heading-line" />
                  <p className="room-heading">{displayedSongs.room}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sonos-button-wrapper">
          <button className="sonos-button-up" onClick={this.scrollUpButton}>
            <i className="button-up-icon fas fa-angle-up"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Sonos
