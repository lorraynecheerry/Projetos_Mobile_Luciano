import prismaClient from '../../prisma'
 
 
class ListarClientesServices {
    async execute() {
        const response = await prismaClient.clients.findMany({
            orderBy: {
                nome: 'asc'
            }
        })
        return (response)
    }
}
 
export { ListarClientesServices }