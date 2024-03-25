import { Link } from "react-router-dom"

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>

            <button> <Link to='/Produtos'>Produtos</Link></button>
        </div>
    )
}