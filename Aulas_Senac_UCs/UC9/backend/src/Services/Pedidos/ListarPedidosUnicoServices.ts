import prismaClient from "../../prisma";

interface PedidoUnico {
    id: string
}

class ListarPedidosUnicoServices {
    async execute({ id }: PedidoUnico) {
        const resposta = await prismaClient.itemPedido.findMany({
            where: {
                pedidosId:id 
            },
            include: {
                produtos: true,
                pedido: true
            }
        })
        return (resposta)
    }
}

export { ListarPedidosUnicoServices }