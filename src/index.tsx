import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// import { store } from './store/configStore';
import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "./types/actions";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';
import Fire from './config/Fire';
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, useFirebase } from 'react-redux-firebase';

import firebase from 'firebase/app';
import 'firebase/firestore';

export type AppState = ReturnType<typeof rootReducer>;

// export const store = createStore(rootReducer,
//   compose(
//     composeWithDevTools(
//       applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase}) as ThunkMiddleware<AppState, AppActions>)
//     ),
//     getFirestore,
//     getFirebase
//     // reduxFirestore(Fire),
//     // reactReduxFirebase(Fire, Fire)
//     // vet ej vad andra argumentet ska vara? 
//   )
// );

export const store = createStore(
    rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({ useFirebase, getFirestore }) as ThunkMiddleware<AppState, AppActions>),
        reduxFirestore(Fire),
    )
);

const rrfConfig = {
    apiKey: "AIzaSyBOiYMCTIflTiT4uQUxU_1FygkTwIbiyp8",
    authDomain: "app-dashboard-bc7a1.firebaseapp.com",
    databaseURL: "https://app-dashboard-bc7a1.firebaseio.com",
    projectId: "app-dashboard-bc7a1",
    storageBucket: "",
    messagingSenderId: "988171330517",
    appId: "1:988171330517:web:0e45806d389bd4a18a535c",
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    };

    const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
    };

    // firebase.initializeApp(rrfConfig);


// Provider component surround our app and pass the
// store into the application (so the application have access to the store)
ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><App /></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));

serviceWorker.unregister();