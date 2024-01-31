import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet,Text } from 'react-native';
import MapView from 'react-native-maps'
import { requestBackgroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';



export default function App() {
  const [localizacao, setlocalizacao] = useState(null);
  const [loading, setLoading] = useState(false)

 

    async function requisitarLocal() {
      const { granted } = await requestBackgroundPermissionsAsync()
      if (granted) {
        const positionAtual = await getCurrentPositionAsync()
        setlocalizacao(positionAtual)
        //console.log(positionAtual)
        setLoading(true)
      }
    }

 

  useEffect(()=> {
    requisitarLocal()
    
  },[localizacao])
  
  if(loading=== false) {
    return(
      <View>
        <Text>Aguarde....</Text>

      </View>
    )
  }

  return (
    <View style={style.container}>
      <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
      <MapView
        style={style.mapView}
        loadingEnabled={true}    //pra aparecer um pontinho na localizaçao
        initialRegion={{
          latitude: localizacao.coords.latitude,
          longitude: localizacao.coords.longitude,
          latitudeDelta: 0.006, //zoom do mapa
          longitudeDelta: 0.006  //zoom  do mapa

        }}

      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    height: '100%',
    width: '100%',

  },



})