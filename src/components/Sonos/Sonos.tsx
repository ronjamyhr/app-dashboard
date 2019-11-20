import React from 'react'

import axios from 'axios'
import './sonos.scss'
import { Link } from 'react-router-dom'
// @ts-ignore
import Typical from 'react-typical'
import { Slider } from '@material-ui/core'

interface ISonosState {
  currentlyPlaying: ISongsArray[]
  interval: any
  // value: number
}

interface ISongsArray {
  currentTrack: any
  playbackState: string
  room: string
  volume: number
}

class Sonos extends React.Component<{}, ISonosState> {
  getAllGroups: any
  constructor(props: any) {
    super(props)
    this.state = {
      currentlyPlaying: [
        {
          currentTrack: {
            artist: '',
            title: '',
          },
          playbackState: '',
          room: '',
          volume: 0,
        },
      ],
      interval: '',
      // value: 0
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
    //map through all the requests
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

    axios.get(`http://localhost:5005/${room}/${playState}`).then((res: any) => {
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
    })
  }

  changeVolume = (e: any, newValue: any, displayedSongs: any) => {
    e.preventDefault()

    const id = displayedSongs.room
    const previousValue = displayedSongs.volume
    const diff = newValue - previousValue

    console.log('mitt id', id)
    console.log('tidigare volym', previousValue)
    console.log('ändringen', newValue)

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
      .then((res: any) => {})
  }

  public render() {
    const displaySongs = this.state.currentlyPlaying

    return (
      <div className="content">
        <div className="sonos-header-wrapper">
          <div className="sonos-header-box animate fade-in-left one"></div>
          <h1 className="sonos-header animate expand-header two">sounds.</h1>
          <Link className="sonos-link animate fade-in-right three" to="/">
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
      </div>
    )
  }
}

export default Sonos
