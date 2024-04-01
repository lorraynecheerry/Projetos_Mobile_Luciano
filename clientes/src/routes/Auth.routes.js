import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from "../pages/Dashboard";

const Stack = createNativeStackNavigator()

export default function AuthRots() {
    return (
        <Stack.Navigator>
            <Stack.Screen                            //stack.screen = tela inicial
                name='Dashboard'
                component={Dashboard}
                options={{ headerShown: false }}  //hearderShown: false= tira o header fixo de cima
            />

        </Stack.Navigator>
    )
}
