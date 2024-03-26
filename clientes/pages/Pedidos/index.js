import React from "react"
import {useNavigation} from '@react-navigation/native'
import {
    Text,
    View,
    Button,
    StyleSheet

} from 'react-native'

 export default function Pedido({}) {
    const navigation = useNavigation() 


    return (
      <View>
        <Text>Pedidos</Text>
  
        <Button title='Retornar Login'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    )
  }

  const styles = StyleSheet.create({

  })