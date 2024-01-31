import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native/types";

export default function Dashboard(){
    return(
        <SafeAreaView>
            <ScrollView contentContainerStyle={StyleSheet.scrollViewContent}>
                <View>
                    <Text>Dashboard</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

