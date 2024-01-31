import prismaClient from '../../Prisma'

interface TokenId {
    id: string
}

class ListarMotoqueirosTokenServices {
    async execute({ id }: TokenId) {
        const resposta = await prismaClient.motoqueiro.findUnique({
            where:{
                id: id
            },
            select:{
                id: true,
                nome: true
            }
        })
        return resposta

    }
}

export { ListarMotoqueirosTokenServices }