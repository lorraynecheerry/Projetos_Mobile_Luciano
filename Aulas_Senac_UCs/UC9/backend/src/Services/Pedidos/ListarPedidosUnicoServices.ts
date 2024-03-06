// import prismaClient from "../../prisma";

// interface PedidoUnique {
//     id: string
// }

// class ListarPeididosUnicoServices(){
//     async execute({ id }: PedidoUnique) {
//         const resposta = await prismaClient.pedido.findUnique({
//             where: {
//                 id: id
//             },
//             select: {
//                 id: true,
//                 nPedido:true,
//                 status:true
//             }
//         })
//         return resposta
//     }
// }

// export { ListarPeididosUnicoServices }