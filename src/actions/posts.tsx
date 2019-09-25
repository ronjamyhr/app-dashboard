// import uuid from "uuid";
import { IPost } from "./../types/Post";
import { CREATE_POST, AppActions, REMOVE_POST, FETCH_POSTS } from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../store/configStore";

export const createPost = (post: IPost): AppActions => ({
  type: CREATE_POST,
  post
});

export const removePost = (id: string): AppActions => ({
  type: REMOVE_POST,
  id
});

export const fetchPosts = (posts: IPost[]): AppActions => ({
  type: FETCH_POSTS,
  posts
});


export const startCreatePost = (postData: {name?: string; message?: string;}) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState, { getFirebase, getFirestore }: any) => {
    
    const { name = '', message = '' } = postData;
    const post = { name, message };
    const id = '';
    
    //make async call to database here? 

    const firestore = getFirestore();

    firestore.collection('posts').add({
      ...postData
    }).then(() => {
      return dispatch(createPost({ id, ...post}));
    }).catch((err: any) => {
      console.log(err);
    })

    // return dispatch(createPost({ id, ...post}));
  };
};

export const startRemovePost = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(removePost(id));
  };
};

export const startFetchPosts = (posts: IPost[]) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(fetchPosts(posts));
  };
};
