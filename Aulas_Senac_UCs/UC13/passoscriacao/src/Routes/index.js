import React from 'react'

import AuthRotas from './auth.routes'
import NoAuthRotas from './noAuth.routes'

export default function RotasIndex() {
    const autenticado = true
    return (
        autenticado === true ? <AuthRotas /> : <NoAuthRotas />
    )
}