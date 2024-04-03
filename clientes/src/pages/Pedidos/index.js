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
  Pressable

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

  function ModalPedidos() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <View>
                  <>
                    {clientes.map((item) => {
                      return (
                        <Text value={item.id}>{item.nome}-</Text>
                      )
                    })}
                  </>
                </View>
              </Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}> Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Fazer Pedido</Text>
        </Pressable>
      </View>
    )
  }


  return (
    <View>
      <Text style={styles.Text}> Fazer Pedidos</Text>
      <ModalPedidos />

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
      <View>
        <>

          {clientes.map((item) => {
            return (
              item.nome

            )
          })}
        </>
      </View>


      <TextInput
        style={styles.input}
        placeholderTextColor='black'
        placeholder='Digite seu pedido'
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
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    //backgroundColor: "#FFFFFF",
    // height: 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 600,
    width: 350
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#FF9933',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

})