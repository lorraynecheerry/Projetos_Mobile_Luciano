import { Request, Response } from "express";
import { ListarCategoriasServices } from "../../Services/Categorias/ListarCategoriasServices";

class ListarCategoriasController {
    async handle(req: Request, res: Response) {
        const listaCategoriasServices = new ListarCategoriasServices()
        const response = await listaCategoriasServices.execute()
        return res.json(response)

    }
}

export { ListarCategoriasController }