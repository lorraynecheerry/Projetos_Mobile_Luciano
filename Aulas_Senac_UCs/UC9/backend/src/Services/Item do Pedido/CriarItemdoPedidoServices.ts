import prismaClient from "../../prisma";


interface ItensPedido {
    produto: string
    quantidade: string
    valor_Unitario: string
    valor_Total: string
}


class CriarItemdoPedidoServices {
    async execute({
        produto,
        quantidade,
        valor_Unitario,
        valor_Total
    }: ItensPedido) {
        console.log(produto,
            quantidade,
            valor_Unitario,
            valor_Total)
        await prismaClient.itemPedido.create({
            data: {
                produto: produto,
                quantidade: quantidade,
                valor_Unitario: valor_Unitario,
                valor_Total: valor_Total
            },
            select: {
                produto: true,
                quantidade: true,
                valor_Unitario: true,
                valor_Total: true
            }

        })
        return {data: 'Cadastrado com sucesso'}
    }
}
export { CriarItemdoPedidoServices }