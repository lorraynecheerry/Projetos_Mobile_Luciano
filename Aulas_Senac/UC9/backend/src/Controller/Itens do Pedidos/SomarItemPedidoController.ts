import { Response, Request, response } from "express";
import { SomarItemPedidoServices } from '../../Services/Item do Pedido/SomarItemPedidoServices'

class SomarItemPedidoController {
    async handle(res: Response, req: Request) {
        const { id } = req.params

        const somarItemPedido = new SomarItemPedidoServices()
        const resposta = await somarItemPedido.execute({
            id
        })
        return res.json(resposta)
    }
}

export { SomarItemPedidoController }