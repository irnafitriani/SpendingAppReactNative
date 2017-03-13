import React, { Component } from 'react'
import { Navigator } from 'react-native'
import Registration from './registration'
import Login from './login'


export default class Navigation extends Component{
    renderScene(route, navigator){
        _navigator = navigator;
        switch (route.id){
            case 'Registration':
                return(<Registration navigator={ navigator } />)
            case 'Login':
                return(<Login navigator={ navigator } />)
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