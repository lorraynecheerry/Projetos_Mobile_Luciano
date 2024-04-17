
import { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import api from '../../../api'

import { useNavigation } from '@react-navigation/native'


export default function Cadastro() {
    const navigation = useNavigation()

    const [nome, setNome] = useState('')
    const [cpf_cnpj, setCpf_cnpj] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [nCasa, setNCasa] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpassword, setConfPassword] = useState('')


    async function FazerCadastro() {
        try {
           await api.post('/CriarClientes', {
            nome,
            cpf_cnpj,
            celular,
            cep,
            rua,
            complemento,
            bairro,
            cidade,
            estado,
            email,
            password
            })

            alert('Cadastrado com Sucesso')
            navigation.navigate('Login')
        } catch (error) {
           
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View>
                    <Text style={style.textTitulo}>
                        Cadastre-se
                    </Text>

                    <View style={style.form}>
                        <TextInput
                            placeholder='Digite seu Nome Completo'
                            style={style.input}
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            placeholder='Digite seu Celular'
                            style={style.input}
                            keyboardType="numeric"
                            value={telefone}
                            onChangeText={setTelefone}
                        />

                        <TextInput
                            placeholder='Digite seu cpf_cnpj'
                            style={style.input}
                            keyboardType="numeric"
                            value={cpf_cnpj}
                            onChangeText={setCpf_cnpj}
                        />

                        <TextInput
                            placeholder='Digite Seu CEP'
                            style={style.input}
                            keyboardType="numeric"
                            value={cep}
                            onChangeText={setCep}
                        
                        />

                        <TextInput
                            placeholder='Digite sua Rua'
                            style={style.input}
                            editable={false}
                            value={rua}
                            onChangeText={setRua}
                        />

                        <TextInput
                            placeholder='Digite seu Bairro'
                            style={style.input}
                            editable={false}
                            value={bairro}
                            onChangeText={setBairro}
                        />

                        <TextInput
                            placeholder='Digite sua Cidade'
                            style={style.input}
                            editable={false}
                            value={cidade}
                            onChangeText={setCidade}
                        />

                        <TextInput
                            placeholder='Digite seu Estado'
                            style={style.input}
                            editable={false}
                            value={estado}
                            onChangeText={setEstado}
                        />

                        <TextInput
                            placeholder='Digite seu Complemento'
                            style={style.input}
                            value={nCasa}
                            onChangeText={setNCasa}
                        />

                        <TextInput
                            placeholder='Digite seu Email'
                            style={style.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            placeholder='Digite sua password'
                            style={style.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />

                        <TextInput
                            placeholder='Confirme a password'
                            style={style.input}
                            value={confpassword}
                            onChangeText={setConfPassword}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity onPress={FazerCadastro} style={style.buttonEnviar}>
                            <Text style={style.buttonEnviarText}>Enviar</Text>
                        </TouchableOpacity>

                        <Text style={style.text}>Já tem cadastro ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={style.buttonCriar}>
                            <Text style={style.buttonEnviarText}>Logar</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    textTitulo: {
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 12,
        marginTop: 12
    },

    text: {
        fontSize: 22,
        marginBottom: 12
    },

    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        width: 350,
        height: 40,
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 6,
        paddingLeft: 10
    },
    buttonEnviar: {
        color: '#FFFFFF',
        marginTop: 20,
        fontSize: 20,
        backgroundColor: '#9cc3b2',
        height: 45,
        width: '97%',
        borderRadius: 5,
        textAlign: 'center'
    },

    buttonEnviarText: {
        color: '#FFFFFF',
    marginTop: 20,
    fontSize: 20,
    backgroundColor: '#9cc3b2',
    height: 45,
    width: '97%',
    borderRadius: 5,
    textAlign: 'center'
    },

    buttonCriar: {
        color: '#FFFFFF',
    marginTop: 20,
    fontSize: 20,
    backgroundColor: '#9cc3b2',
    height: 45,
    width: '97%',
    borderRadius: 5,
    textAlign: 'center'
    },
})