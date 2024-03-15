import prismaClient from "../../prisma";

interface CriarPedido {
    clientesId: string
}

class CriarPedidoServices {
    async execute({ clientesId }: CriarPedido) {

        //console.log(clientesId )
        const resposta = await prismaClient.pedido.create({
            data: {
                clientesId: clientesId,
            },
            include: {
                clientes: true
            }
        })
        return (resposta)
        // return { data: 'Cadastrado com sucesso' }
    }
}
export { CriarPedidoServices }