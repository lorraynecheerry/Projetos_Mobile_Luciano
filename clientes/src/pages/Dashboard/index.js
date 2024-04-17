import { useState, useEffect } from 'react'
//import {AsyncStorage} from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Context } from '../../Contexts/contexto'
import api from '../../../api'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,

} from 'react-native'



export default function Dashboard({ }) {
  const navigation = useNavigation()


  // const [latitude, setLatitude] = useState('')
  // const [longitude, setLongitude] = useState('')
  const [cliente, setCliente] = useState([''])

  //const [pedidos, setPedidos] = useState([''])


  useEffect(() => {
    try {
      async function loadClientes() {
        const resposta = await api.get('/ListarClientes')
        setCliente(resposta.data)

      }
      loadClientes()

    } catch (error) {

    }
  }, [cliente])


  // useEffect(() => {

  //   async function acompanhamentoPedido() {
  //     await firebase.database().ref('motoqueiros').on('value', (snapshot) => {
  //       snapshot?.forEach((item) => {
  //         let data = {
  //           key: item.key,
  //           latitude: item.val().localizacao.latitude,
  //           longitude: item.val().localizacao.longitude
  //         }
  //         setLatitude(data.latitude)
  //         setLongitude(data.longitude)
  //       })
  //     })
  //   }
  //   acompanhamentoPedido()
  // }, [])

  return (
    <View>
      <Text style={styles.titulo}>
        Dashboard
      </Text>

      <ScrollView>
        <View style={styles.container}>


          {cliente.map((item) => {
            return (
              <View style={styles.container}>
                <Text style={styles.titulo} value={item.id} key={item.id}>  {item.nome}</Text>
             

              </View>

            )
          })}


        </View>
      </ScrollView>


      <TouchableOpacity onPress={() => navigation.navigate('Pedidos')} style={styles.button}>
        <Text style={styles.buttonEnviarText}>ir para pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonEnviarText}>Menu</Text>
      </TouchableOpacity>


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
  titulo1: {
    fontSize: 19,
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

  button: {
    marginTop: 30,
    backgroundColor: "#DB9107",
    height: 45,
    width: '50%',
    borderRadius: 8,
  },


})