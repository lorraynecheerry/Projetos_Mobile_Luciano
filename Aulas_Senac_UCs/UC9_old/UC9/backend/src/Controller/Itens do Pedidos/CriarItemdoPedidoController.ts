import { Request,Response } from "express";
import { CriarItemdoPedidoServices} from '../../Services/Item do Pedido/CriarItemdoPedidoServices'


class CriarItemdoPedidoController{
    async handle (req:Request, res:Response) {
        const {produtoId, quantidade,IdPedido } =req.body
        const criarItemPedidoservices = new CriarItemdoPedidoServices()
        const itens = await criarItemPedidoservices.execute({
            produtoId, quantidade,IdPedido 
        })
    
       return res.json(itens)
    }
}
export {CriarItemdoPedidoController}