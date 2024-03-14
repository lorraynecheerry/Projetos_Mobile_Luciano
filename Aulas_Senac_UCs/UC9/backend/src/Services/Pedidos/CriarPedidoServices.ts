import prismaClient from "../../prisma";

interface CriarPedido {
   
    clientesId: string
    

}

class CriarPedidoServices {
    async execute({
        clientesId }: CriarPedido) {

            //console.log(nPedido, status, clientesId, usuarioId, motoqueiroId)
        await prismaClient.pedido.create({
            data: {
                
                clientesId: clientesId,
               
            },
         include:{
            clientes:true
         }
        })
        return { data: 'Cadastrado com sucesso' }
    }
}
export { CriarPedidoServices }