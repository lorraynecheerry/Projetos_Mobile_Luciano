import { useState, useContext } from "react"
import { Context } from "../contexts/Context"
import { toast } from 'react-toastify'


export default function Login() {
    const { handleLogar } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    async function handleLogin(e) {
        try {
            e.preventDefault()
            if (!email || !password) {
                toast.warn('Existem Campos em Brancos', {
                    toastId: 'toastId'
                })
            }

            await handleLogar(email, password)  //enviando pra funçao do contexto o que esta dentro de parentesses
        } catch (error) {
           
        }
    }


    return (
        <div>
            <h1>login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder=" Digite seu emailemail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type='password'
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onSubmit={handleLogin}>enviar</button>
            </form>
        </div>
    )
}