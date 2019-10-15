import React from 'react';
import { shallow } from 'enzyme';
import { MessageForm } from './MessageForm';

describe ('MessageForm component', () => {

    it('should throw error if nameinput is invalid', () => {
        //render messageform component
        const messageForm = shallow(<MessageForm />)

        //find correct input-field
        const input = messageForm.find('.messageform-form-input-name')
         
        //user types inValid input
        input.simulate('change', { target: { name: 'name', value: '%&hj' },preventDefault:() => {}})
        
        //everytime we expect the page to re-render we need the update-function
        messageForm.update()

        //find correct error message 
        const error = messageForm.find('.messageform-form-error-message')

        // console.log(error.text(), error.html())
        //expect error message to show up in component
        expect(error.text()).toEqual('name must only contain letters and whitespaces')
    });

    it('should throw error if name input is empty', () => {

        const messageForm = shallow(<MessageForm />);
        const input = messageForm.find('.messageform-form-input-name');
         
        input.simulate('change', { target: { name: 'name', value: '' },preventDefault:() => {}});
        
        messageForm.update();

        const error = messageForm.find('.messageform-form-error-message');

        expect(error.text()).toEqual('name is empty or contains only spaces');
    });


    it('should throw error if message input is empty', () => {

        const messageForm = shallow(<MessageForm />);
        const input = messageForm.find('.messageform-form-textarea-message');

        input.simulate('change', { target: { name: 'message', value: '' }, preventDefault: () => {}});

        messageForm.update();

        const error = messageForm.find('.messageform-form-error-message');

        expect(error.text()).toEqual('message is empty or contains only spaces');

    });
});

