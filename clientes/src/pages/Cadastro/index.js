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
import apiCEP from '../../apiCEP'


import { useNavigation } from '@react-navigation/native'

export default function Cadastro() {

    const navigation = useNavigation()

    const [nome, setNome] = useState('')
    const [cpf_cnpj, setCpf_cnpj] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpassword, setConfPassword] = useState('')

    const [buscaCep, setBuscaCep] = useState('')

    async function handleBuscaCep() {
        if (cep.length > 8 || cep.length < 8) {
            alert('Cep inválido')
        } else {
            const response = await apiCEP.get(`/${cep}/json/`)
            setBuscaCep(response.data)
        }
    }

    useEffect(() => {
        function addBuscaCep() {
            setRua(buscaCep.logradouro || rua)
            setBairro(buscaCep.bairro || bairro)
            setCidade(buscaCep.localidade || cidade)
            setEstado(buscaCep.uf || estado)
        }
        addBuscaCep()
    }, [handleBuscaCep])

    async function handleCadastrar() {
        try {
            const response = await api.post('/CriarClientes', {
                nome,
                telefone,
                cpf_cnpj,
                rua,
                cep,
                complemento,
                bairro,
                cidade,
                estado,
                password,
                email

            })
            console.log(response)

        } catch (error) {
            alert(error)
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
                            onBlur={handleBuscaCep}
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
                            value={complemento}
                            onChangeText={setComplemento}
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

                        <TouchableOpacity onPress={handleCadastrar} style={style.buttonEnviar}>
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
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: '#FF8016',
        height: 45,
        width: 350,
        borderRadius: 8,
    },

    buttonEnviarText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },

    buttonCriar: {
        backgroundColor: '#00A4AD',
        height: 45,
        width: 350,
        borderRadius: 8,
    },
})