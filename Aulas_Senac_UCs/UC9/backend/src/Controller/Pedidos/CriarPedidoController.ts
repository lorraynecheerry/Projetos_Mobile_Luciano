import { Request, Response } from "express";
import { CriarPedidoServices} from '../../Services/Pedidos/CriarPedidoServices'


class CriarPedidoController {
    async handle(req: Request,res: Response) {
        const { nPedido, status, clientesId, usuarioId, motoqueiroId  } = req.body

        const criarPedidosServices = new CriarPedidoServices()
        const pedidos = await criarPedidosServices.execute({
            nPedido, status, clientesId, usuarioId, motoqueiroId
        })
        return  res.json(pedidos)
    }

}
export { CriarPedidoController }