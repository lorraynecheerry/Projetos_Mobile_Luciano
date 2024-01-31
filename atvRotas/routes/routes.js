import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Inicio from "../pages/Inicio";
import Dashboard from '../pages/Dashboard'

const Stack = createNativeStackNavigator() //criando uma constante para atribuir td o valor de creatNativeStackNavigator para Stack

export default function appRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Inicio'
                component={Inicio}
                options={{ headerShown: false }}
            />

           <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }} /> 
        </Stack.Navigator>
    )
}