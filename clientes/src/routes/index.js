import { View, Text } from "react-native"

import AuthRots from './Auth.routes'
import NoAuthRots from './noAuth.routes'

export default function RotasIndex() {

    const autenticado = false

    return (
     autenticado === true? <AuthRots/> : <NoAuthRots/>
    )
}