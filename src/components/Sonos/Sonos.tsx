import React from 'react';

import axios from 'axios';
import './sonos.scss';
import { Link } from 'react-router-dom';
// @ts-ignore
import Typical from 'react-typical';








interface ISonosState {
    currentlyPlaying: ISongsArray[]
    interval: any
    value: string
}

interface ISongsArray {
    currentTrack: any
    playbackState: string
    room: string
    volume: number
}

class Sonos extends React.Component<{}, ISonosState>{
    getAllGroups: any;
    constructor(props: any) {
        super(props)
        this.state = {
            currentlyPlaying: [
                {
                    currentTrack: {
                        artist: '',
                        title: ''
                    },
                    playbackState: '',
                    room: '',
                    volume: 0
                }
            ],
            interval: '',
            value: ''
        }
    }


    componentDidMount() {
        this.getCurrentlyPlaying();

        const interval = setInterval(() => this.getCurrentlyPlaying(), 5000);
        this.setState({
            interval: interval
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
        axios.all(allRequests)
            .then((allResponses: any) => {

                songs = allResponses.map((originalObject: any, index: number) => {
                    return {
                        room: rooms[index],
                        currentTrack: originalObject.data.currentTrack,
                        playbackState: originalObject.data.playbackState,
                        volume: originalObject.data.volume
                    }
                })

                this.setState({
                    currentlyPlaying: songs
                })
            })

            .catch((error: any) => {
                console.log(error)
            })
    }


    playPause = (room: string, isPlaying: boolean) => {
        const playState = isPlaying ? 'pause' : 'play'
        const roomIndex = this.state.currentlyPlaying.findIndex(song => song.room === room)

        axios.get(`http://localhost:5005/${room}/${playState}`)
            .then((res: any) => {
                this.setState(state => {
                    const list = state.currentlyPlaying.map((song, songIndex) => {

                        if (songIndex === roomIndex) {
                            return { ...song, playbackState: isPlaying ? 'PAUSED_PLAYBACK' : 'PLAYING' }
                        } else {
                            return song;
                        }
                    });
                    return {
                        currentlyPlaying: list
                    };
                });
            })
    }


    changeVolume = (e: any) => {
        e.preventDefault();
        const { id } = e.target
        //Hårdkodade värden tillsvidare
        const newValue = 60
        const previousValue = 50
        const diff = newValue - previousValue
        const sign = diff > 0 ? '+' : '-'

        axios.get(`http://localhost:5005/${id}/volume/${sign}${Math.abs(diff)}`)
            .then((res: any) => {
            })
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
                    <p>prototyp are  {' '}</p>
                    <Typical
                        steps={['[a code lab]', 3000, '[fearless generalists]', 3000, '[an academy for tech wizards]', 3000,]}
                        loop={Infinity}
                        wrapper="sonos-wrapper"
                    />
                    <ul className="sonos-container">


                        {displaySongs.map(displayedSongs => (

                            <li className="sonos-single-container" key={displayedSongs.room}>

                                <p>{displayedSongs.currentTrack.artist}</p>
                                <p>{displayedSongs.currentTrack.title}</p>
                                <p>{displayedSongs.volume}</p>
                                <button className="button" type="submit" onClick={() => this.playPause(displayedSongs.room, displayedSongs.playbackState === 'PLAYING')}>{displayedSongs.playbackState === 'PLAYING' ? 'pause' : 'play'}</button>
                                <input className="volume" type="text" value={this.state.value} id={displayedSongs.room} onChange={this.changeVolume}></input>
                                <hr className="sonos-heading-line" />
                                <p className="sonos-text-room">{displayedSongs.room}</p>
                            </li>
                        

                        ))}

                    </ul>


                </div>

            </div>
        );
    }
}

export default Sonos;	
