import { createContext, useState } from "react";
import apiLocal from '../api/apiLocal/api'

export const AuthContext = createContext()

export default function AuthProvider({ childen }) {


    const [user, setUser] = useState('')

    const isAutenticated = !!user

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    async function loginToken() {
        try {
            const resposta = await apiLocal.get('/ListarUsuarioToken', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            console.log(resposta)
        } catch (error) {

        }
    }

    async function signIn({ email, password }) {
        try {
            const resposta = await apiLocal.post('/Login', {
                email, password
            })
            const token = localStorage.setItem('@tklogin2023', JSON.stringify(resposta.data.token))
            return (resposta)
        } catch (error) {

        }
    }






    return (
        <AuthContext.AuthProvider value={{ sign, loginToken }}>

            {childen}
        </AuthContext.AuthProvider>
    )
}