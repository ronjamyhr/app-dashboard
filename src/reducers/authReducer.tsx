import { IUser } from "../types/authInterface"
import { ActionTypes } from "../types/actions"

const loginDeafultState: IUser[] = [];

//The reducer receives the action, checks the type 
const authReducer = (state = loginDeafultState, action: ActionTypes): IUser[] => {
    //the switch statement takes in something to evaluate, meaning the action that has been passed
    switch (action.type) {
        //if the action.type is equal to the function
        case 'LOGIN_SUCCESS':
            console.log("login success", state, action.user)
            return [...state, action.user];
        case 'LOGIN_ERROR':
            console.log("failed to login")
            return [...state];
        case 'SIGNOUT_SUCCESS':
            console.log("sign out success!")
            //we don't need to add antyhing or remove antyhing to the state
            return state;
        //default case will run if none of the cases will match
        default:
            return state;
    }
};

export { authReducer }
