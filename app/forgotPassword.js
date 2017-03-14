import React, { Component } from 'react'
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'

const background = require("../images/background.jpg");
const lockIcon = require("../images/lock.png");
const personIcon = require("../images/person.png");
const mailIcon = require("../images/mail.png");

export default class Registration extends Component{
    goToSignIn(){
        this.props.navigator.replace({
            title: 'Login',
            id: 'Login'
        })
    }
    render(){
        return(
            <Image 
                style={[styles.background, styles.container]}
                source={background}
                resizeMode="cover">
            <View style={styles.container} />
                <View style={styles.wrapper}>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image
                                source={mailIcon}
                                style = {styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <TouchableOpacity activeOpacity={.5}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Reset Password</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.5}
                        onPress={this.goToSignIn.bind(this)}>
                        <View>
                            <Text style={styles.loginText}>Back to Sign In</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            <View style={styles.container} />

            </Image>

        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
      width: null,
      height: null
  },
  inputWrap:{
      flexDirection: "row",
      marginVertical: 10,
      height: 40,
      backgroundColor:"transparent"
  },
  input:{
      flex : 1,
      paddingHorizontal: 10,
      backgroundColor: "#FFF"
  },
  wrapper:{
      paddingHorizontal: 15
  },
  iconWrap:{
      paddingHorizontal: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff"
  },
  icon:{
      width: 20,
      height: 20
  },
  button:{
      backgroundColor: "#ffffff",
      paddingVertical: 15,
      marginVertical: 15,
      alignItems: "center",
      justifyContent: "center"
  },
  buttonText:{
      color:"#0d0d0d",
      fontSize: 18

  },
  loginText: {
      color:"#FFF",
      backgroundColor:"transparent",
      textAlign: "center"
  }
});