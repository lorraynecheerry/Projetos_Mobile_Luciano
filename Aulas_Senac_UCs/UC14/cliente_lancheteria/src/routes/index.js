import React, { useContext } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native'

import { AutContexts } from '../Components/Contexts/Contexts'

import NoAuthRotas from './noAuth.routes'
import AuthRotas from './auth.routes'

export default function RotasIndex(){

    const { autenticado, loading } = useContext(AutContexts)

    if (loading === false && autenticado === true){
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#f5f7fb',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size={60} color='1d1d2e' />

            </SafeAreaView>
        )
    }

    return(
        autenticado === true ? <AuthRotas /> : <NoAuthRotas />
    )
}