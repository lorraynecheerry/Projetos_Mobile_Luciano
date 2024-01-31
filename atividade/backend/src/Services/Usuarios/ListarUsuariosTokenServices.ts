import prismaClient from "../../Prisma";

interface TokenID {
    id: string
}


class ListarUsuarioTokenServices {
    async execute({ id }: TokenID) {
      const response = await prismaClient.usuario.findUnique({
        where:{
            id: id
        },
        select:{
            id: true,
            nome: true,
            email:true
        }
      })
      return(response)
    }
}

export { ListarUsuarioTokenServices }