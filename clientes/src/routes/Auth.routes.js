import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from "../pages/Dashboard";
//import Login from "../pages/Login";
// import Pedidso from '../pages/Pedidos/index'
import Pedidos from "../pages/Pedidos/index";

const Stack = createNativeStackNavigator()

export default function AuthRots() {
    return (
        <Stack.Navigator>
            <Stack.Screen                            //stack.screen = tela inicial
                name='Dashboard'
                component={Dashboard}
                options={{ headerShown: false }}  //hearderShown: false= tira o header fixo de cima
            />

            <Stack.Screen                          
                name='Pedidos'
                component={Pedidos}
                options={{ headerShown: false }}  
            />


        </Stack.Navigator>
    )
}
