import React from 'react';
import {shallow} from 'enzyme';
import Home from './Home';

describe ('home component', () => {
    it('should have Dashboard as heading', () => {
        const home = shallow(<Home />);
        const heading = home.find('h1')
        expect(heading.text()).toEqual('Dashboard')
    });
})