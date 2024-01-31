import prismaClient from "../../Prisma";

interface Categorias{
    nome: string
}

class CriarCategoriaServices{
    async execute ({nome} : Categorias) {
        const resposta = await prismaClient.categorias.create({
            data:{
                nome: nome
            }
        })
        return resposta
    }
    
}

export { CriarCategoriaServices}