import { ILights } from './../types/Light'
import { LIGHTS_FETCH, UPDATE_LIGHT } from '../types/actions'
import { AppActions } from '../types/actions'
import { Dispatch } from 'redux'
import { AppState } from './../../src/index'
import axios from 'axios'

export const lightsFetched = (lights: ILights): AppActions => ({
  type: LIGHTS_FETCH,
  lights,
})

export const updateLight = (
  isOn: boolean,
  id: string,
  brightnessValue: number
): AppActions => ({
  type: UPDATE_LIGHT,
  isOn,
  id,
  brightnessValue,
})

export const startFetchLights = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const url = `${process.env.REACT_APP_PHILIPS_API_URL}/api/${process.env.REACT_APP_PHILIPS_USERNAME}/lights`

    axios
      .get(url)
      .then((response: any) => {
        return dispatch(lightsFetched(response.data))
      })
      .catch((error: any) => {
        console.log('ERROR GET: ', error)
      })
  }
}

export const startUpdateLight = (
  id: string,
  isOn: boolean,
  brightnessValue: number
) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const url = `${process.env.REACT_APP_PHILIPS_API_URL}/api/${process.env.REACT_APP_PHILIPS_USERNAME}/lights/${id}/state`
    const stateBrightnessValue = getState().lights[id].state.bri
    const stateIsOnValue = getState().lights[id].state.on

    dispatch(updateLight(isOn, id, brightnessValue))

    const bodyData = { on: isOn, bri: brightnessValue }

    axios.put(url, bodyData).catch((error: any) => {
      dispatch(updateLight(stateIsOnValue, id, stateBrightnessValue))
    })
  }
}
