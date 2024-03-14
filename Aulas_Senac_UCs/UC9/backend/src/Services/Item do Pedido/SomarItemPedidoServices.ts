import prismaClient from "../../prisma"

interface Somar {
    id: string
}

class SomarItemPedidoServices {
    async execute({ id }: Somar) {
        const resposta = await prismaClient.itemPedido.aggregate({  // aggregate = funçao  para agregar valores
            where: {
                id: id
            },
            _sum: {      //sum = somar
                valor: true
            }
        })
        return (resposta._sum.valor)
    }
}

export { SomarItemPedidoServices }