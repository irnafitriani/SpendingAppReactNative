import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import firebase from 'firebase'

const background = require("../images/background.jpg")

class DashboardDetail extends Component{
    constructor(props) {
        super(props)
        this.budgetRef = firebase.database().ref('budgets').orderByChild('userId').equalTo(this.props.userInfo.userId)
        this.state = {
            budgets: [0, 0, 0, 0, 0],
            categories: ['Food & Beverage', 'Grocery & Amenities', 'Health', 'Entertainment', 'Transportation'],
        }
    }
    componentWillMount() {
        console.log('ashboard detail month ', this.props.currentMonth)
        this.budgetRef.on('value', (snap) => {
            snap.forEach((child) => {
                if(child.val().month === this.props.currentMonth && child.val().year === new Date().getFullYear()) {
                    this.setState({
                        budgets: child.val().budgets,
                        categories: child.val().categories,
                    })
                }
            })
        })
    }
    onBackPressed() {
        this.props.navigator.replace({
            title: 'Dashboard',
            id: 'Tabbar',
            selectedTab: 'dashboard',
            userInfo: this.props.userInfo,
            currentMonth: this.props.currentMonth,
        })
    }
    render() {
        return(
            <Image 
                style={[styles.background, styles.container]}
                source={background}
                resizeMode="cover">
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.categoryWrapper}>
                            <Text style={styles.title}>{this.state.categories[0]}</Text>
                            <View style={{flexDirection: 'row', backgroundColor: '#adadad', height: 1}}/>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Budget</Text>
                                <Text style={styles.label}>{this.state.budgets[0]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Spent</Text>
                                <Text style={styles.label}>{this.props.spents[0]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Balance</Text>
                                <Text style={styles.label}>{this.state.budgets[0] - this.props.spents[0]}</Text>
                            </View>
                        </View>
                        <View style={styles.categoryWrapper}>
                            <Text style={styles.title}>{this.state.categories[1]}</Text>
                            <View style={{flexDirection: 'row', backgroundColor: '#adadad', height: 1}}/>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Budget</Text>
                                <Text style={styles.label}>{this.state.budgets[1]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Spent</Text>
                                <Text style={styles.label}>{this.props.spents[1]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Balance</Text>
                                <Text style={styles.label}>{this.state.budgets[1] - this.props.spents[1]}</Text>
                            </View>
                        </View>
                        <View style={styles.categoryWrapper}>
                            <Text style={styles.title}>{this.state.categories[2]}</Text>
                            <View style={{flexDirection: 'row', backgroundColor: '#adadad', height: 1}}/>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Budget</Text>
                                <Text style={styles.label}>{this.state.budgets[2]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Spent</Text>
                                <Text style={styles.label}>{this.props.spents[2]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Balance</Text>
                                <Text style={styles.label}>{this.state.budgets[2] - this.props.spents[2]}</Text>
                            </View>
                        </View>
                        <View style={styles.categoryWrapper}>
                            <Text style={styles.title}>{this.state.categories[3]}</Text>
                            <View style={{flexDirection: 'row', backgroundColor: '#adadad', height: 1}}/>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Budget</Text>
                                <Text style={styles.label}>{this.state.budgets[3]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Spent</Text>
                                <Text style={styles.label}>{this.props.spents[3]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Balance</Text>
                                <Text style={styles.label}>{this.state.budgets[3] - this.props.spents[3]}</Text>
                            </View>
                        </View>
                        <View style={styles.categoryWrapper}>
                            <Text style={styles.title}>{this.state.categories[4]}</Text>
                            <View style={{flexDirection: 'row', backgroundColor: '#adadad', height: 1}}/>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Budget</Text>
                                <Text style={styles.label}>{this.state.budgets[4]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Spent</Text>
                                <Text style={styles.label}>{this.props.spents[4]}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.label}>Balance</Text>
                                <Text style={styles.label}>{this.state.budgets[4] - this.props.spents[4]}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.button} onPress={() => this.onBackPressed()}>
                            <Text style={styles.buttonText}>Back to Dashboard</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: null,
        width: null,
    },
    container: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
    button:{
        backgroundColor: "#9b59b6",
        borderRadius: 4,
        flex: 1,
        marginLeft: 10, 
        marginRight: 10, 
        marginVertical: 15,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 5,
    },
    buttonText:{
        color:"#fff",
        fontSize: 15
    },
    categoryWrapper: {
        padding: 10,
    },
    rowWrapper: {
        flexDirection: 'row'
    },
    label: {
        color: '#fff',
        fontSize: 12,
        width: 100,
    }
})

export default DashboardDetail