import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './sonosDefaultPlayer.scss';

//create interface for state
interface ISonosDeafultPlayerState {
    allSongs: ISong[]
    interval: any
    value: string
}

//interface for the array
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
            value: ''
        }
    }


    componentDidMount() {
        this.getAllCurrentlyPlaying();
        const interval = setInterval(() =>

            //interval to make get-request every 5sec
            this.getAllCurrentlyPlaying(), 5000);

        this.setState({
            interval: interval
        })
    }

    //clear state of interval 
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    //function to loop through the axios requests
    getAllCurrentlyPlaying() {
        //create empty array 
        let songs: any = []
        //map through the requests
        const zones = ['Sjöglimt', 'Myshörnan', 'Bangården', 'Kök', 'Femman']
        //map through the original array zones, each loop creates variable speaker
        const allRequests = zones.map(speaker => {
            return axios.get(`http://localhost:5005/${speaker}/state`)
        })

        //perform multiple get requests on the new array
        axios.all(allRequests)
            .then((allResponses: any) => {

                songs = allResponses.map((obj: any, index: number) => ({
                    room: zones[index],
                    currentTrack: obj.data.currentTrack,
                    playbackState: obj.data.playbackState,
                    volume: obj.data.volume
                }))

                this.setState({
                    allSongs: songs
                })

            }).catch((error: any) => {
                console.log(error)
            })
    }

    playPause = (room: string, isPlaying: boolean) => {
        const playState = isPlaying ? 'pause' : 'play'
        const roomIndex = this.state.allSongs.findIndex(song => song.room === room)

        axios.get(`http://localhost:5005/${room}/${playState}`)
            .then((res: any) => {

                this.setState(state => {
                    const list = state.allSongs.map((song, songIndex) => {
                        if (songIndex === roomIndex) {
                            return { ...song, playbackState: isPlaying ? 'PAUSED_PLAYBACK' : 'PLAYING' }
                        } else {
                            return song;
                        }
                    });
                    return {
                        allSongs: list
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
        const currentlyPlayingSingle = this.state.allSongs.filter((obj: any) =>
            obj.playbackState === 'PLAYING'
        )

        const songToRender = currentlyPlayingSingle.length > 0 ? currentlyPlayingSingle[0] : this.state.allSongs[0]

        return songToRender ? (<>
            <h1>Sonos player!</h1>
            <p>{songToRender.currentTrack.artist}</p>
            <p>{songToRender.currentTrack.title}</p>
            <p>{songToRender.volume}</p>
            <p>{songToRender.playbackState}</p>
            <p>{songToRender.room}</p>
            <button type="submit" onClick={() => this.playPause(songToRender.room, songToRender.playbackState === 'PLAYING')}>{songToRender.playbackState === 'PLAYING' ? 'pause' : 'play'}</button>
            <input type="text" value={this.state.value} id={songToRender.room} onChange={this.changeVolume}></input>
            <Link to="/sonosplayers">Show all Sonos players</Link>
        </>) : null 
    }
}

export default SonosDefaultPlayer