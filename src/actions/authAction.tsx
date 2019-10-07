import { Dispatch } from 'redux';
import { IUser } from '../types/authInterface'
import { loginSuccess, loginError } from "../types/actions";
import { AppActions } from "../types/actions";
import { AppState } from "./../../src/index";

//Hook up types to Redux actions
export const loggedUser = (user: IUser): AppActions => ({
    type: loginSuccess,
    user
});

export const notLogged = (user: IUser): AppActions => ({
    type: loginError,
    user
});

//authLogin is our action creater
//use {getFirebase} to sign in user
export const authLogin = (user: IUser) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirebase }: any) => {
        //init the firebase 
        const firebase = getFirebase();
        console.log(user.email, user.password)
        firebase.auth().signInWithEmailAndPassword(
            //stores it, function uses promise, 
            user.email,
            user.password

            //The actions will be handled in the reducer
        ).then(() => {
            dispatch(loggedUser(user))
        }).catch((error: any) => {
            dispatch(notLogged(user))
            console.log('hej', error);
        })
    }
}


