import React, { useState, useEffect } from "react"
import RNPickerSelect from 'react-native-picker-select'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  const Itoken = AsyncStorage.getItem('token')
  const token = (Itoken)

  useEffect(() => {
    async function listarClientes() {
      try {
        const resposta = await api.get('/ListarClientes', {
          headers: {
            Authorization: `${token}`
          }
        });
        setClientes(resposta.data);
      } catch (error) {
        console.error(error);
      }
    }
    listarClientes();
  }, []);



  async function lerCategorias() {

    const resposta = await apilocal.get('/ListarCategorias', {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      }
    })
    setCategorias(resposta.data)
  }
  lerCategorias()



  useEffect(() => {
    const Itoken = AsyncStorage.getItem('token')
    const token = (Itoken)

    try {
      if (categoriaId) {
        return
      }
      async function lerProdutosCategoria() {
        const resposta = await apilocal.get(`/ListarProdutosCategoria/${categoriaId}`, {
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


  function ModalPedidos() {

    const [modalVisible, setModalVisible] = useState(false);



    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>


          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View>
                <Text>FAÇA JA SEU PEDIDO </Text>


                <RNPickerSelect
                  value={categorias}
                  key={categorias}
                  onValueChange={(value) => setCategorias(value)}
                  items={categorias.map((item) => ({ label: item.nome, value: item.id }))}
                />
              </View>



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
          <Text style={styles.textStyle}>Fazer Pedidos</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View>
      <Text style={styles.Text}> Fazer Pedidos</Text>


      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.button}>
        <Text style={styles.buttonEnviarText}>Dashboard</Text>

      </TouchableOpacity>



      <RNPickerSelect
        value={idCliente}
        key={idCliente}
        onValueChange={(value) => setIdCliente(value)}
        items={clientes.map((item) => ({ label: item.nome, value: item.id }))}
      />
      {/* 
      <TouchableOpacity onPress={() => {modalVisible}} style={styles.button}>
        <Text style={styles.buttonEnviarText}>fazer Pedido</Text>

      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => { ModalPedidos }}><Text>Enviar</Text></TouchableOpacity>


      <ModalPedidos />
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
    backgroundColor: 'purple',
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'purple',
    borderRadius: 10,
    padding: 10,
    width: 187
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