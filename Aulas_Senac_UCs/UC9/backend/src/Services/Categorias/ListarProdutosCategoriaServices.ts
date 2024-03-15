import { Request, Response } from "express";
import prismaClient from "../../prisma";

interface ListarCategorias {
    id: string
}

class ListarProdutosCategoriaServices {
    async execute({ id }: ListarCategorias) {
        const response = await prismaClient.produto.findMany({
            where: {
                categoriaId: id
            }
        })
        return response
    }
}

export { ListarProdutosCategoriaServices }