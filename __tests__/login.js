import 'react-native';
import React from 'react';
import Login from '../app/login.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import reducer from '../app/Reducers'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

test('renders correctly', () => {
    function configureStore(initialState) {
        const enhancer = compose(
            applyMiddleware(
                thunkMiddleware,
            )
        )
        return createStore(reducer, initialState, enhancer)
    }

    const store = configureStore({})
    const tree = renderer.create(
        <Provider store={store}>
            <Login />
        </Provider>
).toJSON();
expect(tree).toMatchSnapshot();
});