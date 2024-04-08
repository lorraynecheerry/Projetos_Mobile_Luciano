import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import apiLocal from './apiLocal'


export default function App() {
  const [dados, setDdos] = useState('')
  return (
    <View style={styles.container}>

      <TextInput
        placeholder='pesquisa...'/>

    <ScrollView>
      {apiLocal.map((item) =>(
        <Text>{item.nome}</Text>
      ))}
    </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
