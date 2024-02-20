import React, { useState, useEffect } from 'react';
import firebase from './fireBaseConnect';

import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,

} from 'react-native';


export default function App() {

  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [vendedores, setVendedores] = useState([''])

  //identificador do vendedor
  //const vendedor = 14

  async function Login() {
    if (!nome || !cidade) {
      alert('campos vazios')
    }
    let usuarios = await firebase.database().ref('vendedores')//.child(vendedor)
    let chave = usuarios.push().key //cria uma chave unica firebase

    usuarios.child(chave).set({
      nome: nome,
      cidade: cidade
    })
    setNome('')
    setCidade('')
    Keyboard.dismiss()
  }


  useEffect(() => {
    async function buscarVendedores() {
      await firebase.database().ref('vendedores').on('value', (snapshot) => { //snapshot é uma palavra q vai receber informaçoes
        setVendedores([''])
        snapshot?.forEach((item) => {   //forEach= laço de repetiçao   //item = pode ser qualquer nome para ser chamado no data
          let data = {
            key: item.key,
            nome: item.val().nome,
            cidade: item.val().cidade
          }
          setVendedores(oldArray => [...oldArray, data]) //oldArray = para nao se sobrepor um em cima do outro)
         // console.log(data)
        })
      })

    }
    buscarVendedores()
  }, [])


  useEffect(() => {
    async function dados() {
      await firebase.database().ref('usuarios').set('nome')
    }
    dados()

  }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle={'default'} translucent={false} />
      <Text style={styles.titulo}>USANDO FIREBASE</Text>

      < TextInput style={styles.formulario}
        placeholder='Digite seu nome'
        value={nome}
        onChangeText={setNome}
      />


      < TextInput style={styles.formulario}
        placeholder='Digite sua cidade '
        value={cidade}
        onChangeText={setCidade}
      />
      <TouchableOpacity onPress={Login} style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText}>Enviar</Text>
      </TouchableOpacity>
      {vendedores.map((item) => {
        return (
          <View>
            <Text>Nome:{item.nome}</Text>
            <Text>Cidade:{item.cidade}</Text>
          </View>
        )
      })}


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
  formulario: {
    color: '#FFFFFF',
    marginTop: 20,
    fontSize: 20,
    backgroundColor: '#9cc3b2',
    height: 45,
    width: '97%',
    borderRadius: 5,
    textAlign: 'center'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonEnviar: {
    marginTop: 30,
    backgroundColor: "aqua",
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
});
