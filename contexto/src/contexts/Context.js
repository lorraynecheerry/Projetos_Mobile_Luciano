import { createContext, useState, useEffect } from 'react'
import api from '../APi/api'
import { toast } from 'react-toastify'

export const Context = createContext()

// const iToken = localStorage.getItem('@tklogin2023')
// const token = JSON.parse(iToken)

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(false)
    const autenticado = !token

    // // useEffect(() => {
    // const dados = localStorage.getItem('tklogin2023')
    // const dado = JSON.parse(dados)
    // setToken(dado.token)
    // // }, [autenticado])
    // console.log(token)

    useEffect(() => {
        try {

            const resposta = await api.get('/ListarUsuarioToken', {
                headers: {
                    Authorization: `Bearer ` + `${token}`
                }
            })
            
              setToken(resposta.data)
            //console.log(resposta.data)

        } catch (error) {
          
        }

    }, [token])




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


            //const { id, email, nome, token } = resposta.data
            //console.log(resposta.data.id)

        } catch (err) {
            toast.error('Senha/Usuario incorretos')

        }

    }

    return (
        <Context.Provider value={{ handleLogar, autenticado }}>
            {children}
        </Context.Provider>
    )
}