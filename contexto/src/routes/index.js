import { useContext } from "react"
import { Context } from '../contexts/Context'
import AuthRoutes from "./auth.routes"
import NoAuthRoutes from "./NoAuth.routes"

export default function RotasIndex() {

  const { autenticado } = useContext(Context)
  console.log(autenticado)

  return (
    autenticado === true ? <AuthRoutes /> : <NoAuthRoutes />   // se ele tiver autenticado ele vai para AuthRoutes se nao ele vai para noAuthRoutes
  )
}