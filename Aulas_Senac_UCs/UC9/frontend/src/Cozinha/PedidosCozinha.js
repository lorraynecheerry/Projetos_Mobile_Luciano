import { useState, useEffect } from "react";
import apiLocal from '../API/apiLocal/api'
import Modal from "react-modal";


export default function PedidosCozinha() {
    const [pedidos, setPedidos] = useState([''])
    const [modalAberto, setModalAberto] = useState(false)



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

    return (
        <div>
            <h1>Pedidos</h1>
            <td>
                {pedidos.map((item) => {
                    return (<p>
                        <button onClick={abrirModal}>   {item.nPedido} </button>

                          

                            <Modal isOpen={modalAberto}>
                                <h1>DETALHES DO PEDIDO</h1>
                            <button onClick={fecharModal}>fechar modal</button>
                            </Modal>
                        </p>
                    )
                })}
            </td>
        </div>
    )
}