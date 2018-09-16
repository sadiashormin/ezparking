import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './login.js'
import Signup from './signup.js'
import Parkings from './parkings.js'
import ParkingDetails from './parkingDetails.js'
import ReservationDetails from './reservationDetails.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "login" component = {Login} title = "LOG IN"  />
         <Scene key = "signup" component = {Signup} title = "SIGN UP" />
         <Scene key = "parkings" component = {Parkings} title = "NEARBY PARKING LIST"  initial = {true}/>
         <Scene key = "parkingDetails" component = {ParkingDetails} title = "PARKING DETAILS" />
         <Scene key = "reservationDetails" component = {ReservationDetails} title = "RESERVATION DETAILS" />
      </Scene>
   </Router>
)
export default Routes