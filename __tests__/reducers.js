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

    it('should return new State with email set', () => {
        expect(
            reducer(initialState, {type:types.EMAIL,email:'user1@domain.com'})
        ).toEqual({...initialState,email:'user1@domain.com'});
    });

    it('should return new State with budget set', () => {
        expect(
            reducer(initialState, {type:types.BUDGET,budget:9000})
        ).toEqual({...initialState,budget:9000});
    });

    it('should return new State with budget set', () => {
        expect(
            reducer(initialState, {type:types.BUDGET_SETTING,budgetSetting:9000})
        ).toEqual({...initialState,budgetSetting:9000});
    });

    it('should return new State with symbolCurrency set', () => {
        expect(
            reducer(initialState, {type:types.SYMBOLCURRENCY,symbolCurrency:'Rp'})
        ).toEqual({...initialState,symbolCurrency:'Rp'});
    });

    it('should return new State with rate set', () => {
        expect(
            reducer(initialState, {type:types.FOREX_RATE,rate:1200})
        ).toEqual({...initialState,rate:1200});
    });

    it('should return new State with rate set', () => {
        expect(
            reducer(initialState, {type:types.CURRENCY,currency:'Indonesian Rupiah(IDR)'})
        ).toEqual({...initialState,currency:'Indonesian Rupiah(IDR)'});
    });

});
