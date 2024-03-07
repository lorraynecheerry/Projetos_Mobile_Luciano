import { useState, useEffect } from "react";
import apiLocal from '../API/apiLocal/api'
import './App.scss'
import Modal from "react-modal";


export default function PedidosCozinha() {
    const [pedidos, setPedidos] = useState([''])
    const [modalAberto, setModalAberto] = useState(false)
    const [listarPedido, setListarPedido] = useState([''])



    function abrirModal() {
        setModalAberto(true)
    }

    function fecharModal() {
        setModalAberto(false)
    }


    useEffect(() => {
        async function loadPedido() {
            const resposta = await apiLocal.get('/ListarPedidos')

            setPedidos(resposta.data)
        }
        loadPedido()
    }, [pedidos])
    ///console.log(pedidos)


    useEffect(() => {
        async function loadItem() {
            const response = await apiLocal.get('/ListarPedidoUnico')
            setListarPedido(response.data)
        }
        loadItem()
    }, [listarPedido])
    console.log(listarPedido)

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