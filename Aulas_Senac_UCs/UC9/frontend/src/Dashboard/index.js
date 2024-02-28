import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiLocal from '../API/apiLocal/api'


export default function Dashboard() {
    const navigation = useNavigate()
    const [pedido, setPedido] = useState([''])

    function handleSair() {
        localStorage.removeItem('@tklogin2023')
        navigation('/')
    }

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect(() => {
        if (!token) {
            navigation('/')
        } else if (token) {
            async function verificaToken() {
                const resposta = await apiLocal.get('/ListarUsuarioToken', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                console.log(resposta)
                if (resposta.data.dados) {
                    navigation('/')
                    return
                } else if (resposta.data.id) {
                    navigation('/Dashboard')
                }
            }
            verificaToken()
        }
    }, [token])

    useEffect(() => {
        async function listarPedidos() {
            const response = await apiLocal.get('/ListarPedidos')
            setPedido(response.data)
        }

        listarPedidos()
    }, [pedido])
   
    return (
        <div>
            <h1>Dashboard</h1>
            {pedido.map((pedido) => {
                return (
                    <article>
                        <h1> Numero Pedido:{pedido.nPedido}</h1>

                        <h1>Status Pedido:{pedido.status}</h1>


                    </article>



                )
            })}


            <Link to='/Produtos'>Cadastrar Produtos</Link>
            <button onClick={handleSair}>Sair</button>
        </div>
    )
}