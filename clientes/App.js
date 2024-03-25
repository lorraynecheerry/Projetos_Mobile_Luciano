import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from "../clientes/FirebaseConnect"


import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native'


const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Pedido' component={Pedido} />
        {/* <Stack.Screen name='Dashboard' component={Dashboard} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Login({ navigation }) {
  const [nusuario, setNusuario] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {

    try {
      const resposta = await api.post('/LoginClientes', {
        nusuario,
        password
      })
      navigation.navigate('Dashboard')


    } catch (error) {
      console.log(error)
      alert('Nome ou Senha incorretas')
    }

  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Login Clientes</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite Seu email'
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

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const [pedidos, setPedidos] = useState([''])

  const iToken = localStorage.getItem('@tklogin2023')
  const token = JSON.parse(iToken)


  useEffect(() => {
    // if (!token) {
    //   navigation ()
    // }
    async function verificaToken() {
      const resposta = await api.get('/ListarUsuarioToken', {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })
    }
  }, [])


  useEffect(() => {

    async function acompanhamentoPedido() {
      await firebase.database().ref('motoqueiros').on('value', (snapshot) => {
        snapshot?.forEach((item) => {
          let data = {
            key: item.key,
            latitude: item.val().localizacao.latitude,
            longitude: item.val().localizacao.longitude
          }
          setLatitude(data.latitude)
          setLongitude(data.longitude)
        })
      })
    }
    acompanhamentoPedido()
  }, [])
  return (
    <View>
      <Text style={styles.titulo}>
        Dashboard
      </Text>

      <View>
        <Text style={styles.titulo}> latitude:{latitude}</Text>
        <Text style={styles.titulo}> longitude:{longitude}</Text>
      </View>

      <Button title='Retornar Login'
        onPress={() => navigation.navigate('Login')}
      />
      <Button title='ir para pedidos'
        onPress={() => navigation.navigate('Pedido')}
      />


    </View>
  )
}

function Pedido({ navigation }) {


  return (
    <View>
      <Text>Pedidos</Text>

      <Button title='Retornar Login'
        onPress={() => navigation.navigate('Login')}
      />
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
    backgroundColor: '#9cc3b2',
    height: 45,
    width: '97%',
    borderRadius: 5,
    textAlign: 'center'
  },
  buttonEnviar: {
    marginTop: 30,
    backgroundColor: "#678578",
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
  localFirebase: {
    margintop: 30,

  }
})

export default App