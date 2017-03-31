import React, { Component } from 'react'
import { Navigator, BackAndroid } from 'react-native'
import Registration from './registration'
import Login from './login'
import ForgotPassword from './forgotPassword'
import AddTransaction from './addTransaction'
import TransactionHistory from './transactionHistory'
import TransactionDetail from './transactionDetail'
import Tabbar from './tabbar'

export default class Navigation extends Component{
    constructor() {
        super()
        BackAndroid.addEventListener('hardwareBackPress', () => {
            const routes = this._navigator.getCurrentRoutes();
            route = routes[routes.length - 1];

            if(route.id === 'Login') {
                // back android button pressed at login page, exit app
                return false;
            } else {
                // back android button pressed at other than login page, navigate to login page
                this._navigator.replace({
                    title: 'Login',
                    id: 'Login'
                });
                return true;
            }
        })
    }

    renderScene(route, navigator){
        this._navigator = navigator;
        switch (route.id){
            case 'Registration':
                return(<Registration navigator={ navigator } />)
            case 'Login':
                return(<Login navigator={ navigator } />)
            case 'ForgotPassword':
                return(<ForgotPassword navigator={ navigator } />)
            case 'AddTransaction':
                return(<AddTransaction navigator={ navigator } selectedTab={route.selectedTab} 
                        transaction={route.transaction} userInfo={route.userInfo} mode={route.title }/>)
            case 'TransactionDetail':
                return(<TransactionDetail navigator={ navigator } selectedTab={route.selectedTab}  
                        userInfo={route.userInfo} transaction={route.transaction} />)
            case 'Tabbar':
                return(<Tabbar navigator={ navigator } selectedTab={route.selectedTab} userInfo={route.userInfo}/>)
        }
    }
    render(){
        return(
            <Navigator 
                initialRoute = {{id: 'Login'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
            />
        )
    }
}