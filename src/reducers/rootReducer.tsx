import { combineReducers } from "redux";
import { postReducer } from "../reducers/posts";
import { firestoreReducer } from 'redux-firestore';

//Combine all reducers to one
export const rootReducer = combineReducers({
    //We name the postReducer as posts
    posts: postReducer,
    firestore: firestoreReducer
  });