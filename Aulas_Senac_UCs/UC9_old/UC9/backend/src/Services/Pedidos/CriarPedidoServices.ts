import prismaClient from '../../prisma'

interface CriarPedidos {
    clienteId: string
}

class CriarPedidosServices {
    async execute({ clienteId }: CriarPedidos) {

        const resposta = await prismaClient.pedido.create({
            data: {
                clienteId: clienteId,
            },
            include: {
                cliente: true
            }
        })
        return (resposta)
        // console.log(resposta)
        return { dados: 'Produto Cadastrado com Sucesso' }
    }
}


export { CriarPedidosServices }