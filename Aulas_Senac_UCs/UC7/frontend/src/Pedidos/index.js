import { useEffect, useState, useContext } from 'react'
import { AuthContexts } from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import apiLocal from '../API/apiLocal/api'
import './estilo.pedidos.scss'

export default function Pedidos() {

    const navigation = useNavigate()

    const { verificaToken, token } = useContext(AuthContexts)
    verificaToken()

    const [clientes, setClientes] = useState([''])
    const [idCliente, setIdCliente] = useState('')
    const [pedidos, setPedidos] = useState([''])
    const [categorias, setCategorias] = useState([''])
    const [produtosCategoria, setProdutosCategoria] = useState([''])

    const [categoriaId, setCategoriaId] = useState('')
    const [idItemProduto, setIdItemProduto] = useState('')
    const [quantidadeF, setQuantidadeF] = useState('')
    const [itensPedido, setItensPedido] = useState([''])
    const [valorTotal, setValorTotal] = useState('')

    const [modalAberto, setModalAberto] = useState(false)

    useEffect(() => {
        try {
            async function listarClientes() {
                const resposta = await apiLocal.get('/ListarClientes', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setClientes(resposta.data)
            }
            listarClientes()
        } catch (err) {

        }
    }, [])

    useEffect(() => {
        try {
            if (!categoriaId) {
                return
            }
            async function lerProdutosCategoria() {
                const resposta = await apiLocal.get(`/ListarProdutosCategoria/${categoriaId}`, {
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
            setItensPedido([''])
            const id_cliente = idCliente
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

            async function lerCategorias() {
                const resposta = await apiLocal.get('/ListarCategorias', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setCategorias(resposta.data)
            }
            lerCategorias()
        } catch (err) {

        }
    }

    async function fecharModal() {
        try {
            const id = pedidos.id
            const draft = false
            const aceito = true
            const resposta = await apiLocal.put('/FinalizarPedidoBalcao', {
                id,
                draft,
                aceito
            }, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            toast.success(resposta.data.dados, {
                toastId: 'toastId'
            })
            setModalAberto(false)
            navigation('/')
        } catch (err) {
            console.log(err)

        }
    }

    async function handleItemPedido(e) {
        try {
            e.preventDefault()
            const prodExt = produtosCategoria.filter((item) => item.id === idItemProduto)
            const valor = Number(prodExt.map((item) => item.preco) * quantidadeF)
            const id_pedido = pedidos.id
            const id_produto = idItemProduto
            const quantidade = Number(quantidadeF)

            const resposta = await apiLocal.post('/CriarItensPedido', {
                id_pedido,
                id_produto,
                quantidade,
                valor
            }, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            let dados = {
                id: resposta.data.id,
                produto: resposta.data.produtos.nome,
                quantidade: resposta.data.quantidade,
                valor: Number(resposta.data.valor)
            }
            setItensPedido(oldArray => [...oldArray, dados])
        } catch (err) {
            toast.error(err.response.data.error)
        }
    }

    async function handleApagarItem(id) {
        try {
            await apiLocal.delete(`/ApagarItemPedido/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setItensPedido(itensPedido.filter((item) => item.id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        try {
            async function somarItensPedido() {
                const id = pedidos.id
                const resposta = await apiLocal.get(`/SomarItensPedido/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setValorTotal(resposta.data)
            }
            somarItensPedido()
        } catch (err) {
            console.log(err)
        }
    }, [itensPedido])

    return (
        <div>
            <h1>Pedidos</h1>
            <select
                value={idCliente}
                onChange={(e) => setIdCliente(e.target.value)}
            >
                <option>Selecine o Cliente...</option>
                {clientes.map((item) => {
                    return (
                        <option value={item.id}>{item.nome}</option>
                    )
                })}
            </select>
            <button onClick={abrirModal}>Criar Pedidos</button>

            {pedidos.length !== 1 && (
                <Modal
                    isOpen={modalAberto}
                >
                    <h1>Ralizar Pedidos</h1>
                    <>
                        <h2>Cliente: {pedidos.clientes.nome}</h2>
                        <h2>Numero do Pedido: {pedidos.n_pedido}</h2>
                        <h1>Itens do Pedido</h1>
                        <form onSubmit={handleItemPedido}>
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
                            <select
                                value={idItemProduto}
                                onChange={(e) => setIdItemProduto(e.target.value)}
                            >
                                <option>Selecione a Produto</option>
                                {produtosCategoria.map((item) => {
                                    return (
                                        <option value={item.id}>{item.nome}</option>
                                    )
                                })}
                            </select>
                            <input
                                type='number'
                                placeholder='Quantidade'
                                value={quantidadeF}
                                onChange={(e) => setQuantidadeF(e.target.value)}
                            />
                            <button type='submit'>Adicionar Produto</button>
                        </form>
                        {itensPedido.map((item) => {
                            return (
                                <>
                                    {item.length !== 0 && (
                                        <>
                                            <div className='buttonApagar'>
                                                <h2>{item.produto} - {item.quantidade} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${item.valor}`)}</h2>
                                                <button onClick={() => handleApagarItem(item.id)}>Apagar</button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )
                        })}
                        {valorTotal !== null && (
                            <h1>Valor Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${valorTotal}`)} </h1>
                        )}
                    </>
                    <button onClick={fecharModal}>Finalizar Pedidos</button>
                </Modal>
            )}

        </div>
    )
}