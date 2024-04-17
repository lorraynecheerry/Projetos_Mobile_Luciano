import { Request, Response } from "express";
import { AlterarItemdoPedidoServices} from '../../Services/Item do Pedido/AlterarItemdoPedidoServices'

class AlterarItemdoPedidoController {
    async handle(req: Request, res: Response) {
        const {id,quantidade} = req.body
        const alterarItemdoPedidoServices = new AlterarItemdoPedidoServices()
        const resposta = await alterarItemdoPedidoServices.execute({id,quantidade})
        return res. json(resposta)

    }
}
export{AlterarItemdoPedidoController} 