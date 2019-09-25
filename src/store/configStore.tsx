import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "../types/actions";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './../reducers/rootReducer';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import Fire from './../config/Fire';


export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  compose(
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase}) as ThunkMiddleware<AppState, AppActions>)
    ),
    reduxFirestore(Fire),
    reactReduxFirebase(Fire, Fire)
    // vet ej vad andra argumentet ska vara? 
  )
);