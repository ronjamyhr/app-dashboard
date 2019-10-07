import { IUser } from "../types/authInterface"
import { ActionTypes } from "../types/actions"

const loginDeafultState: IUser[] = [];

//The reducer receives the action, checks the type 
const authReducer = (state = loginDeafultState, action: ActionTypes): IUser[] => {
    //the switch statement takes in something to evaluate, meaning the action that has been passed
    switch (action.type) {
        //if the action.type is equal to the function
        case 'LOGIN_SUCCESS':
            console.log("Logged in")
            return [...state, action.user];
        case 'LOGIN_ERROR':
            console.log('Failed to login')
            return state;
        //default case will run if none of the cases will match
        default:
            return state;
    }
};

export { authReducer }
