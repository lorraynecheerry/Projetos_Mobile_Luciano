import prismaClient from "../../prisma";


interface ItensPedido {
    produtoId: string
    quantidade: number
    pedidosId: string
    valor: number
}


class CriarItemdoPedidoServices {
    async execute({
        produtoId,
        quantidade,
        pedidosId,
        valor
    }: ItensPedido) {

        await prismaClient.itemPedido.create({
            data: {
                produtosId: produtoId,
                quantidade: quantidade,
                pedidosId: pedidosId,
                valor: valor
            },
            select: {
                id: true,
                produtosId: true,
                quantidade: true,
                valor: true,
                pedidosId: true
            }

        })
        return { data: 'Cadastrado com sucesso' }
    }
}
export { CriarItemdoPedidoServices }