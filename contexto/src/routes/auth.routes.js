import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Dashboard from '../Dashboard/index'
import Produtos from '../Produtos'


export default function AuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />  
                <Route path='/Produtos' element={<Produtos />} />
            </Routes>
        </BrowserRouter>
    )
}
