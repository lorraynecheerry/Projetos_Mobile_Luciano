import React from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'


export default function Inicio({ }) {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.texto}> Inicio</Text>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.textButton}>Dashboard</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao: {
        marginTop: 20,
        backgroundColor: '#c3f1fd',
        height: 40,
        borderRadius: 8,
    },
    textButton: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },

    texto: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#5e60a4'
    },
})