import { IPost } from "./../types/Post";
import { CREATE_POST, AppActions, REMOVE_POST } from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "./../../src/index";

export const createPost = (post: IPost): AppActions => ({
  type: CREATE_POST,
  post
});

export const removePost = (id: string): AppActions => ({
  type: REMOVE_POST,
  id
});


export const startCreatePost = (postData: { name?: string; message?: string; }) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirestore }: any) => {

    const { name = '', message = '' } = postData;
    const post = { name, message };
    const id = '';
    const date = new Date();
    

    const firestore = getFirestore();

    firestore.collection('posts').add({
      ...postData
    }).then(() => {
      return dispatch(createPost({ id, date, ...post }));
    }).catch((err: any) => {
      console.log(err);
    })

  };
};

export const startRemovePost = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirestore }: any) => {

    const firestore = getFirestore();
    
    firestore.collection('posts').doc(id).delete()
      .then(() => {
        console.log('deleted');
        return dispatch(removePost(id));
      }).catch((err: any) => {
        console.log(err);
      })

  };
};
