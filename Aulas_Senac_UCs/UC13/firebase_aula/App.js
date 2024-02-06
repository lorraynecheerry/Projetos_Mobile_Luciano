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

//identificador do vendedor
  const vendedor = 14

  async function Login() {
    if (!nome || !cidade) {
      alert('campos vazios')
    }
      let usuarios = await firebase.database().ref('vendedores').child(vendedor)
      let chave = usuarios.push().key //cria uma chave unica firebase
      
      usuarios.child(chave).set({
        nome: nome,
        cidade: cidade
      })
    Keyboard.dismiss()
  }


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
      <TouchableOpacity onPress={Login}style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText}>Enviar</Text>

      </TouchableOpacity>

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
