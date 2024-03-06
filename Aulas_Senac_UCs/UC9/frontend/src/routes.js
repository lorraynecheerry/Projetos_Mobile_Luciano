import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Inicio from './Inicio'
import Dashboard from './Dashboard'
import Produtos from './Produtos'
import CriarCategorias from './Categorias'
import PedidosCozinha from './Cozinha/PedidosCozinha'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/Dashboard' element={<Dashboard />} />
                <Route path='/Produtos' element={<Produtos />} />
                <Route path='/CriarCategorias' element={<CriarCategorias />} />
                <Route path='/PedidosCozinha' element={<PedidosCozinha />} />


            </Routes>
        </BrowserRouter>
    )
}