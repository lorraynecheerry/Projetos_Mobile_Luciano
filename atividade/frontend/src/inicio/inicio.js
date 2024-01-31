import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import './inicio.css'
import { AuthContext } from '../Context/authContext'

export default function inicio() {
    // const navigation = useNavigate()

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // const { signIn } = useContext(AuthContext)



    // async function handleLogin(e) {
    //     e.preventDefault()
    //     let data = { email, password }

    //     const resposta = await signIn(data)

    //     if (!resposta) {
    //         toast.error('Erro de Login')
    //         return

    //     } else if (resposta.status === 200) {
    //         const token = resposta.data.token
    //         localStorage.setItem('@tklogin2023', JSON.stringify(token)) //stringify= para converter em string
    //        // toast.success('Login Efetuado com Sucesso')
    //         navigation('/Dashboard')

    //     }
    // }

    return (
        <div>
            <div className='loginInicio'>
                <h1>Login</h1>
            </div>
            <div className='formInicio'>
                <form>
                    <label>Email:</label>
                    <input
                        type="text"
                //     value={email}
                //  onChange={(e) => setEmail(e.target.value)}
                     />
                    <label>Senha:</label>
                    <input
                        type="password"
                //    value={password}
                //    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
                <p>Para se cadastrar clique <Link to='/Login'>AQUI</Link></p>
            </div>
        </div>
    )
}