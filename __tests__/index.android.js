import 'react-native';
import React from 'react'
import Registration from './registration.test.js'
import ForgotPassword from './forgotPassword.test.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//     <Registration/>
//     // <ForgotPassword/>
// });

describe('Addition', () => {
    it('knows that 2 add 2 make 4', () => {
        expect(2 + 2).toBe(6)
    })
})

