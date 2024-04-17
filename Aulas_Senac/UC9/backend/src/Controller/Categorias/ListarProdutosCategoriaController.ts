import { Request, Response } from "express";
import { ListarProdutosCategoriaServices } from '../../Services/Categorias/ListarProdutosCategoriaServices'

class ListarProdutosCategoriaController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const listaProdutosCategoria = new ListarProdutosCategoriaServices()
        const response = await listaProdutosCategoria.execute({
            id
        })
        return res.json(response)
    }
}
export { ListarProdutosCategoriaController }