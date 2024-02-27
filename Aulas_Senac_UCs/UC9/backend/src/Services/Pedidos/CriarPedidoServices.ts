import prismaClient from "../../prisma";

interface CriarPedido {
    nPedido: string
    status: string
    clientesId: string
    usuarioId: string
    motoqueiroId: string

}

class CriarPedidoServices {
    async execute({
        nPedido, status, clientesId, usuarioId, motoqueiroId }: CriarPedido) {

            //console.log(nPedido, status, clientesId, usuarioId, motoqueiroId)
        await prismaClient.pedido.create({
            data: {
                nPedido: nPedido,
                status: status,
                clientesId: clientesId,
                usuarioId: usuarioId,
                motoqueiroId: motoqueiroId
            },
            select: {
                nPedido: true,
                status: true,
                clientesId: true,
                usuarioId: true,
                motoqueiroId: true
            }
        })
        return { data: 'Cadastrado com sucesso' }
    }
}
export { CriarPedidoServices }