import React from 'react'
import './allPhilipsLights.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { ILights } from '../../../types/Light'
import { AppState } from '../../..'
import { startFetchLights, startUpdateLight } from '../../../actions/lights'
import { bindActionCreators } from 'redux'
import { AppActions } from '../../../types/actions'
import { ThunkDispatch } from 'redux-thunk'
import { Switch } from '@material-ui/core'

type IProps = LinkStateProps & LinkDispatchProps

class AllPhilipsLights extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)

    this.mapPhilipsLights = this.mapPhilipsLights.bind(this)
    this.updateLight = this.updateLight.bind(this)
  }

  componentDidMount() {
    this.props.fetchLights()
  }

  mapPhilipsLights() {
    const data = this.props.lights
    return Object.keys(data)
      .filter(id => data[id].state.reachable !== false)
      .map(id => ({
        isOn: data[id].state.on,
        bri: data[id].state.bri,
        id: id,
      }))
  }

  updateLight(isOn: boolean) {
    const allLamps = this.mapPhilipsLights()
    allLamps.forEach(element => {
      this.props.updateLight(element.id, isOn, element.bri)
    })
  }

  public render() {
    const lightItems = this.mapPhilipsLights()
    const isOn =
      lightItems.filter(item => {
        return item.isOn && item
      }).length > 5

    return (
      <div className="philipsLight-container">
        <div className="philipsLight-content-container">
          <div className="lightItem-switch">
            <p className="onoff-text">off</p>
            <Switch
              checked={isOn}
              onChange={() => this.updateLight(!isOn)}
              className="switch"
              value={isOn}
            />
            <p className="onoff-text">on</p>
          </div>
        </div>
        <div className="philipsLight-heading-container">
          <Link className="philipsLight-link" to="/lights">
            <button className="philipsLight-button">all lights</button>
            <hr className="philipsLight-heading-line" />
            <h2 className="philipsLight-heading">SWITCH LIGHTS</h2>
          </Link>
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
  ownProps: AllPhilipsLights
): LinkDispatchProps => {
  return {
    fetchLights: bindActionCreators(startFetchLights, dispatch),
    updateLight: bindActionCreators(startUpdateLight, dispatch),
  }
}

const mapStateToProps = (
  state: AppState,
  ownProps: AllPhilipsLights
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
)(AllPhilipsLights)
