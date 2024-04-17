import React, { useState, useContext, useEffect } from 'react'
import { AutContexts } from '../../Components/Contexts/Contexts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native'

export default function Inicio() {
    const { handleLogin, autenticar, autenticado } = useContext(AutContexts)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (autenticado === false) {
        autenticar()
    }

    async function handleLogar() {
        if (!email || !password) {
            return
        }
        const resposta = await handleLogin(email, password)
        await AsyncStorage.setItem('nome', JSON.stringify(resposta.nome))
        await AsyncStorage.setItem('id', JSON.stringify(resposta.id))
        await AsyncStorage.setItem('tokenM', JSON.stringify(resposta.token))
        autenticar()
    }    

    return (
        <SafeAreaView style={styles.conteinerInicio}>
            <View>
                <Text style={styles.textoTitulo}>Tela de Login</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Digite Seu Email'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Digite Sua Senha'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={handleLogar}
                    style={styles.buttonInicio}>
                    <Text style={styles.textButtonInicio}>Acessar</Text>
                </TouchableOpacity>
                <Text style={styles.textoCadastrar}>Para se cadastrar clique aqui</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteinerInicio: {
        flex: 1,
        alignItems: 'center'
    },
    textoTitulo: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#28E8EA'

    },
    buttonInicio: {
        marginTop: 30,
        backgroundColor: "#5358E6",
        height: 40,
        borderRadius: 10
    },
    textButtonInicio: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',

    },
    textInput: {
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        height: 45,
        textAlign: 'center',
        fontSize: 25
    },
    textoCadastrar: {
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})