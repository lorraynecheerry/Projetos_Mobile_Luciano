import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiLocal from '../API/apiLocal/api'
import './App.scss'


export default function Dashboard() {

    const navigation = useNavigate()
    const [pedidos, setPedidos] = useState([''])
    const [ler, setLer] = useState(false)

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
                // console.log(resposta)
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
        async function loadPedido() {
            const resposta = await apiLocal.get('/ListarPedidos')
            setPedidos(resposta.data)
        }
        loadPedido()
    }, [pedidos])

    async function pedidoMudar() {

    }

    return (
        <div className="conteinerDashboard">
            <h1>Dashboard</h1>

            <h3>Pedidos em Rascunho</h3>
            <table>
                <tr>
                    <th>Numero do Pedido: </th>
                    <th>Nome do Cliente: </th>
                    <th>Status do Pedido: </th>
                </tr>
                <tr>
                    <td>
                        {pedidos.map((item) => {
                            return (
                                <p>
                                    {item.nPedido}
                                </p>
                            )
                        })}
                    </td>


                    <td>
                        {pedidos.map((item) => {
                            return (
                                <p>
                                    {item.clientes?.nome}
                                </p>
                            )
                        })}
                    </td>

                    <td>
                        {pedidos.map((item) => {
                            return (
                                <p>
                                    <Link >{item.status}</Link>
                                </p>
                            )
                        })}
                    </td>
                </tr>
            </table>

            <h3>Pedidos em Efetuado</h3>
            <table>
                <tr>
                    <th>Numero do Pedido: </th>
                    <th>Nome do Cliente: </th>
                    <th>Status do Pedido: </th>
                </tr>

            </table>

            <button> <Link to='/CriarCategorias'>Categorias</Link></button>
            <button> <Link to='/Produtos'>Cadastrar Produtos</Link></button>
            <button> <Link to='/Pedidos'>Pedidos</Link></button>


            <button onClick={handleSair}>Sair</button>
        </div>
    )
}