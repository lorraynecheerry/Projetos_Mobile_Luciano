import prismaClient from "../../prisma";

class ListarPedidosServices {
    async execute() {
        const resposta = await prismaClient.pedido.findMany({
            include:{
                clientes:true
            }
        })
        return (resposta)
    }
}

export { ListarPedidosServices }