// import { useEffect, useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import api from './api'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import firebase from "../clientes/FirebaseConnect"


// import {
//   StyleSheet,
//   StatusBar,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Button,

// } from 'react-native'


// const Stack = createNativeStackNavigator()

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name='Dashboard' component={Dashboard} />
//         <Stack.Screen name='Pedido' component={Pedido} />
      
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './routes/routes'



export default function App() {
  return (
   <NavigationContainer>
  <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
  <Rotas />
   </NavigationContainer>
  );
}

