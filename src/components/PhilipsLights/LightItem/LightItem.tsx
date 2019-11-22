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

export const LightItem = ({
  name,
  id,
  isOn,
  bri,
  reachable,
  updateLight,
}: IProps) => {
  return (
    <div className="lightItem-container">
      <div className="lightItem-header-wrapper">
        <h2 className="lightItem-header-name">{name}</h2>
      </div>
      {reachable ? (
        <>
          <div className="lightItem-switch">
            <p className="onoff-text">off</p>
            <Switch
              checked={isOn}
              onChange={(event: any, newValue: any) =>
                updateLight(id, newValue, bri)
              }
              className="switch"
              value={isOn}
              disabled={!reachable}
            />
            <p className="onoff-text">on</p>
          </div>

          <div className="lightItem-slider">
            <Slider
              min={0}
              max={255}
              step={1}
              value={bri}
              className="slider"
              onChange={(event: any, newValue: any) =>
                updateLight(id, isOn, newValue)
              }
            />
            <i className="brightness-icon fas fa-sun"></i>
          </div>
        </>
      ) : (
          <p className="lightItem-error-message">This light is not reachable</p>
        )}
    </div>
  )
}
