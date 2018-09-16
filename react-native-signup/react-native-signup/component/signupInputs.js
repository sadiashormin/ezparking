import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';
class SignupInputs extends Component {
   state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: ''
   }
   handleFirstName = (text) => {
      this.setState({ firstName: text })
   }
   handleLastName = (text) => {
      this.setState({ lastName: text })
   }

   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   handlePhone = (text) => {
      this.setState({ phone: text })
   }

   signup = (firstName, lastName, email, password, phone) => {
      //alert('firstName: ' + firstName +'lastName: ' + lastName +'email: ' + email + ' password: ' + password+ ' phone: ' + phone);
      fetch('http://ezpark.azurewebsites.net/api/Users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         FirstName: firstName,
         LastName: lastName,
         Email: email,
         Password: password,
         Phone: phone
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
         if(responseJson.Id){
             alert("Account successfully created. Please login");
            Actions.login({landingMessage: 'Account successfully created. Please login'});
            
         } else {
            alert("Service unavailable, please try again later");
         }

         
         this.setState({
            data: responseJson
         })
      })
      .catch((error) => {
         alert(error);
      });
   }
   render(){
      return (
         <View style = {styles.container}>
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "First Name"
               placeholderTextColor = "#FFECD8"
               autoCapitalize = "none"
               onChangeText = {this.handleFirstName}/>
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Last Name"
               placeholderTextColor = "#FFECD8"
               autoCapitalize = "none"
               onChangeText = {this.handleLastName}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#FFECD8"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#FFECD8"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>


            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Phone"
               placeholderTextColor = "#FFECD8"
               autoCapitalize = "none"
               onChangeText = {this.handlePhone}/>
               
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.signup(this.state.firstName,this.state.lastName, this.state.email, this.state.password, this.state.phone)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default SignupInputs

const styles = StyleSheet.create({
   container: {
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
      backgroundColor: '#FDC02F',
      padding: 10,

      margin: 15,
      height: 40,
      
   },
   submitButtonText:{
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      

   }
})