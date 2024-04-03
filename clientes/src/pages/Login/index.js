import { useState, useEffect, useContext } from 'react'
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
} from 'react-native'


export default function Login() {
  const navigation = useNavigation()

  const { handleLogar } = useContext(Context)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {

    try {

      // if (!email || !password) {
      //   alert('Existem Campos em Brancos', {

      //     })
      // }

      await handleLogar(email, password)  //enviando pra funçao do contexto o que esta dentro de parentesses
    } catch (error) {

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
        value={email}
        onChangeText={setEmail}
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
