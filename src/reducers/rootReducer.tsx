import { combineReducers } from 'redux'
import { postReducer } from './posts'
import { firestoreReducer } from 'redux-firestore'
import { authReducer } from './authReducer'
import { firebaseReducer } from 'react-redux-firebase'

//Combine all reducers to one
export const rootReducer = combineReducers({
    //We name the postReducer as posts
    posts: postReducer,
    auth: authReducer,
    firestore: firestoreReducer,
    //firebaseReducer will sync authentification 
    firebase: firebaseReducer
});
