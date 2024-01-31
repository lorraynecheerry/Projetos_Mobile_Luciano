import {Request,Response} from 'express'


class ListarUsuarioTokenController{
    async handle(req:Request, res:Response) {
        const id = req.user_id
        const listarUsuarioTokenServices = new ListarUsuariosTokenServices()
        const response = await listarUsuarioTokenServices({
            id
        })
        return res.json (response)
    }
}

export { ListarUsuarioTokenController }