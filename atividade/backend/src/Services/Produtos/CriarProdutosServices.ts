import prismaClient from "../../Prisma"

interface CriarProdutos {
    nome: string
    fabricante: string
    quantidade: string
    preco: string
    categoriaId: string
    banner: string
}



class CriarProdutosServices {
    async execute({ nome, fabricante, quantidade, preco, categoriaId,banner  }: CriarProdutos) {

        const produtos = await prismaClient.produtos.create({
            data: {
                nome: nome,
                fabricante: fabricante,
                quantidade: quantidade,
                preco: preco,
                categoriaId: categoriaId,
                banner: banner
                
            }
        })
        return produtos
    }

}

export { CriarProdutosServices }