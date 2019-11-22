import React from 'react'
import { shallow, mount } from 'enzyme'
import { MessageForm } from './MessageForm'

describe('MessageForm component', () => {
  it('should throw error if nameinput is invalid', () => {
    //render messageform component
    const messageForm = mount(<MessageForm />)

    //find correct input-field
    const input = messageForm.find('.messageform-form-input-name')

    //user types inValid input
    input.simulate('change', {
      target: { name: 'name', value: '%&hj' },
      preventDefault: () => {},
    })

    //everytime we expect the page to re-render we need the update-function
    messageForm.update()

    //find correct error message
    const error = messageForm.find('.error-message')

    //expect error message to show up in component
    expect(error.text()).toEqual(
      'name must only contain letters and whitespaces'
    )
  })

  it('should throw error if name input is empty', () => {
    const messageForm = mount(<MessageForm />)
    const input = messageForm.find('.messageform-form-input-name')

    input.simulate('change', {
      target: { name: 'name', value: '' },
      preventDefault: () => {},
    })

    messageForm.update()

    const error = messageForm.find('.error-message')

    expect(error.text()).toEqual('name is empty or contains only spaces')
  })

  it('should throw error if message input is empty', () => {
    const messageForm = mount(<MessageForm />)
    const input = messageForm.find('.messageform-form-textarea-message')

    input.simulate('change', {
      target: { name: 'message', value: '' },
      preventDefault: () => {},
    })

    messageForm.update()

    const error = messageForm.find('.error-message')

    expect(error.text()).toEqual('message is empty or contains only spaces')
  })

  it('should not throw error messages if input is valid', () => {
    const messageForm = shallow(<MessageForm />)
    const inputName = messageForm.find('.messageform-form-input-name')
    const inputMessage = messageForm.find('.messageform-form-textarea-message')

    // expect the isValid state to be false
    expect(messageForm.state().isValid).toEqual(false)

    // simulate input change and the input values are correct
    inputName.simulate('change', {
      target: { name: 'name', value: 'Lars' },
      preventDefault: () => {},
    })
    inputMessage.simulate('change', {
      target: { name: 'message', value: 'Ett meddelande' },
      preventDefault: () => {},
    })

    messageForm.update()

    const error = messageForm.find('.error-message')

    // expect that error messages are non-existent
    expect(error.exists()).toBeFalsy()

    // then expect the isValid state to be true
    expect(messageForm.state().isValid).toEqual(true)
  })
})
