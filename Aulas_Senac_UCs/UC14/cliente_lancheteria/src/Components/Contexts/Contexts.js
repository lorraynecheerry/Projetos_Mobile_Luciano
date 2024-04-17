import React, { useState, createContext } from 'react'
import apiLocal from '../../pages/services/apiLocal/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AutContexts = createContext()

export function AutProvider({ children }) {

    const [token, setToken] = useState(false)
    const [loading, setLoading] = useState(false)

    const autenticado = !!token

    async function autenticar() {
        const iToken = await AsyncStorage.getItem('tokenM')
        const token = JSON.parse(iToken)
        if (token === null) {
            setToken(false)
            return
        }
        try {
            const resposta = await apiLocal('/ListarClienteToken', {
                headers: {
                    //eslint no-useless-concat: "error"
                    Authorization: `${token}`
                }
            })
            if (resposta.data.id) {            
                setToken(true)
                setLoading(true)
            }
            return resposta
        } catch (err) {
            
        }
    }

    async function handleLogin(email, password) {
        try {
            const resposta = await apiLocal.post('/LoginClientes', {
                email,
                password
            })
            setToken(true)
            setLoading(true)
            return (resposta.data)
        } catch (err) {
            alert('Login Incorreto')
        }
    }

    async function handleSair(){
        await AsyncStorage.clear()
        setToken(false)
        return
    }
    return (
        <AutContexts.Provider
            value={{ autenticado, loading, handleLogin, autenticar, handleSair }}
        >
            {children}
        </AutContexts.Provider>
    )
}



