// manual mocking firebase.. experimental
export default firebase = {
    database: function () {
        let mockBudgetArray = this.mockBudgetArray || [{
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
        let mockSettings = this.mockSettings || [
                {
                    val: () => ({
                        budget: 5000,
                        currency: 'Indonesian Rupiah(IDR)',
                        userId: 'jHlXZHh5ZhOkHwD7uM5vV1Pb4LI2'
                    })
                }
            ];
        return {
            ref: function (ref) {
                // firebase.database().ref('budgets').orderByChild('userId').equalTo(userId)
                if (ref === 'budgets') {
                    return {
                        orderByChild: function () {
                            return {
                                equalTo: function () {
                                    return {
                                        on: function (ev, cb) {
                                            if (ev === 'value') cb(mockBudgetArray);
                                        }
                                    };
                                }
                            }
                        }
                    }
                } else {
                    return {
                        child: (ref) => {
                            if (ref === 'settings') {
                                return {
                                    orderByChild: () => ({
                                        equalTo: () => ({
                                            on: (ev, cb) => {
                                                if (ev === 'value') cb(mockSettings);
                                            }
                                        })
                                    })
                                }
                            }

                        }
                    }
                }
            }
        }
    }
}
