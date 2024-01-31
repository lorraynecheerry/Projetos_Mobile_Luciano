import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from '../pages/Dashboard'
import Inicio from "../pages/Inicio";



const Stack = createNativeStackNavigator()

export default function AppRoutes() {
    return (
        <Stack.Navigator>   

            <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{ headerShown: false }} />


          <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }} /> 



        </Stack.Navigator>
    )
}