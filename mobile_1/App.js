import { useEffect, useState } from 'react';
import apiCEP from './api/apiCep';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,

} from 'react-native';

export default function App() {

  function handleLogin() {
    if (!nome || !senha) {
      alert('campos em brancos')
    }
    alert('enviado com sucesso')
    //alert(`${senha} `)
  }

  async function handleCep() {
    if (cep.length > 8 || cep.length < 8) {
      alert('Cep Invalido')
    }
    const response = await apiCEP.get(`/${cep}/json`)
    setBuscaCep(response.data)
  }

  useEffect(() => {
    function addbuscaCep() {
      setRua(buscaCep.logradouro || rua)
      setBairro(buscaCep.bairro || bairro)
      setCidade(buscaCep.localidade || cidade)
    }
    addbuscaCep()
  }, [handleCep])


  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [buscaCep, setBuscaCep] = useState('')
  return (

    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />

        <Text style={styles.letra}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu Senha"
          secureTextEntry={true}
          onChangeText={setSenha}
        />

        <Text>CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu Senha"
          value={cep}
          onBlur={handleCep}
          onChangeText={setCep}
        />

        <Text>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua cidade"
          value={cidade}
          onChangeText={setCidade}

        />

        <Text>Rua</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu Endereço"
          value={rua}

          onChangeText={setRua}
        />

        <Text>Bairro</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu Senha"
          value={bairro}
          onChangeText={setBairro}
        />
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.botao}>Enviar</Text>

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: '#90dfdc',
    backgroundColor: '#c4ffff',
    borderRadius: 10
  },
  botao: {
  
    height: 40,
    padding: 10,
    backgroundColor: "#5cbfb9",
    borderColor: '#90dfdc',
    color:'black',
    fontSize:18
    
  },

});
