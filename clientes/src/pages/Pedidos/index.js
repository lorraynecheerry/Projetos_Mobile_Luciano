import React, { useState, useEffect } from "react"
import OptionsMenu from "react-native-options-menu"
import RNPickerSelect from 'react-native-picker-select'
import { useNavigation } from '@react-navigation/native'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import api from '../../../api'
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,

} from 'react-native'

export default function Pedido({ }) {
  const [idCliente, setIdCliente] = useState('')
  const [pedidos, setPedidos] = useState('')
  const [categorias, setCategorias] = useState([''])
  const [clientes, setClientes] = useState([''])
  const [categoriaId, setCategoriaId] = useState('')
  const [produtosCategoria, setProdutosCategoria] = useState([''])

  const [modalAberto, setModalAberto] = useState(false)
  const [nusuario, setNusuario] = useState('')

  const navigation = useNavigation()

  //  const iToken = AsyncStorage.settItem('@tklogin2023')
  // const token = JSON.parse(iToken)



  useEffect(() => {
    async function listarClientes() {
      const resposta = await api.get('/ListarClientes', {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })
      setClientes(resposta.data)
    }
    listarClientes()
  }, [clientes])

  useEffect(() => {
    try {
      if (categoriaId) {
        return
      }
      async function lerProdutosCategoria() {
        const resposta = await api.get(`/ListarProdutosCategoria/${categoriaId}`, {
          headers: {
            Authorization: 'Bearer ' + `${token}`
          }
        })
        setProdutosCategoria(resposta.data)
      }
      lerProdutosCategoria()

    } catch (err) {

    }
  }, [categoriaId])

  async function abrirModal() {
    try {
      const clienteId = idCliente
      const resposta = await api.post('/CriarPedido', {
        clienteId
      }, {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })
      setPedidos(resposta.data)
      if (resposta.data.id) {
        setModalAberto(true)
      }

      async function lerCategorias() {
        const resposta = await api.get('/ListarCategorias', {
          headers: {
            Authorization: 'Bearer ' + `${token}`
          }
        })
        setCategorias(resposta.data)
      }
      lerCategorias()
    } catch (error) {
      console.log(error)
    }
  }

  function fecharModal() {
    setModalAberto(false)
  }

  return (
    <View>
      <Text style={styles.Text}> Fazer Pedidos</Text>

      {/* <selection
        value={idCliente}
        onPress={(e) => setIdCliente(e.target.value)}
      >
        <option>Selecione o Cliente...</option>
        <View>

        {clientes.map((item) => {
          return (
            <option value={item.id}>{item.nome}</option>
          )
        })}
        </View>
      </selection> */}

      {/* <Button onPress={abrirModal}>CriarPedido</Button> */}


      <TextInput
        style={styles.input}
        placeholderTextColor='black'
        placeholder='Digite Seu email'
        value={nusuario}
        onChangeText={setNusuario}
      />

      
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.button}>
        <Text style={styles.buttonEnviarText}>Dashboard</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
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
  Text: {
    fontSize: 30,
    fontWeight: 'bold',
  },

})