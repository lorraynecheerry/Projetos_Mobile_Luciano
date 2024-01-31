import { Request, Response } from "express";
import { CriarClientesServices } from '../../Services/Clientes/CriarClientesServices'

class CriarClientesController {
    async handle(req: Request, res: Response) {
        const {

            nome,
            cpf_cnpj,
            celular,
            cep,
            rua,
            complemento,
            bairro,
            cidade,
            estado,
            email,
            password
        } = req.body

        const criarClientesServices = new CriarClientesServices()
        const clientes = await criarClientesServices.execute({
            nome,
            cpf_cnpj,
            celular,
            cep,
            rua,
            complemento,
            bairro,
            cidade,
            estado,
            email,
            password
        })
        return res.json(clientes)
    }
}

export { CriarClientesController }