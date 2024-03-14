import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'
interface CriarClientes {
    nome: string
    telefone: string
    cpf_cnpj: string
    rua: string
    nCasa: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    email: string
    senha: string

}
class CriarClientesServices {
    async execute({
        nome,
        telefone,
        cpf_cnpj,
        rua,
        cep,
        nCasa,
        bairro,
        cidade,
        estado,
        senha,
        email


    }: CriarClientes) {


        const usuarioExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (usuarioExiste) {
            throw new Error('Email já Cadastrado')
        }
        const senhaCrypt = await hash(senha, 8)
        await prismaClient.cliente.create({
            data: {
                nome: nome,
                cpf_cnpj: cpf_cnpj,
                telefone: telefone,
                rua: rua,
                nCasa: nCasa,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                cep: cep,
                email: email,
                senha: senhaCrypt


              

            }
        })
        return { data: 'Dados Salvos com sucesso' }


    }
}

export { CriarClientesServices }