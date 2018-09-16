import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';
class LoginInputs extends Component {
	constructor(props) {
	  super(props);

	}
   state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (email, password) => {
      let url ='http://ezpark.azurewebsites.net/api/Users?email='+email+'&password='+password;
     
      fetch(url, {
         method: 'GET'
      })
      .then((response) =>
         response.json()
      )
      .then((responseJson) => {
         if(responseJson && responseJson.Id) {
            global.user.id=responseJson.Id;
            global.user.email=responseJson.Email; // todo change it to email instead of UserId
            Actions.parkings({landingMessage: 'Listing your near by parking spots',type: 'reset'});
         } else{
            alert("Invalid email or password");
         }
      })
      .catch((error)=> {
          alert("Invalid email or password");
      });
   }

   goToSignup= () => {
   	Actions.signup({landingMessage: 'welcome to ezpark'});
   }

   render(){
   	const goToSignup = () => Actions.signup({welcometext: 'Hello World!'}); 
      return (

         <View style = {styles.container}>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               autoCorrect={false}
               placeholderTextColor = "#FFECD8"
               autoCapitalize = "none"
              
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#FFECD8"
               autoCapitalize = "none"
               autoCorrect={false}
               secureTextEntry={true}
               onChangeText = {this.handlePassword}/>
               
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> LOG IN </Text>
            </TouchableOpacity>
            <TouchableOpacity
               style = {styles.signupButton}
               onPress = {
                  () => this.goToSignup()
               }>
               <Text style = {styles.signupButtonText}> SIGN UP </Text>
            </TouchableOpacity>
            
         </View>
      )
   }
}
export default LoginInputs



const styles = StyleSheet.create({
   container: {
      padding: 40,
      paddingTop: 23,
      justifyContent: 'center',
     
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#CCC',
      borderWidth: 1,
      color: '#FDC02F',
       paddingLeft: 5,
       backgroundColor: '#525961'
   },
   submitButton: {
      backgroundColor: '#FDC02F',
      padding: 10,
      margin: 15,
      height: 40,
     
   },
   signupButton: {
      backgroundColor: '#DC6365',
     
     padding:10,

      margin: 15,
      height: 40,
      marginTop:50,
      
   },
   submitButtonText:{
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
   },
   signupButtonText:{
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
   }
})