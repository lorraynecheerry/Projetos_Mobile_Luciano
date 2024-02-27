import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'


import { LoginController } from './Controller/Login/LoginController'
import { LoginMotoqueirosController } from './Controller/Motoqueiros/LoginMotoqueirosController'
import { CriarusuariosController } from './Controller/Usuarios/CriarUsuariosController'
import { ListarUsuarioTokenController } from './Controller/Usuarios/listarUsuarioTokenController'

import { CriarMotoqueirosController } from './Controller/Motoqueiros/CriarMotoqueirosController'
import { ListarMotoqueirosTokenController } from './Controller/Motoqueiros/ListarMotoqueiroTokenController'

import { CriarProdutosController } from './Controller/Produtos/CriarProdutosController'

import { CriarCategoriasController } from './Controller/Categorias/CriarCategoriasController'
import { ListarCategoriasController } from './Controller/Categorias/ListarCategoriasController'

import { CriarClientesController } from './Controller/Clientes/CriarClientesController'
import { LoginClientesController } from './Controller/Clientes/LoginClientesController'

import { CriarPedidoController } from './Controller/Pedidos/CriarPedidoController'
import { CriarItemdoPedidoController } from './Controller/Itens do Pedidos/CriarItemdoPedidoController'

import { isAutenticado } from './middleware/isAutenticado'
const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))


//Rotas de Logins
router.post('/LoginUsuarios', new LoginController().handle)
router.post('/LoginMotoqueiros', new LoginMotoqueirosController().handle)
router.get('/ListarMotoqueirosToken',  new ListarMotoqueirosTokenController().handle)

//Rotas de Motoqueiros
router.post('/CriarMotoqueiros', new CriarMotoqueirosController().handle)


//Estrutura de Usuários
router.post('/CriarUsuarios', new CriarusuariosController().handle)
router.get('/ListarUsuarioToken',  new ListarUsuarioTokenController().handle)

//Estrutura de Produtos
router.post('/CriarProdutos',  upload.single('file'), new CriarProdutosController().handle)

//Estrutura Clientes
router.post ('/CriarClientes', new CriarClientesController().handle)
router.post ('/LoginClientes',  new LoginClientesController().handle)

//pedidos
router.post ('/CriarPedido',new CriarPedidoController().handle)


 //Criar item do pedido
router.post('/CriarItemdoPedido', new CriarItemdoPedidoController().handle)


//Estrutura de Categorias
router.post('/CriarCategorias',  new CriarCategoriasController().handle)
router.get('/ListarCategorias',  new ListarCategoriasController().handle)


export { router }