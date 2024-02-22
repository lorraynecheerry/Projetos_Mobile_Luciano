import { useState, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from './FirebaseConnect'
import { useKeepAwake } from 'expo-keep-awake' //biblioteca para o mapa
import MapView, { Marker } from 'react-native-maps' //mapa
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Image
} from 'react-native'


const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Rota' component={Rota} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Login({ navigation }) {
  const [nusuario, setNusuario] = useState('')
  const [password, setPassword] = useState('')
  



  async function handleLogin() {

    try {
      const resposta = await api.post('/LoginMotoqueiros', {
        nusuario,
        password,

      })
      navigation.navigate('Dashboard')
      await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id))
      await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
      await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token))
      const iNome = await AsyncStorage.getItem('@nome')
      const positionAtual = await getCurrentPositionAsync();


      let usuarios = await firebase.database().ref('motoqueiros').child(resposta.data.id) //ref(NÓ), child(FILHO)
      //let chave = usuarios.push().key
      usuarios.child('localizacao').set({
        nusuario: nusuario,
        respNome: iNome,
        latitude: positionAtual.coords.latitude,
        longitude: positionAtual.coords.longitude

      })

    } catch (error) {
      console.log(error)
      alert('Usuário/Senha Incorretos')
    }
  }

  async function handleClearAsync() {
    await AsyncStorage.clear()
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Login Motoqueiros</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite Seu Usuário'
        value={nusuario}
        onChangeText={setNusuario}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite Sua Senha'
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText}>Enviar</Text>
      </TouchableOpacity>



    </View>
  )
}


function Dashboard({ navigation }) {
  const [pedido, setPedido] = useState([''])



  return (
    <View>
      <Text style={styles.titulo}>
        Dashboard
      </Text>
      
      <Text style={styles.titulo}>
      Motoqueiros:
    
      </Text>
      
      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='numero do pedido'
        //secureTextEntry={true}
        value={pedido}
        onChangeText={setPedido}
      /> 

      <View style={styles.rota}>
        <Button title='Retornar Login'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={styles.rota}>
        <Button title='Ver rota'
          onPress={() => navigation.navigate('Rota')}
        />
      </View>
    </View>
  )
}

function Rota({ navigation }) {
  useKeepAwake()
  const [localizacao, setlocalizacao] = useState(null)

  const mapaRef = useRef(MapView)

  useEffect(() => {
    async function requisitarLocal() {
      const { granted } = await requestForegroundPermissionsAsync()
      if (granted) {
        const positionAtual = await getCurrentPositionAsync()
        setlocalizacao(positionAtual)
      }
    }
    requisitarLocal()
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (resposta) => {
      setlocalizacao(resposta)
      mapaRef.current.animateCamera({
        pitch: 70,
        center: resposta.coords
      })
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#D9900F' barStyle='light-content' translucent={false} />

      {
        localizacao &&
        <MapView
          ref={mapaRef}
          style={styles.mapview}
          loadingEnabled={true}
          initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
          }}
        >

          <Image
            style={styles.iconMarker}
            source={require('./assets/capacete.png')}
          />


        </MapView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    color: '#FFFFFF',
    marginTop: 20,
    fontSize: 20,
    backgroundColor: '#000000',
    height: 45,
    width: '97%',
    borderRadius: 5,
    textAlign: 'center'
  },
  buttonEnviar: {
    marginTop: 30,
    backgroundColor: "#3A57FC",
    height: 45,
    width: '97%',
    borderRadius: 8,
  },
  buttonEnviarText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  buttonAsyncNome: {
    marginTop: 30,
    backgroundColor: "#FC553A",
    height: 45,
    width: '97%',
    borderRadius: 8,
  },
  buttonAsyncToken: {
    marginTop: 30,
    backgroundColor: "#FF0023",
    height: 45,
    width: '97%',
    borderRadius: 8,
  },
  buttonAsyncClear: {
    marginTop: 30,
    backgroundColor: "#DB9107",
    height: 45,
    width: '97%',
    borderRadius: 8,
  },
  textResposta: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
  mapview: {
    height: '100%',
    width: '100%'
  },
  iconMarker: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  rota: {
    marginTop: 20,
    padding: 5,
    height: 45,
    width: '97%',
    textAlign: 'center'
  }

})

export default App