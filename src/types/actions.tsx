import { IUser } from './authInterface'
import { ILights } from './Light'

export const loginSuccess = 'LOGIN_SUCCESS'
export const loginError = 'LOGIN_ERROR'
export const logOut = 'SIGNOUT_SUCCESS'
export const LIGHTS_FETCH = 'LIGHTS_FETCH'
export const UPDATE_LIGHT = 'UPDATE_LIGHT'

export interface ILoginSuccessAction {
  type: typeof loginSuccess
  user: IUser
}

export interface ILoginErrorAction {
  type: typeof loginError
  user: IUser
}

export interface ISignOutAction {
  type: typeof logOut
}

export interface IFetchLightsAction {
  type: typeof LIGHTS_FETCH
  lights: ILights
}

export interface IUpdateLightsAction {
  type: typeof UPDATE_LIGHT
  isOn: boolean
  id: string
  brightnessValue: number
}

export type ActionTypes =
  | ILoginSuccessAction
  | ILoginErrorAction
  | ISignOutAction
  | IFetchLightsAction
  | IUpdateLightsAction

export type AppActions = ActionTypes
