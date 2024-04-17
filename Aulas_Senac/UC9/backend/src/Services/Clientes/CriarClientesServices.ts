import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'
interface CriarClientes {
    nome: string
    celular: string
    cpf_cnpj: string
    rua: string
    complemento: string
    bairro:string
    cidade: string
    estado: string
    cep: string
    email: string
    password: string

}
class CriarClientesServices {
    async execute({
        nome,
        celular,
        cpf_cnpj,
        rua,
        cep,
        complemento,
        bairro,
        cidade,
        estado,
        password, 
        email
        

    }: CriarClientes) {
     

        const usuarioExiste = await prismaClient.clients.findFirst({
            where: {
             email: email
            }
        })
        if(usuarioExiste){
            throw new Error('Email já Cadastrado')
        }
        const senhaCrypt = await hash(password, 8)
        await prismaClient.clients.create({
            data:{
                nome:nome,
                cpf_cnpj:cpf_cnpj,
                celular:celular,
                rua:rua,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                cep: cep,
                email: email,
                password:  senhaCrypt

            }
        })
      return{data:'Dados Salvos com sucesso'}
        

    }
}

export { CriarClientesServices }