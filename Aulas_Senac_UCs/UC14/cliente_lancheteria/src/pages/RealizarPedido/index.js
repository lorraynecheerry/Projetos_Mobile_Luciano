import React, { useEffect, useState, useContext } from 'react'
import { AutContexts } from '../../Components/Contexts/Contexts'
import { SelectList } from 'react-native-dropdown-select-list'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    ToastAndroid,
    Image,
    Modal,
    Dimensions,
    SafeAreaView,
    FlatList
} from 'react-native'
import { DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import apiLocal from '../services/apiLocal/api'



export default function RealizarPedido({ route }) {

    const [produtos, setProdutos] = useState([''])
    const [categorias, setCategorias] = useState([''])
    const [idCategoria, setIdCategoria] = useState('')
    const [produtosCategorias, setProdutosCategorias] = useState([''])
    const [quantidadeF, setQuantidadeF] = useState(0)

    const [lerItensPedido, setLerItensPedido] = useState(false)
    const [itensPedido, setItensPedido] = useState([''])

    const [valorTotal, setValorTotal] = useState('')

    const [modalAberto, setModalAberto] = useState(false)

    const [idItem, setIdItem] = useState('')

    const navigation = useNavigation()
    const { n_pedido, id } = route.params
    const { autenticar } = useContext(AutContexts)
    autenticar()

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        async function lerProdutos() {
            const iToken = await AsyncStorage.getItem('tokenM')
            const token = JSON.parse(iToken)
            const resposta = await apiLocal.get('/ListarProdutosGeral', {
                headers: {
                    Authorization: `${token}`
                }
            })
            setProdutos(resposta.data)
        }
        lerProdutos()
    }, [])

    useEffect(() => {
        async function lerCategorias() {
            const iToken = await AsyncStorage.getItem('tokenM')
            const token = JSON.parse(iToken)
            const resposta = await apiLocal.get('/ListarCategorias', {
                headers: {
                    Authorization: `${token}`
                }
            })
            let newArray = resposta.data.map((item) => {
                return { key: item.id, value: item.nome }
            })
            setCategorias(newArray)
        }
        lerCategorias()
    }, [itensPedido])


    async function lerItenBanco() {
        const iToken = await AsyncStorage.getItem('tokenM')
        const token = JSON.parse(iToken)
        const resposta = await apiLocal.get(`/ListarItensPedidos/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        })

        resposta.data.map((item) => {
            let dados = {
                id: item.id,
                produto: item.produtos.nome,
                quantidade: item.quantidade,
                valor: Number(item.valor)
            }
            setItensPedido(oldArray => [...oldArray, dados])
            setLerItensPedido(true)
        })
    }

    async function excluirPedido() {
        const iToken = await AsyncStorage.getItem('tokenM')
        const token = JSON.parse(iToken)
        try {
            await apiLocal.delete(`/ExcluirPedido/${id}`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            ToastAndroid.show('Pedido Excluido', ToastAndroid.LONG)
            navigation.navigate('Dashboard')
        } catch (err) {

        }
    }

    function produtosCategoria() {
        const resposta = produtos.filter((item) => item.categoriaId === idCategoria)
        setProdutosCategorias(resposta)
    }


    async function handleAdicionarItem() {
        setQuantidadeF(0)
        setModalAberto(true)
        const prodExt = produtosCategorias.filter((item) => item.id === idItem)
        const valor = Number(prodExt.map((item) => item.preco) * quantidadeF)
        const id_pedido = id
        const id_produto = idItem
        const quantidade = Number(quantidadeF)

        const iToken = await AsyncStorage.getItem('tokenM')
        const token = JSON.parse(iToken)

        try {
            const resposta = await apiLocal.post('/CriarItensPedido', {
                id_pedido,
                id_produto,
                quantidade,
                valor
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })

            let dados = {
                id: resposta.data.id,
                produto: resposta.data.produtos.nome,
                quantidade: resposta.data.quantidade,
                valor: Number(resposta.data.valor)
            }
            setItensPedido(oldArray => [...oldArray, dados])
            setModalAberto(false)
            setLerItensPedido(true)
        } catch (err) {
            alert('Produto Já inserido')
            setModalAberto(false)
        }
    }

    async function handleApagarItem(idApagarItem) {
        const iToken = await AsyncStorage.getItem('tokenM')
        const token = JSON.parse(iToken)
        try {
            await apiLocal.delete(`/ApagarItemPedido/${idApagarItem}`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            setItensPedido(itensPedido.filter((item) => item.id !== idApagarItem))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (itensPedido.length === 1) {
            setLerItensPedido(false)
        }
    }, [itensPedido])


    useEffect(() => {
        try {
            async function somarItensPedido() {
                const iToken = await AsyncStorage.getItem('tokenM')
                const token = JSON.parse(iToken)
                const resposta = await apiLocal.get(`/SomarItensPedido/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                setValorTotal(resposta.data)
            }
            somarItensPedido()
        } catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line
    }, [itensPedido])

    function handleAbrirModal(idProd) {
        setIdItem(idProd)
        setModalAberto(true)
    }

    function handleAumentar() {
        setQuantidadeF(Number(quantidadeF) + 1)

    }

    function handleDiminuir() {
        if (quantidadeF > 0) {
            setQuantidadeF(quantidadeF - 1)
        }
    }

    useEffect(() => {
        try {
            async function somarItensPedido() {
                const iToken = await AsyncStorage.getItem('tokenM')
                const token = JSON.parse(iToken)
                const resposta = await apiLocal.get(`/SomarItensPedido/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                setValorTotal(resposta.data)
            }
            somarItensPedido()
        } catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line
    }, [itensPedido])

    async function handleConfirmarPedido() {
        const iToken = await AsyncStorage.getItem('tokenM')
        const token = JSON.parse(iToken)
        try {
            const draft = false
            const aceito = false
            const valor_total = valorTotal
            //const resposta = await apiLocal.put('/RealizarPedidoBalcao', {
            await apiLocal.put('/RealizarPedidoBalcao', {
                id,
                draft,
                aceito,
                valor_total
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })
            navigation.navigate('Dashboard')

        } catch (err) {

        }
    }

    return (
        <SafeAreaView style={styles.conteiner}>
            <Text style={styles.textoTitulo}>Tela de Realizar Pedido</Text>
            <Text style={styles.textoNumeroPedido}>Numero do Pedido: {n_pedido}</Text>
            {valorTotal !== null && (
                <Text style={styles.textoNumeroPedido}>Valor Pedido: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${valorTotal}`)}</Text>
            )}
            {itensPedido.length === 1 && (
                <TouchableOpacity onPress={lerItenBanco}>
                    <Text>Verificar Itens Existentes</Text>
                </TouchableOpacity>
            )}
            <View>
                <SelectList
                    onSelect={produtosCategoria}
                    label='Categorias'
                    setSelected={setIdCategoria}
                    data={categorias}
                    placeholder='Selecione'
                    searchPlaceholder='Pesquise'
                    boxStyles={{ width: 300, margin: 20, }}
                />

                {idCategoria.length > 0 && (
                    <>
                        {produtosCategorias.map((item) => {
                            return (
                                <View style={styles.renderProdutos}>
                                    <Image style={styles.imagem}
                                        //source={{ uri: `http://10.152.46.11:3333/files/${item.banner}` }} />
                                        // source={{ uri: `http://192.168.172.208:3333/files/${item.banner}` }} />
                                        source={{ uri: `http://10.75.49.190:3333/files/${item.banner}` }} />
                                    <Text style={styles.textoRenderProdutos}>{item.nome}</Text>
                                    <Text style={styles.textoRenderProdutos}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${item.preco}`)}</Text>
                                    <Modal
                                        style={{ width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').height * 0.5 }}
                                        visible={modalAberto}
                                    >


                                        <View style={styles.textoModal}>
                                            <TouchableOpacity onPress={handleDiminuir}><Text style={styles.diminuir}>-</Text></TouchableOpacity>
                                            <Text style={styles.textoQuantidade}>{quantidadeF}</Text>
                                            <TouchableOpacity onPress={handleAumentar}><Text style={styles.aumentar}>+</Text></TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.botaoQuantidade} onPress={handleAdicionarItem}><Text style={styles.incluirItem}>Incluir Quantidade</Text></TouchableOpacity>





                                    </Modal>
                                    <TouchableOpacity onPress={() => handleAbrirModal(item.id)}>
                                        <Image style={styles.imgCar} source={require('../../../assets/car.png')} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </>
                )}
            </View>
            {itensPedido.length > 1 && (
                <>
                    <Text style={styles.textoItensPedido}>Itens do Pedido</Text>

                    <View>
                        {itensPedido.map((item) => {
                            return (
                                <View style={styles.renderProdutos}>
                                    {item.length !== 0 && (
                                        <>
                                            <DataTable style={styles.conteinerDataTable}>
                                                <DataTable.Header style={styles.tableHeader}>

                                                </DataTable.Header>
                                                <DataTable.Row key={item.id}>
                                                    <DataTable.Cell><Text style={styles.tableDados}>{item.produto}</Text></DataTable.Cell>
                                                    <DataTable.Cell><Text style={styles.tableDados}>{item.quantidade}</Text></DataTable.Cell>
                                                    <DataTable.Cell><Text style={styles.tableDados}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${item.valor}`)}</Text></DataTable.Cell>
                                                    <TouchableOpacity onPress={() => handleApagarItem(item.id)}>
                                                        <Image style={styles.imgTrash} source={require('../../../assets/trash.png')} />
                                                    </TouchableOpacity>
                                                </DataTable.Row>
                                            </DataTable>
                                        </>
                                    )}
                                </View>
                            )
                        })}
                    </View>
                </>
            )}
            <View style={styles.botoesAcao}>
                <TouchableOpacity
                    onPress={excluirPedido}
                    style={[styles.botaoExcluirPedido, { opacity: lerItensPedido !== false ? 0.3 : 1 }]}
                    disabled={lerItensPedido !== false}
                >
                    <Text style={styles.textoBotaoExcluirPedido}>Excluir Pedido</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleConfirmarPedido}
                    style={[styles.botaoInicio, { opacity: lerItensPedido === false ? 0.3 : 1 }]}
                    disabled={lerItensPedido === false}
                >
                    <Text style={styles.textoBotaoInicio}>Confirmar Pedido</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
    },
    botoesAcao: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    textoModal: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoQuantidade: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 20
    },
    textoTitulo: {
        margin: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        backgroundColor: '#5358E6',
        borderRadius: 5,
        width: '97%'
    },
    botaoInicio: {
        backgroundColor: '#5358E6',
        width: '50%',
        height: 30,
        borderRadius: 5
    },
    textoBotaoInicio: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    botaoExcluirPedido: {
        marginBottom: 20,
        marginRight: 5,
        marginTop: 20,
        backgroundColor: '#ff0000',
        width: '50%',
        height: 30,
        borderRadius: 5
    },
    textoBotaoExcluirPedido: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    textoNumeroPedido: {
        margin: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        backgroundColor: '#E35546',
        borderRadius: 5,
        width: '97%'
    },
    imagem: {
        height: '200%',
        width: '18%',
        marginRight: 20,
        borderRadius: 10
    },
    renderProdutos: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textoRenderProdutos: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 7
    },
    textoItensPedido: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    imgCar: {
        flex: 1,
        width: '100%',
        marginRight: 30
    },
    imgTrash: {
        flex: 1,
        width: '100%',
        marginRight: 40
    },
    aumentar: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 20
    },
    diminuir: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 20
    },
    incluirItem: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    botaoQuantidade: {
        backgroundColor: '#5358E6',
        borderRadius: 5,
        margin: 22,
        height: 50,
        width: '90%'
    },
    conteinerDataTable: {
        //padding: 5,

    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    tableDados: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})



