import { createContext, useState } from 'react'
import APi from '../APi/api'


export const Context = createContext()

export default function AuthProvider({ children }) {

    // const autenticado = false

    async function handleLogar(email, password) {
        console.log(email, password)

    }

    return (
        <Context.Provider value={{ handleLogar }}>
            {children}
        </Context.Provider>
    )
}