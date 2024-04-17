import { Request, Response } from "express";
import { CriarPedidosServices} from '../../Services/Pedidos/CriarPedidoServices'


class CriarPedidoController {
    async handle(req: Request,res: Response) {
        const {  clienteId,   } = req.body

        const criarPedidosServices = new CriarPedidosServices()
        const pedidos = await criarPedidosServices.execute({
             clienteId,
        })
        return  res.json(pedidos)
    }

}
export { CriarPedidoController }