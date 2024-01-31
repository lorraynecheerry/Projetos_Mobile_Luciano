import { Router } from 'express'
import { CriarUsuariosController } from './src/Controller/Usuarios/CriarUsuariosController'
import { LoginController } from './src/Controller/Login/LoginController'
import { Autenticado } from './src/middleware/authToken'
import { CriarCategoriasController} from './src/Controller/Cateorias/CriarCategoriasController'
import { ListarCategoriasController } from './src/Controller/Cateorias/ListarCategoriasController'
import { CriarProdutosController } from './src/Controller/Produtos/CriarProdutosController'

import { CriarMotoqueirosController } from './src/Controller/motoqueiros/CriarMotoqueirosController'
import { LoginMotoqueirosController } from './src/Controller/motoqueiros/loginMotoqueirosController'

const router = Router()

router.post('/CriarUsuarios', new CriarUsuariosController().handle)

router.post('/Login', new LoginController().hanle)

router.post('/CriarCategorias',Autenticado, new CriarCategoriasController().handle)

router.get('/ListarCategorias',Autenticado, new ListarCategoriasController().handle)

router.post('/CriarProdutos',Autenticado, new CriarProdutosController().handle)


// router.post('/CriarMotoqueiros', new CriarMotoqueirosController().handle)
// router.post('/LoginMotoqueiros', new LoginMotoqueirosController().handle)



export { router }