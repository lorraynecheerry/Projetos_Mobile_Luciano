import { Request, Response } from "express";
import{ ListarPedidosServices} from '../../Services/Pedidos/ListarPedidosServices'


class ListarPedidosController {
    async handle(req: Request, res: Response) {
        const listarPedidosServices = new ListarPedidosServices()
        const resposta = await listarPedidosServices.execute()
        return res.json(resposta)
    }
}
export { ListarPedidosController }