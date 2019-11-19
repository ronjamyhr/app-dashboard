import { combineReducers } from 'redux'
import { lightsReducer } from './lights'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

//Combine all reducers to one
export const rootReducer = combineReducers({
    // auth: authReducer,
    firestore: firestoreReducer,
    //firebaseReducer will sync authentification 
    firebase: firebaseReducer,
    lights: lightsReducer
});
