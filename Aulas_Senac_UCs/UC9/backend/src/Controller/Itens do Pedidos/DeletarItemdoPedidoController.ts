import { Request, Response } from "express";
import { DeletarItemdoPedidoServices } from '../../Services/Item do Pedido/DeletarItemdoPedidoServices'

class DeletarItemdoPedidoController {
    async handle(req: Request, res: Response) {
        const { deletar } = req.body
        const deletarItemdoPedidoServices = new DeletarItemdoPedidoServices()
        const itemPedido = await deletarItemdoPedidoServices.execute({ deletar })
        return res.json(itemPedido)
    }
}

export { DeletarItemdoPedidoController }