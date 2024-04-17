import prismaClient from "../../prisma";


interface ItensPedido {
    produtoId: string
    quantidade: number
    IdPedido : string
}


class CriarItemdoPedidoServices {
    async execute({
        produtoId,
        quantidade,
        IdPedido 
    }: ItensPedido) {

        await prismaClient.item_Pedido.create({
            data: {
                produtoId: produtoId,
                quantidade: quantidade,
                IdPedido :IdPedido 
            },
            select: {
                produtoId: true,
                quantidade: true,
                IdPedido : true
            }

        })
        return { data: 'Cadastrado com sucesso' }
    }
}
export { CriarItemdoPedidoServices }