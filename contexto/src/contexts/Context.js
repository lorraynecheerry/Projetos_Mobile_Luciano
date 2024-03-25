import { createContext, useState, useEffect } from 'react'
import api from '../APi/api'
import { toast } from 'react-toastify'

export const Context = createContext()

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(false)
    const autenticado = !!token


    async function vefiricaToken() {
        const iToken = localStorage.getItem('@tklogin2023')
        if (!iToken) {
            setToken(false)
            return
        }
        const { token } = JSON.parse(iToken)

        const resposta = await api('/ListarUsuarioToken', {
            headers: {
                Authorization: 'Bearer ' + `${token}`
            }
        })

        console.log(resposta)
        // if (resposta.data.id) {
        //     setToken(true)
        // } else {
        //     setToken(false)
        // }

    }


    async function handleLogar(email, password) {
        try {
            const resposta = await api.post('/LoginUsuarios', {
                email, password
            })
            // if (resposta.data.id) {
            const data = resposta.data
            localStorage.setItem('@tklogin2023', JSON.stringify(data))
            toast.success('Login Efetuado com Sucesso', {
                toastId: 'toastId'
            })
            //console.log(resposta.data.token)
            // }
            const dado = localStorage.getItem('@tklogin2023')
            const dados = JSON.parse(dado)
            const itens = {
                nome: dados.nome,
                token: dados.token
            }
            console.log(itens)
            setToken(true)

        } catch (err) {
            toast.error('Senha/Usuario incorretos')

        }

    }

    return (
        <Context.Provider value={{ handleLogar, autenticado, vefiricaToken }}>
            {children}
        </Context.Provider>
    )
}