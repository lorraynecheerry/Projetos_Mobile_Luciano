import { Request, Response } from "express";
import { CriarClientesServices } from '../../Services/Clientes/CriarClientesServices'

class CriarClientesController {
    async handle(req: Request, res: Response) {
        const {

            nome,
            cpf_cnpj,
           telefone,
            cep,
            rua,
            nCasa,
            bairro,
            cidade,
            estado,
            email,
          senha
        } = req.body

        const criarClientesServices = new CriarClientesServices()
        const clientes = await criarClientesServices.execute({
            nome,
            cpf_cnpj,
           telefone,
            cep,
            rua,
            nCasa,
            bairro,
            cidade,
            estado,
            email,
          senha
        })
        return res.json(clientes)
    }
}

export { CriarClientesController }