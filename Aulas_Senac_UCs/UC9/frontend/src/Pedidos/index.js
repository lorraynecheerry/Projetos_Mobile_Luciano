import { useEffect, useState } from "react";
import apilocal from "../API/apiLocal/api"
import Modal from "react-modal";

export default function Pedidos() {

    const [clientes, setClientes] = useState([''])
    const [idCliente, setIdCliente] = useState('')
    const [pedidos, setPedidos] = useState('')
    const [categorias, setCategorias] = useState([''])
    const [categoriaId, setCategoriaId] = useState('')
    const [produtosCategoria, setProdutosCategoria] = useState([''])
    const [itensPedido, setItensPedido] = useState([''])

    const [modalAberto, setModalAberto] = useState(false)

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)


    useEffect(() => {
        async function listarClientes() {
            const resposta = await apilocal.get('/ListarClientes', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setClientes(resposta.data)
        }
        listarClientes()
    }, [clientes])

    useEffect(() => {
        try {
            if (categoriaId) {
                return
            }
            async function lerProdutosCategoria() {
                const resposta = await apilocal.get(`/ListarProdutosCategoria/${categoriaId}`, {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setProdutosCategoria(resposta.data)
            }
            lerProdutosCategoria()
        } catch (err) {

        }
    }, [categoriaId])


    async function abrirModal() {
        try {
           
            const clientesId = idCliente
            const resposta = await apilocal.post('/CriarPedido', {
                clientesId
            }, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setPedidos(resposta.data)
            if (resposta.data.id) {
                setModalAberto(true)
            }

            async function lerCategorias() {
                const resposta = await apilocal.get('/ListarCategorias', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setCategorias(resposta.data)
            }
            lerCategorias()

        } catch (error) {
            console.log(error)

        }
    }


    function fecharModal() {
        setModalAberto(false)
    }

    return (

        <div>
            <h1>Pedidos</h1>
            <select
                value={idCliente}

                onChange={(e) => setIdCliente(e.target.value)}
            >
                <option> Selecione o Cliente...</option>
                {clientes.map((item) => {
                    return (
                        <option value={item.id}>{item.nome}</option>
                    )
                })}

            </select>
            <button onClick={abrirModal} >Criar Pedidos</button>

            {pedidos.length !== 1 && (
                <Modal isOpen={modalAberto}>
                    <div>

                        <h1>Realizar Pedido</h1>
                        <>
                            <h2>Cliente:{pedidos.clientes?.nome}</h2>
                            <h2>Numero do Pedido: {pedidos.nPedido}</h2>
                            <h1>Itens do Pedido</h1>
                            <select
                                value={categoriaId}
                                onChange={(e) => setCategoriaId(e.target.value)}
                            >

                                <option>Selecione a categoria</option>
                                {categorias.map((item) => {
                                    return (
                                        <option value={item.id}>{item.nome}</option>
                                    )
                                })}
                            </select>

                            <select>
                                <option>Selecione a Produto</option>

                            </select>
                        </>
                        <button onClick={fecharModal}>Finalizar Pedido</button>
                    </div>
                </Modal>
            )}
        </div>
    )

}