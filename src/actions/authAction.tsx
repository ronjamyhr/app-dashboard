import { Dispatch } from 'redux';
import { IUser } from '../types/authInterface'
import { loginSuccess, loginError, logOut } from "../types/actions";
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


export const loggedOut = (): AppActions => {
    return ({
        type: logOut
    });
};

//authLogin is our action creater
//use getFirebase to sign in user
export const authLogin = (user: IUser) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirebase }: any) => {
        //init the firebase 
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            //stores it, function uses promise, 
            user.email,
            user.password

            //The actions will be handled in the reducer
        ).then(() => {
            dispatch(loggedUser(user))
            console.log(loggedUser(user))

        }).catch((error: any) => {
            dispatch(notLogged(user))
            console.log(notLogged(user))
        })
    }
}

//no need to pass in something in the function
export const signOut = (user: IUser) => {

    //use getFirebase to log out
    return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirebase }: any) => {
        const firebase = getFirebase();
        //use the variable firebase.with the signout-method
        //.then takes a callback-function that dispatches the the action  
        firebase.auth().signOut().then(() => {
            dispatch(loggedOut())
            console.log(loggedOut())
        }).catch((error: any) => {
        })

    }
}
