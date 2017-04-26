import * as types from '../app/Helpers/actionTypes'
import {ActionCreators} from '../app/Actions/index'

describe('account actions', () => {

    var mockGetState = function () {
    };
    it('setUserId should dispatch USER_ID action', () => {
        var resultFunc = ActionCreators.setUserId(1);

        var mockDispatch = function (action) {
            expect(action).toEqual({
                'type': types.USER_ID,
                'userId': 1
            });
            //return action;
        };
        resultFunc(mockDispatch, mockGetState);
    });

    it('setUserId should dispatch USER_ID action 2', () => {
        var resultFunc = ActionCreators.setUserId(2);
        expect(resultFunc).toBeInstanceOf(Function);

        const mockDispatch = jest.fn();

        resultFunc(mockDispatch, mockGetState);
        // expect(myMock.mock.calls[0][0]).toEqual(
        //     {
        //         'type': types.USER_ID,
        //         'userId': 2
        //     }
        // );
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.USER_ID,
                'userId': 2
            }
        );
    });

    it('setUserId should dispatch USER_ID action 3', () => {
        const mockDispatch = jest.fn();
        ActionCreators.setUserId(3)(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.USER_ID,
                'userId': 3
            }
        );
    });

    it('setDisplayName should dispatch DISPLAYNAME action', () => {
        const mockDispatch = jest.fn();
        ActionCreators.setDisplayName('User1')(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.DISPLAYNAME,
                'displayName': 'User1'
            }
        );
    });

    it('setEmail should dispatch EMAIL action 3', () => {
        const mockDispatch = jest.fn();
        ActionCreators.setEmail('user1@email.com')(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.EMAIL,
                'email': 'user1@email.com'
            }
        );
    });

    it('getUserId should dispatch USER_ID action', () => {
        const mockDispatch = jest.fn();
        const mockSettingRef = {
            on: jest.fn()
        };
        global.settingRef = mockSettingRef;
        ActionCreators.getUserId(9)(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.USER_ID,
                'userId': 9
            }
        );
    });


});

describe('setting actions', () => {
    var mockGetState = function () {
    };

    it('setUserId should dispatch USER_ID action', () => {
        const mockDispatch = jest.fn();
        ActionCreators.setUserId('jHlXZHh5ZhOkHwD7uM5vV1Pb4LI2')(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.USER_ID,
                'userId': 'jHlXZHh5ZhOkHwD7uM5vV1Pb4LI2'
            }
        );
    });

    it('setTotalBudget should dispatch BUDGET action', () => {
        const mockDispatch = jest.fn();
        ActionCreators.setTotalBudget(120)(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.BUDGET,
                'budget': 120
            }
        );
    });


    it('calculateTotalBudget should calculate total budget', () => {
        expect(ActionCreators.calculateTotalBudget([1000, 2000])).toBe(3000);
    });


    it('getBudget should dispatch BUDGET action with budget = total budget of certain month/year, if exists in database', () => {
        const mockDispatch = jest.fn();
        jest.mock('firebase');
        firebase.mockBudgetArray = [
            {
                val: function () {
                    return {
                        year: 2017,
                        month: 3,
                        budgets: [1000, 2000],
                        categories: ['Food & Beverage', 'Grocery & Amenities']
                    }
                }
            }
        ];
        firebase.mockBudgetArray.numChildren = jest.fn(() => 1);
        ActionCreators.getBudget(9, 2017, 3)(mockDispatch, mockGetState);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.BUDGET,
                'userId': 9,
                'budget': 3000
            }
        );
    });

    it('getBudget should dispatch BUDGET action with budget = 0, if certain year/month is not exists in database', () => {
        const mockDispatch = jest.fn();
        jest.mock('firebase');
        firebase.mockBudgetArray = [
            {
                val: function () {
                    return {
                        year: 2017,
                        month: 3,
                        budgets: [1000, 2000],
                        categories: ['Food & Beverage', 'Grocery & Amenities']
                    }
                }
            }
        ];
        firebase.mockBudgetArray.numChildren = jest.fn(() => 1);
        ActionCreators.getBudget(9, 2017, 1)(mockDispatch, mockGetState);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.BUDGET,
                'userId': 9,
                'budget': 0
            }
        );
    });
    it('getBudgetSetting should dispatch BUDGET_SETTING action with budgetSetting = total budget of current month/year, if exists in database', () => {
        const mockDispatch = jest.fn();
        // const mockSettingRef = {
        //     on: jest.fn()
        // };
        //global.settingRef = mockSettingRef;
        jest.mock('firebase');
        /*
         global.firebase = {
         database : function () {
         return {
         ref: function() {
         return {
         orderByChild: function() {
         return {
         equalTo:function(){
         return {
         on: function(ev,cb) {
         cb([
         {
         val: function(){
         return {
         year: new Date().getFullYear(),
         month: new Date().getMonth(),
         budgets: [1200,1500]
         }
         }
         }
         ]);
         }
         };
         }
         }
         }
         }
         }
         }
         }
         }
         */
        firebase.mockBudgetArray = [
            {
                val: function () {
                    return {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        budgets: [1000, 2000],
                        categories: ['Food & Beverage', 'Grocery & Amenities']
                    }
                }
            }
        ];
        ActionCreators.getBudgetSetting(9)(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.BUDGET_SETTING,
                'userId': 9,
                'budgetSetting': 3000
            }
        );
    });

    it('getBudgetSetting should not dispatch any action if there is no budget data of current month/year in database', () => {
        const mockDispatch = jest.fn();
        firebase.mockBudgetArray = [
            {
                val: function () {
                    return {
                        year: (new Date().getFullYear()) - 1,
                        month: new Date().getMonth(),
                        budgets: [1000, 2000],
                        categories: ['Food & Beverage', 'Grocery & Amenities']
                    }
                }
            }
        ];
        ActionCreators.getBudgetSetting(9)(mockDispatch, mockGetState);
        expect(mockDispatch).not.toBeCalled();
    });


    it('getCurrency should dispatch CURRENCY action with currency Rupiah', () => {
        const mockDispatch = jest.fn();
        jest.mock('firebase');
        firebase.mockSettings = [
            {
                val: () => ({
                    budget: 5000,
                    currency: 'Indonesian Rupiah(IDR)',
                    userId: 'jHlXZHh5ZhOkHwD7uM5vV1Pb4LI2'
                })
            }
        ];
        ActionCreators.getCurrency('jHlXZHh5ZhOkHwD7uM5vV1Pb4LI2')(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.CURRENCY,
                'userId': 'jHlXZHh5ZhOkHwD7uM5vV1Pb4LI2',
                'currency': 'Rp'
            }
        );
    });

    it('getExchangeRate should dispatch FOREX_RATE action 3', () => {
        const mockDispatch = jest.fn();
        ActionCreators.getExchangeRate('Indonesian Rupiah(IDR)', {
            'IDR': 1005,
            'USD': 0.75342
        })(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith(
            {
                'type': types.FOREX_RATE,
                'rate': 1005
            }
        );
    });


})
