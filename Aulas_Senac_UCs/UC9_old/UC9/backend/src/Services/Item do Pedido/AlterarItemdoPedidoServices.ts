import prismaClient from "../../prisma";

interface AlteraItemPedido {
    id: string
    quantidade: string
}

class AlterarItemdoPedidoServices {
    async execute({ id, quantidade }: AlteraItemPedido) {
        await prismaClient.item_Pedido.update({
            where: {
                id: id
            },
            data: {
                quantidade: quantidade
            }
        })
        return{dados : 'Dados Alterados com Sucesso'}
    }
}
export{ AlterarItemdoPedidoServices}