import React, { Component } from 'react'
import TabNavigator from 'react-native-tab-navigator'
import Dashboard from './dashboard'
import TransactionHistory from './transactionHistory'
import{
    View
} from 'react-native'

export default class Tabbar extends Component{
    constructor(props){
        super(props)
        this.state ={
            selectedTab : this.props.selectedTab
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
                            navigator={this.props.navigator} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'transaction'}
                        title = 'Transaction History'
                        onPress={() => this.setState({selectedTab: 'transaction'})}>
                        {<TransactionHistory 
                            selectedTab={this.state.selectedTab}
                            navigator={this.props.navigator} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'account'}
                        title = 'Account'
                        onPress={() => this.setState({selectedTab: 'account'})}>
                        {<Dashboard 
                            selectedTab={this.state.selectedTab}
                            navigator={this.props.navigator}/>}
                    </TabNavigator.Item>
                </TabNavigator>
        )
    }
}