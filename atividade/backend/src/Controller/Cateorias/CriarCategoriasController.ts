import { Request,Response } from "express";
import { CriarCategoriaServices } from "../../Services/Categorias/CriarcategoriasServices";


class CriarCategoriasController{
    async handle(req:Request, res:Response) {
        const {nome} = req.body
        const criarCategoriasServices = new CriarCategoriaServices()
        const resposta = await criarCategoriasServices.execute({
            nome
        })
        return res.json(resposta)
    }
}


export { CriarCategoriasController }