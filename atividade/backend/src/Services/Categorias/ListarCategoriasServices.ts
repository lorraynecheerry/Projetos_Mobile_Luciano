import prismaClient from "../../Prisma";

class ListarCategoriasServices {
    async execute() {
        const resposta = await prismaClient.categorias.findMany({})
        return resposta
    }
}

export { ListarCategoriasServices }