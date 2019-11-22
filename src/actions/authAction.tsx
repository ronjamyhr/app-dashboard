import { Dispatch } from 'redux';
import { IUser } from '../types/authInterface'
import { AppActions } from "../types/actions";
import { AppState } from "./../../src/index";

export const authLogin = (user: IUser) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirebase }: any) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            user.email,
            user.password
        )
            .catch((error: any) => { })
    }
}

export const signOut = (user: IUser) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirebase }: any) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .catch((error: any) => { })
    }
}
