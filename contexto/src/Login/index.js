import { useState, useContext,  useEffect } from "react"
import { Context } from "../contexts/Context"
import { toast } from 'react-toastify'
import './login.estilo.scss'


export default function Login() {
    const { handleLogar, vefiricaToken } = useContext(Context)

    useEffect(() => {
        vefiricaToken()
    }, [])

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
        <div className="conteinerLogin">
            <div className=" cabecalhoLogin">
                <h1>login</h1>
            </div>

            <div className="FormLogin">
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type='text'
                        placeholder=" Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Senha</label>
                    <input
                        type='password'
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onSubmit={handleLogin}>enviar</button>

                    
                </form>
            </div>
        </div>
    )
}