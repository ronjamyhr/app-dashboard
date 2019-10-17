import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { shallow } from 'enzyme';




it('renders without crashing', () => {

    const store =createStore(() => {
        const state = {
            firebase: {
                auth: {
                    uid: 1
                }
            }
        }
        return state
      })

 shallow(<Provider store={store}><App /></Provider>)
 
});