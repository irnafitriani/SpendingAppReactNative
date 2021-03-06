import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from './Actions'
import { BackAndroid } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Dashboard from './dashboard'
import TransactionHistory from './transactionHistory'
import Account from './account'
import Settings from './settings'
import{
    View,
    Image
} from 'react-native'
const showChart = require("../images/show_chart.png")
const showHistory = require("../images/description.png")
const selectedChart = require("../images/show_chart_white.png")
const selectedHistory = require("../images/description_white.png")
const showAccount = require("../images/person.png")
const settingsIcon = require("../images/settings_black.png")

class Tabbar extends Component{
    constructor(props){
        super(props)
        BackAndroid.removeEventListener('hardwareBackPress', () => {
        })
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.replace({
                title: 'Tabbar',
                id: 'Tabbar',
                selectedTab : this.state.selectedTab,
                userInfo: this.props.userInfo,
            });
            return true;
        })
        this.state ={
            selectedTab : this.props.selectedTab,
            userInfo : this.props.userInfo
        }
    }
    render(){
        return(
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'dashboard'}
                        title = 'Dashboard'
                        renderIcon={() => <Image source={showChart} style={{width: 24, height: 24}} />}
                        onPress={() => this.setState({selectedTab: 'dashboard'})}>
                        {<Dashboard 
                            selectedTab={this.state.selectedTab}
                            userInfo={this.props.userInfo}
                            navigator={this.props.navigator} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'transaction'}
                        title = 'Transaction History'
                        renderIcon = {() => <Image source={showHistory} style={{width: 24, height: 24}} />}
                        onPress={() => this.setState({selectedTab: 'transaction'})}>
                        {<TransactionHistory 
                            selectedTab={this.state.selectedTab}
                            userInfo={this.props.userInfo}
                            navigator={this.props.navigator} />}
                    </TabNavigator.Item>
                     <TabNavigator.Item
                        selected={this.state.selectedTab === 'settings'}
                        title = 'Settings'
                        renderIcon = {() => <Image source={settingsIcon} style={{width: 24, height: 24}} />}
                        onPress={() => this.setState({selectedTab: 'settings'})}>
                        {<Settings 
                            selectedTab={this.state.selectedTab}
                            userInfo={this.props.userInfo}
                            navigator={this.props.navigator}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'account'}
                        title = 'Account'
                        renderIcon = {() => <Image source={showAccount} style={{width: 24, height: 24}} />}
                        onPress={() => this.setState({selectedTab: 'account'})}>
                        {<Account 
                            selectedTab={this.state.selectedTab}
                            userInfo={this.props.userInfo}
                            navigator={this.props.navigator}/>}
                    </TabNavigator.Item>
                </TabNavigator>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)        
}

export default connect(mapDispatchToProps)(Tabbar)
