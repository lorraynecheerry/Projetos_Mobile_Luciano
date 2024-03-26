import {useState, useEffect}from 'react'
//import {AsyncStorage} from '@react-native-async-storage/async-storage'

import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
  
  } from 'react-native'
  
  

 export default function Dashboard({ navigation }) {

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
  
    //const [pedidos, setPedidos] = useState([''])
  
    // const iToken = localStorage.getItem('@tklogin2023')
    // const token = JSON.parse(iToken)
  
  
    // useEffect(() => {
    //   async function verificaToken() {
    //     const resposta = await api.get('/ListarUsuarioToken', {
    //       headers: {
    //         Authorization: 'Bearer ' + `${token}`
    //       }
    //     })
    //     verificaToken()
    //   }
    // }, [])
  
  
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
