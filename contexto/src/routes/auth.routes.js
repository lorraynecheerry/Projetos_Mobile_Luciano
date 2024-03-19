import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Dashboard from '../Dashboard/index'

export default function AuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}
