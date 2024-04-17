import React, { useEffect, useRef, useState, useContext } from 'react'
import { AutContexts } from '../../Components/Contexts/Contexts'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location'
import firebase from '../../Components/firebase/dbConect'
import MapView, { Marker } from 'react-native-maps'


export default function Acompanhamento() {
    const mapaRef = useRef(MapView)
    const [localizacao, setLocalizacao] = useState(null)

    const { autenticar } = useContext(AutContexts)
    autenticar()


    /*useEffect(() => {
        async function acompanhar() {
            await firebase.database().ref('motoqueiros').on('value', (snapshot) => {
                snapshot?.forEach((item) => {
                    let data = {
                        dados: item.val()
                    }
                    setLocalizacao(data.dados.localizacao)
                })
            })            
        }
        acompanhar()        
    }, [])*/

    
      
    return (
        <View>
            <Text>Tela de Acompanhamento</Text>

            {localizacao && (
                <MapView
                    ref={mapaRef}
                    style={styles.mapview}
                    loadingEnabled={true}
                    initialRegion={{
                        latitude: localizacao.latitude,
                        longitude: localizacao.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }}

                >
                    <Marker
                        coordinate={{
                            latitude: localizacao.latitude,
                            longitude: localizacao.longitude
                        }}
                    >
                        <Image
                            style={styles.iconMarker}
                            source={require('../../../assets/capacete.png')}
                        />
                    </Marker>
                </MapView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapview: {
        height: '70%',
        width: '100%'
    },
    iconMarker: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    }
})



