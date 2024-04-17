import { Request,Response } from "express";
import { CriarItemdoPedidoServices} from '../../Services/Item do Pedido/CriarItemdoPedidoServices'


class CriarItemdoPedidoController{
    async handle (req:Request, res:Response) {
        const {produtoId, quantidade,pedidosId,valor} =req.body
        const criarItemPedidoservices = new CriarItemdoPedidoServices()
        const itens = await criarItemPedidoservices.execute({
            produtoId, quantidade,pedidosId,valor
        })
    
       return res.json(itens)
    }
}
export {CriarItemdoPedidoController}