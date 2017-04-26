import * as types from '../app/Helpers/actionTypes'
import reducer from '../app/Reducers'

describe('reducers', () => {
    const initialState = {
        "addTransaction": {},
        "budget": 0,
        "budgetSetting": 0,
        "currency": "",
        "deleteTransaction": {},
        "displayName": "",
        "email": "",
        "forexRate": "",
        "symbolCurrency": "",
        "updateTransaction": {},
        "userId": ""
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState)
    });

    it('should return the initial state', () => {
        expect(
            reducer(initialState, {})
        ).toEqual(initialState)
    });

    it('should return the initial state', () => {
        expect(
            reducer(initialState, {})
        ).toBe(initialState)
    });

    it('should return new State with userid set', () => {
        expect(
            reducer(initialState, {type:types.USER_ID,userId:'123'})
        ).toEqual({...initialState,userId:'123'});
    });

    it('should return new State with displayName set', () => {
        expect(
            reducer(initialState, {type:types.DISPLAYNAME,displayName:'displayname'})
        ).toEqual({...initialState,displayName:'displayname'});
    });

});
