import { useState } from 'react'
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack'
import api from './api'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import { createNavigationContainer } from '@react-navigation/native';

const Stack = createNavigationContainer()


export default function App() {
  return (
    <NavigationCntainer>
      <Stack.Navigation>
        <Stack.Screen  name='Inicio' component ={Inicio}/>
        <Stack.Screen  name='Dashborad' component ={Dashboard}/>
      </Stack.Navigation>
    </NavigationCntainer>
  );
}

function Inicio ({}) {
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
