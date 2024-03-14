import prismaClient from "../../prisma";

interface PedidoUnico {
    id: string
}

class ListarPedidosUnicoServices {
    async execute({ id }: PedidoUnico) {
        const resposta = await prismaClient.item_Pedido.findMany({
            where: {
                IdPedido :id 
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