import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from "../pages/Login";
//import Dashboard from "../pages/Dashboard";

const Stack = createNativeStackNavigator()

export default function NoAuthRots() {
    return (
        <Stack.Navigator>
            <Stack.Screen                            //stack.screen = tela inicial
                name='Login'
                component={Login}
                options={{ headerShown: false }}  //hearderShown: false= tira o header fixo de cima
            />

        </Stack.Navigator>
    )
}
