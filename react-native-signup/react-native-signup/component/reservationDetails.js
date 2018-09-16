import React, { Component } from 'react'
import {Image, View, Text, TouchableOpacity, TextInput, StyleSheet, Picker } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
class ReservationDetails extends Component {
  state = {
      data: {},
      duration: 15
   }
  componentDidMount = () => {
    
    let url='http://ezpark.azurewebsites.net/api/Reservations?email='+global.user.email;
   
      fetch(url, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         if(responseJson.length>0) {
            this.setState({
              data: responseJson[0]
           })
          }else {
            alert("you don't have any active reservation");
            Actions.parkings({landingMessage: 'Listing your near by parking spots',type: 'reset'});
          }
         
      })
      .catch((error) => {
         console.error(error);
      });
   }
	constructor(props) {
	  super(props);
	 
	}
  cancelIt = () => {
      
      let currentTime = new Date();
      let endtime = new Date();
      endtime.setMinutes(endtime.getMinutes() + parseInt(this.state.duration));
      fetch('http://ezpark.azurewebsites.net/api/Reservations/'+this.state.data.Id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         Id: this.state.data.Id,
         ParkingSpotId: this.state.data.ParkingSpotId,
         UserId: this.state.data.UserId,
         StartTime: this.state.data.StartTime,
         EndTime: this.state.data.EndTime
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
         if(responseJson.Message){
             alert("Service unavailable, please try again later");
         }
         if(responseJson.Id){ 
          alert("Reservation is successfully cancelled");
          Actions.parkings({landingMessage: 'Listing your near by parking spots'});
         
         } else {
           alert("Service unavailable, please try again later");
            
         }

      })
      .catch((error) => {
         alert(error);
      });
   }
  convertUTCDateToLocalDate=(date)=> {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours +0);

    return newDate;   
} 
   render(){
     Moment.locale('en');
      return( 
         <View style={styles.container}> 
          <Image source={require('../images/background.jpg')} style={{ position: 'absolute',top:1, resizeMode: 'cover', flex:1}}>

            </Image>
           <View style= {{justifyContent: 'center', alignItems: 'center',backgroundColor: 'transparent'}}> 
               <Text style = {{fontSize: 15, color:'white', fontWeight: 'bold', paddingTop: 100}}>
                    RESERVED SPACE
              </Text>
               <Text style = {{fontSize: 100, color:'white', fontWeight: 'bold', paddingBottom: 20}}>
                    {this.state.data.SpaceId}
              </Text>
           </View>
           <View style={{ flexDirection: 'row', marginTop: 100, marginBottom:100 , padding:10, backgroundColor: '#525961'}}>
              <View style={{ flexGrow:1}}> 
                 <Text style = {{textAlign:'center', color:'white'}}>
                      Start Time
                </Text>
                 <Text style = {{textAlign:'center', fontSize: 15, color:'white', fontWeight: 'bold'}}>
                      
                 {Moment(this.convertUTCDateToLocalDate(new Date(this.state.data.StartTime))).format('h:mm:ss a')} 
                </Text>

             </View>
              
             <View style={{ flexGrow: 1}}> 
                 <Text style = {{textAlign:'center', color:'white'}}>
                      End Time
                </Text>
                 <Text style = {{textAlign:'center', fontSize: 15, color:'white', fontWeight: 'bold'}}>
                      {Moment(this.convertUTCDateToLocalDate(new Date(this.state.data.EndTime))).format('h:mm:ss a')} 

                </Text>
                 
             </View>
           </View>
           <View> 
                    
                    <TouchableOpacity
                       
                       style = {styles.reservationsButton}
                       onPress = {() => this.cancelIt()}>
                       
                       <Text style = {styles.reservationsButtonText}>
                          CANCEL RESERVATION
                       </Text>
                    </TouchableOpacity>
           
           </View>
         </View>
      )
   }
}
export default ReservationDetails;

const styles = StyleSheet.create ({
   container: {
      padding:10,
      backgroundColor: 'black',
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
   text: {
      color: '#4f603c'
   }
})
ReservationDetails.defaultProps = {
      landingMessage: "Reservation details"
};
