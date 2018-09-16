import React, { Component } from 'react'
import {Image, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

class Parkings extends Component {
  state = {
      data: []
   }
  componentDidMount = () => {
      fetch('http://ezpark.azurewebsites.net/api/parkingspots?lat=30.4006491&lng=-96.0780337', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }
	constructor(props) {
	  super(props);
	 
	}
  alertItemName = (item) => {
    
      Actions.parkingDetails({Id: item.Id});

   }
   reservations = (item) => {
       Actions.reservationDetails();
   }
   logout = (item) => {
       Actions.login({type: 'reset'});
   }
   render(){
      return( 
      <View style={styles.container}> 
             <Image source={require('../images/background.jpg')} style={{ position: 'absolute',top:1, resizeMode: 'cover', flex:1}}>

            </Image>
         <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,flexDirection: 'row'}}> 
             <View style={{ flexGrow:1}}> 
               <TouchableOpacity
                  
                  style = {styles.reservationsButton}
                  onPress = {() => this.reservations()}>
                  
                  <Text style = {styles.reservationsButtonText}>
                     ACTIVE RESERVATION
                  </Text>
               </TouchableOpacity>
              </View>
               <View style={{ flexGrow:1, borderLeftWidth:1, borderLeftColor:'black'}}> 
                  <TouchableOpacity
                     
                     style = {styles.reservationsButton}
                     onPress = {() => this.logout()}>
                     
                     <Text style = {styles.reservationsButtonText}>
                        LOG OUT
                     </Text>
                  </TouchableOpacity>
              </View>
         </View>
         <Text style={styles.landingTextStyle}> {this.props.landingMessage} </Text>
         <View> 
            {
               this.state.data.map((item, index) => (
                  <TouchableOpacity
                     key = {item.Id}
                     style = {styles.parking}
                     onPress = {() => this.alertItemName(item)}>
                     
                     <Text style = {styles.name}>
                        {item.Name}
                     </Text>
                     <Text style = {styles.address}>
                        {item.Address}, {item.City}, {item.ZipCode}
                     </Text>
                     
                  </TouchableOpacity>
               ))
            }
         </View>
      </View>

      )
   }
}
export default Parkings;

const styles = StyleSheet.create ({
   container: {
      padding:10,
     
      flex:1
      
   },
   reservationsButtonText: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
   },
   reservationsButton: {
     backgroundColor: '#FDC02F',
      paddingTop: 10,
       paddingBottom: 10,
      height: 40,
   },
   landingTextStyle: {
     paddingTop:10,
     paddingBottom:10,
     color: 'white',
     fontSize: 15,
     fontWeight:'bold',
     backgroundColor: 'transparent'
   },
   parking: {
     backgroundColor: 'white',
     padding: 10,
     borderBottomColor: "#CCC",
     borderBottomWidth: 1
   },
   name: {
     color: 'black',
     fontSize: 25,
     color: "#4D535F",
     fontWeight:'bold'
   },
    address: {
     color: 'black',
     fontSize: 17
     
   },
})
Parkings.defaultProps = {
      landingMessage: "Listing all your nearby parkings"
};
