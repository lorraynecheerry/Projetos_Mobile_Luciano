import prismaClient from "../../Prisma";

interface CriaUsuarios {
    nome: string
    email: string
    password: string
}

class CriarUsuariosServices {
    async execute({ nome, email, password }: CriaUsuarios) {

        if (!nome || !email || !password) {
            throw new Error('Existem Campos em Branco')
        }

        const emailExiste = await prismaClient.usuario.findFirst({
            where:{
                email: email
            }
        })
        if(emailExiste) {
            throw new Error ('Email ja Cadastrado')
        }
        const resposta = await prismaClient.usuario.create({
            data:{
                nome: nome,
                email: email,
                senha: password
            },
            select:{
                id:true,
                nome: true,
                email:true
            }
        })
        return resposta
    }
}

export { CriarUsuariosServices }