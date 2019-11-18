import React from 'react'
import './lightItem.scss'
import { Slider } from '@material-ui/core'
import { Switch } from '@material-ui/core'

interface IProps {
  name: string
  id: string
  isOn: boolean
  bri: any
  reachable: boolean
  updateLight(id: string, isOn: boolean, brightnessValue: number): void
}

class LightItem extends React.Component<IProps, {}> {
  public render() {
    return (
      <div className="lightItem-container">
        <div className="lightItem-header-wrapper">
          <h2 className="lightItem-header-name">{this.props.name}</h2>
        </div>
        {this.props.reachable ? (
          <div className="lightItem-buttons-container">
            <div className="lightItem-switch">
              <p className="onoff-text">off</p>
              <Switch
                checked={this.props.isOn}
                onChange={(event: any, newValue: any) =>
                  this.props.updateLight(
                    this.props.id,
                    newValue,
                    this.props.bri
                  )
                }
                className="switch"
                value={this.props.isOn}
                disabled={!this.props.reachable}
              />
              <p className="onoff-text">on</p>
            </div>

            {this.props.bri && (
              <div className="lightItem-slider">
                <Slider
                  orientation="vertical"
                  min={0}
                  max={255}
                  step={1}
                  value={this.props.bri}
                  className="slider"
                  onChange={(event: any, newValue: any) =>
                    this.props.updateLight(
                      this.props.id,
                      this.props.isOn,
                      newValue
                    )
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <p className="lightItem-error-message">This light is not reachable</p>
        )}
      </div>
    )
  }
}

export default LightItem
