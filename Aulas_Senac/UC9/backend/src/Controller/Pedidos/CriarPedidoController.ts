import { Request, Response } from "express";
import { CriarPedidoServices } from '../../Services/Pedidos/CriarPedidoServices'


class CriarPedidoController {
  async handle(req: Request, res: Response) {
    const { clientesId } = req.body

    //console.log(clientesId)
    const criarPedidosServices = new CriarPedidoServices()
    const pedidos = await criarPedidosServices.execute({
      clientesId,
    })
    return res.json(pedidos)
    // console.log(pedidos)
  }

}
export { CriarPedidoController }