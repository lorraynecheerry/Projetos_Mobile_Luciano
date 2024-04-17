import prismaClient from "../../prisma";
interface DeletarItemPedido {
    deletar: string
}

class DeletarItemdoPedidoServices {
    async execute({ deletar }: DeletarItemPedido) {
        await prismaClient.item_Pedido.delete({
            where: {
                id: deletar
            }
        })
        return { dados: 'Apagado com sucesso' }
    }
}
export { DeletarItemdoPedidoServices }