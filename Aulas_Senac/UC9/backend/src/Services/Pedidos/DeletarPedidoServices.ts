import prismaClient from "../../prisma";
interface DeletarItemPedido {
    deletar: string
}

class  DeletarPedidoServices {
    async execute({ deletar }: DeletarItemPedido) {
        await prismaClient.pedido.delete({
            where: {
                id: deletar
            }
        })
        return { dados: 'Apagado com sucesso' }
    }
}
export { DeletarPedidoServices}