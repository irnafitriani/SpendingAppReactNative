import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Dashboard from './dashboard'
import TransactionHistory from './transactionHistory'
import Account from './account'
import{
    View
} from 'react-native'

export default class Tabbar extends Component{
    constructor(props){
        super(props)
        BackAndroid.removeEventListener('hardwareBackPress', () => {
            // const routes = this._navigator.getCurrentRoutes();
            // route = routes[routes.length - 1];

            // if(route.id === 'Login') {
            //     // back android button pressed at login page, exit app
            //     return false;
            // } else {
            //     // back android button pressed at other than login page, navigate to login page
            //     this._navigator.replace({
            //         title: 'Login',
            //         id: 'Login'
            //     });
            //     return true;
            // }
        })
        BackAndroid.addEventListener('hardwareBackPress', () => {
            const routes = this.props.navigator.getCurrentRoutes();
            route = routes[routes.length - 1];
                this.props.navigator.replace({
                    title: 'Tabbar',
                    id: 'Tabbar',
                    selectedTab : this.state.selectedTab,
                    userInfo: this.props.userInfo,
                });
                return true;
            // }
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
                        onPress={() => this.setState({selectedTab: 'dashboard'})}>
                        {<Dashboard 
                            selectedTab={this.state.selectedTab}
                            userInfo={this.props.userInfo}
                            navigator={this.props.navigator} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'transaction'}
                        title = 'Transaction History'
                        onPress={() => this.setState({selectedTab: 'transaction'})}>
                        {<TransactionHistory 
                            selectedTab={this.state.selectedTab}
                            userInfo={this.props.userInfo}
                            navigator={this.props.navigator} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'account'}
                        title = 'Account'
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