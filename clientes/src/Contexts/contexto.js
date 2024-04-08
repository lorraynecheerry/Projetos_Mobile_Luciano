import { createContext, useState, useffect } from "react";
import api from '../../api'


export const Context = createContext()

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(false)
    const autenticado = !!token

    async function handleLogar(email, password) {
        try {
            await api.post('/LoginClientes', {
                email, password
            })
            // const data = resposta.data
            // AsyncStorage.setItem('@tklogin2024', JSON.stringify(data))
            setToken(true)
        } catch (error) {
           alert(error)
        }

    }
    return (
        <Context.Provider value={{ handleLogar, autenticado }}>
            {children}
        </Context.Provider>
    )

}