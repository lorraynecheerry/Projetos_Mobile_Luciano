import React from 'react'
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
} from 'react-native'

export default function Inicio() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Dashboard</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    }
})