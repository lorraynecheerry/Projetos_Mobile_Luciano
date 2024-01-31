import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from 'react-native'

export default function Inicio() {
    return (
        <SafeAreaView style={styles.conatiner}>
            <View>
                <Text>Dashboard</Text>
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})