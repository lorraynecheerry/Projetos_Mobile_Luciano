import { Request, Response } from 'express'
import { ListarPedidosUnicoServices } from '../../Services/Pedidos/ListarPedidosUnicoServices'

class ListarPedidosUnicoController {
    async handle(req: Request, res: Response) {
        const { id } = req.body
        const listarPedidosUnicoServices = new ListarPedidosUnicoServices()
        const response = await listarPedidosUnicoServices.execute({
            id
        })

        return res.json(response)
    }
}

export { ListarPedidosUnicoController }