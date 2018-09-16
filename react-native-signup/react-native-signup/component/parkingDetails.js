import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Picker } from 'react-native'
import { Actions } from 'react-native-router-flux';

class ParkingDetails extends Component {
  state = {
      data: {},
      duration: 15
   }
  componentDidMount = () => {
   
    let url='http://ezpark.azurewebsites.net/api/parkingspots/'+this.props.Id;
      fetch(url, {
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
  reserveIt = () => {
     if(this.state.data.NumberOfAvailableParking==0)
       {
        alert("No parking space Available");
        return;
       }
      let currentTime = new Date();
      let endtime = new Date();
      endtime.setMinutes(endtime.getMinutes() + parseInt(this.state.duration));
      fetch('http://ezpark.azurewebsites.net/api/Reservations/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         ParkingSpotId: this.props.Id,
         UserId: global.user.id,
         StartTime: currentTime.toISOString(),
         EndTime: endtime.toISOString()
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
         if(responseJson.Message){
             alert("You might have another active reservation, please cancel that reservation first to proceed");
         } else {
            alert("Reservation is successful.");
            Actions.reservationDetails();
         }
      })
      .catch((error) => {
         alert("You have another active reservation, please check your reservation");
      });
   }
   render(){
      return( 
      <View style={styles.container}> 
         <Text> {this.props.landingMessage} </Text>
          <Image source={require('../images/background.jpg')} style={{ position: 'absolute',top:1, resizeMode: 'cover', flex:1}}>

            </Image>
         <View style={{ flexDirection: 'row'}}>
            <View style={{ flexGrow:1,backgroundColor: 'transparent'}}> 
               <Text style = {{textAlign:'center', fontSize: 40, color:'white', fontWeight: 'bold'}}>
                    {this.state.data.NumberOfSpace}
              </Text>
               <Text style = {{textAlign:'center', color:'white'}}>
                    Space
              </Text>
           </View>
            <View style={{ flexGrow:1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'transparent'}}> 
                <Image style={{width: 100, height: 100}}
                 source={require('../images/pin.png')}
               />
            </View>
           <View style={{ flexGrow: 1, backgroundColor: 'transparent'}}> 
               <Text style = {{textAlign:'center', fontSize: 40, color:'white', fontWeight: 'bold'}}>
                    {this.state.data.NumberOfAvailableParking}
              </Text>
               <Text style = {{textAlign:'center', color:'white'}}>
                    Available
              </Text>
           </View>
         </View>
       
          <View style= {{justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}> 
             <Text style = {{fontSize: 20, color:'white', fontWeight: 'bold'}}>
                  {this.state.data.Name}
            </Text>
             <Text style = {{fontSize: 10, color:'white', fontWeight: 'bold'}}>
                  {this.state.data.Address}
            </Text>
             <Text style = {{fontSize: 10, color:'white', fontWeight: 'bold'}}>
                  {this.state.data.City}
            </Text>
             <Text style = {{fontSize: 10, color:'white', fontWeight: 'bold'}}>
                  {this.state.data.ZipCode}
            </Text>
         </View>
        
         
         <Picker 
           selectedValue={this.state.duration} onValueChange={(itemValue, itemIndex) => this.setState({duration: itemValue})}>
           <Picker.Item label="15 minute" value="15" color="white" fontSize="10"/>
           <Picker.Item label="30 minute" value="30" color="white"/>
           <Picker.Item label="1 Hour" value="60" color="white"/>
           <Picker.Item label="2 Hour" value="120" color="white"/>
           <Picker.Item label="3 hours" value="180" color="white"/>
           <Picker.Item label="8 Hour" value="480" color="white"/>
         </Picker>
          <Text style = {{fontSize: 15, color:'white',  textAlign: 'center', paddingBottom: 20,backgroundColor: 'transparent'}}>
                  Duration
            </Text>
         <View> 
                  <TouchableOpacity
                     
                     style = {styles.reservationsButton}
                     onPress = {() => this.reserveIt()}>
                     
                     <Text style = {styles.reservationsButtonText}>
                        RESERVE
                     </Text>
                  </TouchableOpacity>
         
         </View>
      </View>

      )
   }
}
export default ParkingDetails;

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
     paddingTop:30,
     paddingBottom:10,
     color: 'white',
     fontSize: 15,
     fontWeight:'bold'
   },
   parking: {
    
     padding: 5,
     borderBottomColor: "black",
     borderBottomWidth: 1
   },
   name: {
     color: 'black',
     fontSize: 15,
     fontWeight:'bold',
     backgroundColor: 'transparent'
   },
    address: {
     color: 'black',
     fontSize: 12
     
   },
   text: {
      color: '#4f603c'
   }
})
ParkingDetails.defaultProps = {
      landingMessage: "Parking details"
};
