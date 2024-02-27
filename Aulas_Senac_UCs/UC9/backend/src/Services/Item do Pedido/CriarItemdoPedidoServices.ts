import prismaClient from "../../prisma";


interface ItensPedido {
    produtoId: string
    quantidade: string
    pedidosId: string
}


class CriarItemdoPedidoServices {
    async execute({
        produtoId,
        quantidade,
       pedidosId
    }: ItensPedido) {

        await prismaClient.itemPedido.create({
            data: {
                produtosId: produtoId,
                quantidade: quantidade,
                pedidosId: pedidosId
            },
            select: {
                produtosId: true,
                quantidade: true,
              
                pedidosId: true
            }

        })
        return { data: 'Cadastrado com sucesso' }
    }
}
export { CriarItemdoPedidoServices }