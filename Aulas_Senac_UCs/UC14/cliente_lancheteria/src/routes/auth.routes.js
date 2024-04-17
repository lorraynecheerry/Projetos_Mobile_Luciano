import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Dashboard from '../pages/Dashboard'
import RealizarPedido from '../pages/RealizarPedido'

const Stack = createNativeStackNavigator()


export default function AuthRotas() {
    return (
        <Stack.Navigator
        
        
        >
            
            <Stack.Screen
            
                name='Dashboard'
                component={Dashboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='RealizarPedido'
                component={RealizarPedido}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    )
}