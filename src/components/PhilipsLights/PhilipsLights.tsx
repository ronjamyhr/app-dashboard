import React from 'react';
import './philipsLights.scss';
import LightItem from './LightItem/LightItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ILights } from '../../types/Light';
import { AppState } from '../..';
import { startFetchLights, startUpdateLight } from '../../actions/lights';
import { bindActionCreators } from 'redux';
import { AppActions } from "../../types/actions";
import { ThunkDispatch } from 'redux-thunk';

interface IState {
    interval: any;
}

type IProps = LinkStateProps & LinkDispatchProps;

class PhilipsLights extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            interval: ''
        }

        this.updateLight = this.updateLight.bind(this);
        this.mapPhilipsLights = this.mapPhilipsLights.bind(this);
        this.scrollUpButton = this.scrollUpButton.bind(this);
    }

    componentDidMount() {
        this.props.fetchLights();

        // Execute the function every 30 seconds
        const interval = setInterval(this.props.fetchLights, 30000);

        this.setState({
            interval: interval
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    updateLight(id: string, isOn: boolean, brightnessValue: number) {
        this.props.updateLight(id, isOn, brightnessValue);
    }

    mapPhilipsLights() {

        const data = this.props.lights;
        const lightItems: any = [];

        Object.keys(data).map(id => {

            const item = data[id];

            const light = <LightItem key={id} id={id} name={data[id].name}
                isOn={item.state.on} bri={item.state.bri}
                reachable={item.state.reachable}
                updateLight={this.updateLight} />

            return lightItems.push(light);
        });

        return lightItems;
    }

    scrollUpButton() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    public render() {

        const lightItems = this.mapPhilipsLights();

        return (
            <div className="philipsLights-container">
                <div className="philipsLights-header-box animate fade-in-left one"></div>
                <h1 className="philipsLights-header animate fade-in-down two">lights.</h1>
                <Link className="philipsLights-link animate fade-in-right three" to="/"><button className="philipsLights-button">home</button></Link>

                <div className="philipsLights-square-background"></div>

                <div className="philipsLights-square"></div>

                <div className="philipsLights-lights-wrapper">
                    <div className="philipsLights-circle"></div>
                    {lightItems}
                </div>

                <div className="philipsLights-button-wrapper">
                    <button className="philipsLights-button-up" onClick={this.scrollUpButton}>up.</button>
                </div>
            </div>
        );
    }
}

interface LinkStateProps {
    lights: ILights;
}

interface LinkDispatchProps {
    fetchLights: () => void;
    updateLight: (id: string, isOn: boolean, brightnessValue: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: PhilipsLights): LinkDispatchProps => {
    return {
        fetchLights: bindActionCreators(startFetchLights, dispatch),
        updateLight: bindActionCreators(startUpdateLight, dispatch),
    }
}

const mapStateToProps = (state: AppState, ownProps: PhilipsLights): LinkStateProps => {
    return {
        lights: state.lights
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps))(PhilipsLights);