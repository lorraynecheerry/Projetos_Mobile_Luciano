import apiLocal from '../API/apiLocal/api'
import { useEffect, useState } from 'react';
import './App.scss'
import Modal from "react-modal";


export default function Pedidos() {
    const [pedidos, setPedidos] = useState([''])
    const [clientes, setClientes] = useState([''])
    const [listarPedido, setListarPedido] = useState([''])
    const [modalAberto, setModalAberto] = useState(false)
    const [categorias, setCategorias] = useState([''])
    const [categoriaId, setCategoriaId] = useState([''])
    const [produtosCategoria, setProdutosCategoria] = useState([''])

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect(() => {
        async function listarClientes() {
            const response = await apiLocal.get('/ListarClientes', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setClientes(response.data)
        }
        listarClientes()
    }, [])

    useEffect(() => {
        async function letCategorias() {
            const resposta = await apiLocal.get('/ListarCategorias', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }

            })
            setProdutosCategoria(resposta)
        }
        letCategorias()
    }, [])
    async function abrirModal() {
        try {
            const id_cliente = id_cliente
            const resposta = await apiLocal.post('/CriarPedidos', {
                id_cliente
            }, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setPedidos(resposta.data)
            if (resposta.data.id) {
                setModalAberto(true)
            }

            async function letCategorias() {
                const resposta = await apiLocal.get('/ListarCategorias', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setCategorias(resposta.data)
            }
            letCategorias()
        } catch (err) {

        }
    }

    console.log(categoriaId)

    async function fecharModal() {
        setModalAberto(false)
    }


    // useEffect(() => {
    //     async function loadPedido() {
    //         const resposta = await apiLocal.get('/ListarPedidos')

    //         setPedidos(resposta.data)
    //     }
    //     loadPedido()
    // }, [pedidos])
    // ///console.log(pedidos)


    // useEffect(() => {
    //     async function loadItem() {
    //         const response = await apiLocal.get('/ListarPedidoUnico')
    //         setListarPedido(response.data)
    //     }
    //     loadItem()
    // }, [listarPedido])
    // console.log(listarPedido)


    return (
        <div className="container">
            <h1>Pedidos</h1>
            <td>
                {pedidos.map((item) => {
                    return (<p>
                        <button onClick={abrirModal}>   {item.nPedido} </button>



                        <Modal isOpen={modalAberto}>
                            <h1>DETALHES DO PEDIDO</h1>
                            {listarPedido.map((push) => {
                                return (
                                    <div className="containerPedido">
                                        <h1>Nome do Produto</h1><p>{push.produtos?.nome}</p>
                                        <h1>Preço</h1><p>{push.produtos?.preco}</p>
                                        <h1>quantidade</h1>  <p>{push.produtos?.quantidade}</p>
                                    </div>
                                )
                            })}
                            <button onClick={fecharModal}>fechar modal</button>
                        </Modal>
                    </p>
                    )
                })}
            </td>
        </div>
    )
}