import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "./types/actions";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';
import { firebaseConfig } from './config/Fire';
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
 
export type AppState = ReturnType<typeof rootReducer>;

firebase.initializeApp(firebaseConfig);
firebase.firestore();

// Store 
export const store = createStore(
    rootReducer,
    compose(
        composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }) as ThunkMiddleware<AppState, AppActions>)
        ),
        reduxFirestore(firebase),
    )
);

// Needed for the new version
const rrfConfig = {
    firebaseConfig,
    useFirestoreForProfile: true
};

// Needed for the new version
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

// Provider component surround our app and pass the
// store into the application (so the application have access to the store)
ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><App /></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));

serviceWorker.unregister();