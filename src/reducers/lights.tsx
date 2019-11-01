import { AppActions } from "../types/actions";
import { ILights } from "../types/Light";

const lightsReducerDefaultState: ILights = {};

const lightsReducer = (state = lightsReducerDefaultState, action: AppActions): ILights => {
    switch (action.type) {
        case "LIGHTS_FETCH":
            return {
                ...state,
                ...action.lights
            }
        case "UPDATE_LIGHT":
            const updatedLight = {
                ...state[action.id],
                state: { ...state[action.id].state, on: action.isOn, bri: action.brightnessValue }
            }
            return {
                ...state,
                [action.id]: updatedLight
            }
        default:
            return state;
    }
}

export { lightsReducer };