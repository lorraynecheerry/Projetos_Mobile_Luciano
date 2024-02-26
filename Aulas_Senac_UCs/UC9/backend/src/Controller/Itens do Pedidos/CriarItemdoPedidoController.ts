import { Request,Response } from "express";
import { CriarItemdoPedidoServices} from '../../Services/Item do Pedido/CriarItemdoPedidoServices'


class CriarItemdoPedidoController{
    async handle (req:Request, res:Response) {
        const {produto, quantidade, valor_Unitario, valor_Total} =req.body
        const criarItemPedidoservices = new CriarItemdoPedidoServices()
        const itens = await criarItemPedidoservices.execute({
            produto, quantidade, valor_Unitario, valor_Total
        })
        console.log(itens)
       return res.json(itens)
    }
}
export {CriarItemdoPedidoController}