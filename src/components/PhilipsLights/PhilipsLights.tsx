import React from 'react'
import './philipsLights.scss'
import { LightItem } from './LightItem/LightItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { ILights } from '../../types/Light'
import { AppState } from '../../index'
import { startFetchLights, startUpdateLight } from '../../actions/lights'
import { bindActionCreators } from 'redux'
import { AppActions } from '../../types/actions'
import { ThunkDispatch } from 'redux-thunk'

interface IState {
  interval: any
}

type IProps = LinkStateProps & LinkDispatchProps

class PhilipsLights extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      interval: '',
    }
  }

  componentDidMount() {
    this.props.fetchLights()

    // Execute the function every 30 seconds
    const interval = setInterval(this.props.fetchLights, 30000)

    this.setState({
      interval: interval,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  updateLight = (id: string, isOn: boolean, brightnessValue: number) => {
    this.props.updateLight(id, isOn, brightnessValue)
  }

  mapPhilipsLights = () => {
    const data = this.props.lights
    return Object.keys(data).map(id => (
      <LightItem
        key={id}
        id={id}
        name={data[id].name}
        isOn={data[id].state.on}
        bri={data[id].state.bri}
        reachable={data[id].state.reachable}
        updateLight={this.updateLight}
      />
    ))
  }

  scrollUpButton = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  public render() {
    const lightItems = this.mapPhilipsLights()

    return (
      <div className="philipsLights-container">
        <div className="philipsLights-header-container">
          <div className="philipsLights-header-box animate fade-in-left one"></div>
          <h1 className="philipsLights-header animate expand-header three">
            lights.
          </h1>
          <Link className="philipsLights-link animate fade-in-down two" to="/">
            <button className="philipsLights-button">home</button>
          </Link>
        </div>

        <div className="philipsLights-lights-wrapper">{lightItems}</div>

        <div className="philipsLights-button-wrapper">
          <button
            className="philipsLights-button-up"
            onClick={this.scrollUpButton}
          >
            <i className="button-up-icon fas fa-angle-up"></i>
          </button>
        </div>
      </div>
    )
  }
}

interface LinkStateProps {
  lights: ILights
}

interface LinkDispatchProps {
  fetchLights: () => void
  updateLight: (id: string, isOn: boolean, brightnessValue: number) => void
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: PhilipsLights
): LinkDispatchProps => {
  return {
    fetchLights: bindActionCreators(startFetchLights, dispatch),
    updateLight: bindActionCreators(startUpdateLight, dispatch),
  }
}

const mapStateToProps = (
  state: AppState,
  ownProps: PhilipsLights
): LinkStateProps => {
  return {
    lights: state.lights,
  }
}

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PhilipsLights)
