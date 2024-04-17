import { useContext, useEffect, useState } from 'react'
import { AutContexts } from '../../Components/Contexts/Contexts'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    LogBox,
    ToastAndroid
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { DataTable } from 'react-native-paper'
import apiLocal from '../services/apiLocal/api'


export default function Dashboard() {
   // LogBox.ignoreAllLogs()

    const [nome, setNome] = useState('')
    const [pedidos, setPedidos] = useState([''])
    const { autenticar, handleSair } = useContext(AutContexts)
    const navigation = useNavigation()
    autenticar()

    useEffect(() => {
        async function pegarNome() {
            const iNome = await AsyncStorage.getItem('nome')
            const pNome = JSON.parse(iNome)
            setNome(pNome)
        }
        pegarNome()
    }, [])

    useEffect(() => {
        async function listarPedidosCliente() {
            const iId = await AsyncStorage.getItem('id')
            const id = JSON.parse(iId)
            const iToken = await AsyncStorage.getItem('tokenM')
            const token = JSON.parse(iToken)
            const resposta = await apiLocal.get(`/ListarPedidosCliente/${id}`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            setPedidos(resposta.data)
        }
        listarPedidosCliente()
    }, [pedidos])

    async function handleSaindo() {
        await handleSair()
        autenticar()
    }

    async function handleRealizarPedido() {
        const idCliente = await AsyncStorage.getItem('id')
        const id_cliente = JSON.parse(idCliente)
        const iToken = await AsyncStorage.getItem('tokenM')
        const token = JSON.parse(iToken)
        try {
            const resposta = await apiLocal.post('/CriarPedidos', {
                id_cliente
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })
            navigation.navigate('RealizarPedido', {
                n_pedido: resposta.data.n_pedido,
                id: resposta.data.id
            })
            ToastAndroid.show('Pedido Criado', ToastAndroid.LONG)
        } catch (err) {

        }
    }

    useEffect(() => {
        const incompleto = pedidos.filter((item) => item.draft === true)
        const incompletoMap = String(incompleto.map((itemList) => itemList.draft))
        const n_pedido = Number(incompleto.map((itemList) => itemList.n_pedido))
        const id = String(incompleto.map((itemList) => itemList.id))
        if(incompletoMap){
            function irPedidos(){
                navigation.navigate('RealizarPedido', {
                    n_pedido: n_pedido,
                    id: id
                })
            }
            irPedidos()
        }
    }, [pedidos])



    return (
        <SafeAreaView style={styles.conteiner}>
            <View>
                <View style={styles.conteinerTitulo}>
                    <Text style={styles.textTitulo}>Dashboard</Text>
                </View>
                <View style={styles.conteinerCliente}>
                    <Text style={styles.textCliente}>Seja Bem Vindo(a): {nome}</Text>
                    <TouchableOpacity style={styles.botaoSair} onPress={handleSaindo}><Text style={styles.textoBotaoSair}>Sair</Text></TouchableOpacity>
                </View>
                <View style={styles.conteinerBotaoPedidos}>
                    <TouchableOpacity style={styles.botaoPedidos} onPress={handleRealizarPedido}><Text style={styles.textBotaoPedidos}>Realizar Pedido</Text></TouchableOpacity>
                </View>
                <DataTable style={styles.conteinerDataTable}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title><Text style={styles.tableDados}>Pedidos</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableDados}>Valor</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableDados}>Entrega</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableDados}>Status</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableDados}>Entregador</Text></DataTable.Title>
                    </DataTable.Header>
                    {pedidos.map((item) => {
                        return (
                            <DataTable.Row key={item.n_pedido}>
                                <DataTable.Cell><Text style={styles.tableDados}>{item.n_pedido}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={styles.tableDados}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${item.valor_total}`)}</Text></DataTable.Cell>
                                {item.entrega === false ?
                                    <DataTable.Cell><Text style={styles.tableDados}>Não</Text></DataTable.Cell>
                                    :
                                    <DataTable.Cell><Text style={styles.tableDados}>SIM</Text></DataTable.Cell>
                                }
                                <DataTable.Cell><Text style={styles.tableDados}>{item.status}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={styles.tableDados}>{item.entregador}</Text></DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}

                </DataTable>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    conteinerTitulo: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textTitulo: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold'
    },
    conteinerCliente: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textCliente: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'

    },
    botaoSair: {
        backgroundColor: '#e74c3c',
        marginRight: 10,
        height: 35,
        width: '20%',
        borderRadius: 10
    },
    textoBotaoSair: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    conteinerDataTable: {
        // flex: 1,
        padding: 5,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    tableDados: {
        fontSize: 12,
        textAlign: 'left',
        fontWeight: 'bold'

    },
    conteinerBotaoPedidos: {
        alignItems: 'center'
    },
    textBotaoPedidos: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold',
        padding: 5
    },
    botaoPedidos: {
        backgroundColor: '#5358E6',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5
    }
})