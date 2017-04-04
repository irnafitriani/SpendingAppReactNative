import React, { Component } from 'react'
import {
    Image,
    View,
    Text,
    Picker,
    Platform,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import Firebase from 'firebase'
import { Bar, StockLine, SmoothLine, Pie } from 'react-native-pathjs-charts'
const background = require("../images/background.jpg");

const arrowLeft = require('../images/arrow_left_white.png')
const arrowRight = require('../images/arrow_right_white.png')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December']
const maxDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export default class Dashboard extends Component{
     constructor(props) {
        super(props)
        this.state = {
            visible: false,
            data: '',
            sortCategory: 'Date',
            tempTransLine: [],
            tempTransPie: [],
            currentMonth: new Date().getMonth(), 
            nextDisable: true,
            prevDisable: false,
        }
        this.transRef = Firebase.database().ref().orderByChild('userId').equalTo(this.props.userInfo.userId);
    }
    componentWillMount() {
        this.getSelectedMonthData(this.state.currentMonth)
        this.disablePrevButtonNav(this.state.currentMonth)
    }
    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            // initialize the graphic start point
            var newTransactions = [{'x': 0, 'y': 0}];
            var counter = 0

            // add transactions to the graphic
            transactions.forEach((transaction) => {
                if(transaction.val().userId === this.props.userInfo.userId) {
                    counter = counter + 1

                    // check if its on the same day with the last pushed transaction
                    var date = transaction.val().date.substr(8)
                    var amount = parseInt(transaction.val().amount)
                    var latest = newTransactions[ newTransactions.length - 1].x                    
                    if(latest === date) {
                        // its on the same day, then sum the amount
                        amount = newTransactions[ newTransactions.length - 1].y + amount

                        // remove the old transaction
                        newTransactions.pop()
                    }

                    // add transaction as point
                    newTransactions.push({
                        "x": date, "y": amount
                    })
                }
            })

            // add the graphic end point
            newTransactions.push({'x': this.state.currentMonth === 1 ? 30 : 35, 'y': 0})

            // update tempTransLine state
            if(counter > 0) {
                this.setState({
                    tempTransLine: [newTransactions],
                })
                console.log('set temp trans line')
            } else {
                this.setState({
                    tempTransLine: [],
                })
            }
        })
    }
    listenForTransRefPie(transRef) {
        transRef.on('value', (transactions) => {
            // initialize the graphic start point
            var categories = ['Food & Beverage', 'Grocey & Amenities', 'Healt', 'Entertainment', 'Transportation']
            var amounts = [0, 0, 0, 0, 0]
            var counter = 0

            // add transactions to the graphic
            transactions.forEach((transaction) => {
                if(transaction.val().userId === this.props.userInfo.userId) {
                    counter = counter + 1
                    var cat = transaction.val().category // === undefined ? 'none' : transaction.val().category
                    var amount = parseInt(transaction.val().amount)

                    if(cat === categories[0]) {
                        amounts[0] = amounts[0] + amount
                    } else if(cat === categories[1]) {
                        amounts[1] = amounts[1] + amount
                    } else if(cat === categories[2]) {
                        amounts[2] = amounts[2] + amount
                    } else if(cat === categories[3]) {
                        amounts[3] = amounts[3] + amount
                    } else {
                        amounts[4] = amounts[4] + amount
                    }
                }
            })

            let data = []
            for(i = 0; i < categories.length; i++) {
                if(amounts[i] !== 0) {
                    data.push({'name': categories[i], 'total': amounts[i]})
                }
            }

            // update tempTransPie state
            if(counter > 0) {
                this.setState({
                    tempTransPie: data,
                })
                console.log('set temp trans pie')
            } else {
                this.setState({
                    tempTransPie: [],
                })
            }
        })
    }
    displayNoData(){ 
        return(
            <View>
                <Text style={{color: '#fff', margin: 20}}>No data to display</Text>
            </View>
        )
    }
    setData() {
        if(this.state.sortCategory === 'Date') {
            return this.setDataLine()
        } else {
            return this.setDataPie()
        }
    }
    setDataLine(){
        let options = {
            width: 250,
            height: 250,
            color: '#ffffff',
            margin: {
                top: 10,
                left: 35,
                bottom: 30,
                right: 10
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                tickValues: [],
                label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#ffffff'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                tickValues: [],
                label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#ffffff'
                }
            }
        }
        if(this.state.tempTransLine.length === 0) {
            return this.displayNoData()
        } else {
            return(
                <View>
                    <StockLine data={this.state.tempTransLine} options={options} xKey='x' yKey='y'  />
                </View>
            )
        }
    }
    setDataPie() {
        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 320,
            height: 320,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        }
        if(this.state.tempTransPie.length === 0) {
            return this.displayNoData()
        } else {
            return(
                <View>
                    <Pie 
                        data={this.state.tempTransPie} 
                        options={options} 
                        accessorKey="total"
                        margin={{top: 20, left: 20, right: 20, bottom: 20}}
                        color="#2980B9"
                        pallete={[
                            {'r':25,'g':99,'b':201},
                            {'r':240,'g':100,'b':180},
                            {'r':201,'g':89,'b':250},
                            {'r':24,'g':175,'b':35},
                            {'r':190,'g':31,'b':69},
                            {'r':100,'g':36,'b':199},
                            {'r':214,'g':207,'b':32},
                            {'r':198,'g':84,'b':45}
                        ]}
                        r={50}
                        R={150}
                        label={{
                            fontFamily: 'Arial',
                            fontSize: 8,
                            fontWeight: true,
                            color: '#ECF0F1'
                        }}
                    />
                </View>
            )
        }
    }
    onNextPress() {
        if(!this.state.nextDisable) {
            var month = this.state.currentMonth + 1;
            if(month > 11) {
                month = month - 12
            }
            this.setState({currentMonth: month})
            this.getSelectedMonthData(month, this.state.sortCategory)
            this.disablePrevButtonNav(month)
            this.disableNextButtonNav(month)
        }
    }
    onPrevPress() {
        if(!this.state.prevDisable){
            var month = this.state.currentMonth - 1;
            if(month < 0) {
                month = month + 12
            }
            this.setState({currentMonth: month})
            this.getSelectedMonthData(month, this.state.sortCategory)
            this.disableNextButtonNav(month)
            this.disablePrevButtonNav(month)
        }
    }
    disablePrevButtonNav(month){
        var result = month === 0 ? true : false
        this.setState({prevDisable: result})
    }
    disableNextButtonNav(month) {
        var result = month === new Date().getMonth() ? true : false
        this.setState({nextDisable: result})
    }
    getSelectedMonthData(month, category) {
        // get min date
        var minDate = new Date()
        minDate.setMonth(month)

        // get max date
        var maxDate = new Date()
        var max = (month !== 1) ? maxDates[month] : (maxDate.getFullYear() % 4 === 0) ? 29 : 28
        maxDate.setMonth(month)
        maxDate.setDate(max)

        // get the data filtered by current month
        if(category === 'Date') {
            this.listenForTaskRef(this.transRef.ref.orderByChild('date').startAt(minDate.toISOString()).endAt(maxDate.toISOString()))
        } else {
            this.listenForTransRefPie(this.transRef.ref.orderByChild('date').startAt(minDate.toISOString()).endAt(maxDate.toISOString()))
        }
    }
    pickerChange(category) {
        // set sort category
        this.setState({sortCategory: category})
        this.getSelectedMonthData(this.state.currentMonth, category)
    }
    render(){
        return(
            <Image 
                style={[styles.background, styles.container]}
                source={background}
                resizeMode="cover">
                <View style={styles.container}>
                    <View style={styles.nav}>
                        <TouchableHighlight
                            onPress={this.onPrevPress.bind(this)}
                            underlayColor='#adadad'>
                            <View style={styles.buttonWrapper}>
                                <Image source={arrowLeft} style={{tintColor: this.state.prevDisable? '#adadad' : '#ffffff'}}/>
                                <Text style={{color: this.state.prevDisable? '#adadad' : '#ffffff'}}>Prev</Text>
                            </View>
                        </TouchableHighlight>
                        <Text style={styles.text}> {months[this.state.currentMonth]} </Text>
                        <TouchableHighlight
                            onPress={this.onNextPress.bind(this)}
                            underlayColor='#adadad'>
                            <View style={styles.buttonWrapper}>
                                <Text style={{color: this.state.nextDisable? '#adadad' : '#ffffff'}}>Next</Text>
                                <Image source={arrowRight} style={{tintColor: this.state.nextDisable? '#adadad' : '#ffffff'}}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.toolbar}>
                       <Text style={{color: '#fff'}}>Show by: </Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.sortCategory}
                            onValueChange={(val) => this.pickerChange(val)}>
                            <Picker.Item label='Date' value='Date'/>
                            <Picker.Item label='Category' value='Category'/>
                        </Picker>
                    </View>
                    {this.setData()}
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    nav: {
        backgroundColor: '#8C8C8C',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: (Platform.OS === 'ios') ? 30 : 0,   
    },
    buttonWrapper: {
        flexDirection: 'row',
        margin: 10,
    },
    text:{
      textAlign: "center",
      color: "#ffffff",
    },
    image:{
        tintColor: '#fff',
    },
    background: {
        flex: 1,
        height: null,
        width: null,
    },
    label:{
        color: "#ffffff"
    },
    picker: {
        color: "#ffffff",
        width: 100,
    },
    toolbar: {
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }, 
})
