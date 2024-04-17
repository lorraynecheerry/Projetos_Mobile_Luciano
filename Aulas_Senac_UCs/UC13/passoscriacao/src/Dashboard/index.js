import {
    StyleSheet,
    SafeAreaView,
    View,
    Text
} from 'react-native'

export default function Dashboard(){
    
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>Tela de Dashboard</Text>
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

    text: {
        fontSize: 35,
        fontWeight: 'bold'
    },
});