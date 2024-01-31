import { Request, Response } from "express";
import { CriarUsuariosServices } from "../../Services/Usuarios/CriarUsuariosServices";


class CriarUsuariosController {
    async handle(req: Request, res: Response) {
        const { nome, email, password } = req.body
        const criarUsuariosServices = new CriarUsuariosServices()
        const resposta = await criarUsuariosServices.execute({
            nome,
            email,
            password
        })

        return res.json(resposta)
    }
}

export { CriarUsuariosController }