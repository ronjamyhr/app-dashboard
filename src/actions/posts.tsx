import { AppActions } from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "./../../src/index";

export const startCreatePost = (postData: { name?: string; message?: string; }) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirestore }: any) => {
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...postData
        }).catch((error: any) => {
        });
    };
};

export const startRemovePost = (id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirestore }: any) => {
        const firestore = getFirestore();
        firestore.collection('posts').doc(id).delete()
            .catch((error: any) => { });
    };
};
