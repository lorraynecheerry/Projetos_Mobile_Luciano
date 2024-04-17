import { Request, Response } from "express";
 import {DeletarPedidoServices} from '../../Services/Pedidos/DeletarPedidoServices'
 
class DeletarPedidoController {
    async handle(req: Request, res: Response) {
        const { deletar } = req.body
        const deletarPedidoServices = new DeletarPedidoServices()
        const pedido = await deletarPedidoServices.execute({ deletar })
        return res.json(pedido)
    }
}

export { DeletarPedidoController }