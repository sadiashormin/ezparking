import React, { Component } from 'react'
import LoginInputs from './loginInputs.js'
import { Image,View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Login extends Component {
	constructor(props) {
	  super(props);
	 
	}
   render(){
      return( 
      <View style = {{backgroundColor: 'white'}}> 
            
          <Image source={require('../images/background.jpg')} style={{ position: 'absolute',top:1, resizeMode: 'cover', flex:1}}>

            </Image>
            <Image source={require('../images/logo.png')} style={{ width:40, height: 40,  }}>

            </Image>
         <Text style={{ fontSize: 20, color: '#FDC02F',  fontFamily: 'Cochin', textAlign:'center'}}> {this.props.landingMessage} </Text>
     	 <LoginInputs />
      </View>)
   }
}
export default Login;

Login.defaultProps = {
      landingMessage: "WELCOME TO EZPARK"
};



