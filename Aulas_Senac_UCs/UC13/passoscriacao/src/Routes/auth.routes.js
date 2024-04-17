import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from '../Dashboard'
const Stack = createNativeStackNavigator()

export default function AuthRotas() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Dashboard'
                component={Dashboard}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )

}

