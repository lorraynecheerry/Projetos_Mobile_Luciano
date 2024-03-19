
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Login/index'

export default function NoAuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
            </Routes>

        </BrowserRouter>
    )
}