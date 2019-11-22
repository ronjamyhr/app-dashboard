import React from 'react'
import { shallow, mount } from 'enzyme'
import { LoginForm } from './LoginForm'

describe('LoginForm component', () => {
  it('should throw error if emailinput is not valid', () => {
    //render LoginForm component
    const loginForm = mount(<LoginForm />) //find correct html-element

    const input = loginForm.find('#email') //user types something invalid

    input.simulate('change', {
      target: { name: 'username', id: 'email', value: 'u' },
      preventDefault: () => {},
    }) //everytime we expect the page to re-render we need the update-function
    loginForm.update() //find correct error message

    const error = loginForm.find('.error-message') //expect error message to show up in component

    expect(error.text()).toEqual('please enter a valid email address')
  })

  it('should throw error if passwordinput is invalid', () => {
    const loginForm = mount(<LoginForm />)
    const input = loginForm.find('#password')

    //simulate an onChange where user types invalid password
    input.simulate('change', {
      target: { name: 'password', id: 'password', value: '1' },
      preventDefault: () => {},
    })

    //page re-renders, need to update the page
    loginForm.update()

    //find correct html-element
    const error = loginForm.find('.error-message')

    expect(error.text()).toEqual(
      'password must be between 6 and 10 digits long and include at least one numeric digit.'
    )
  })

  it('should not show errors and set state of valdatedForm', () => {
    const loginForm = shallow(<LoginForm />)
    const inputEmail = loginForm.find('#email')
    const inputPassword = loginForm.find('#password')

    //expect validatedForm initial state to be false
    expect(loginForm.state().validatedForm).toEqual(false)

    //stimulate change in both input fields to correct values
    inputEmail.simulate('change', {
      target: { name: 'username', id: 'email', value: 'user@test.se' },
      preventDefault: () => {},
    })
    inputPassword.simulate('change', {
      target: { name: 'password', id: 'password', value: '123456' },
      preventDefault: () => {},
    })

    loginForm.update()

    const error = loginForm.find('.error-message')

    //epect no error messages
    expect(error.exists()).toBeFalsy()

    //state of ValidatedForm should now be set to true
    expect(loginForm.state().validatedForm).toEqual(true)
  })
})
