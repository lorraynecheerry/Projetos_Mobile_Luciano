import React,{useState, useEffect} from 'react';
import firebase from './fireBaseConnect';

import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default function App() {
  useEffect(() => {
    async function dados(){
      await firebase.database().ref('usuarios').set('nome')
    }
    dados()

  },[])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle={'default'} translucent={false} />
      <Text>USANDO FIREBASE</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
