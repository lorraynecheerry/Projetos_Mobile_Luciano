import { View, Text } from "react-native"
import { useContext } from 'react'
import { Context } from '../Contexts/contexto'
import AuthRots from './Auth.routes'
import NoAuthRots from './noAuth.routes'

export default function RotasIndex() {

    //const autenticado = false
    const { autenticado } = useContext(Context)

    return (
     autenticado === true ? <AuthRots/> : <NoAuthRots/>
    )
}