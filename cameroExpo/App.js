import { useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { Button, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 
export default function App() {
 
  const [type, setType] = useState(CameraType.back) //verifica qual camera esta ativa segundo a classe (CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions() //utiliza a propria funcao do camera
 
  // se nao tiver permissao nao prossegue (fica carregando)
  if (!permission) {
    return <View />
  }
 
  //se a permissao nao estiver garantida ele SOLICITA uma permissao ao APP
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Precisamos da sua permissao para mostrar a câmera</Text>
        <Button onPress={requestPermission} title='Solicitar Permissão' />
      </View>
    )
  }
 
  function toogleCameraType() {
    //acessa a const que foi armezenado a camera q foi ativa
    //se current(camera atual)  (===) for igual a CameraType.back  -->
    // se for verdadeira ela muda para(?) CameraType.front  -->
    // se for falsa ela muda para(:) CameraType.back
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }
 
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toogleCameraType}>
            <Text style={styles.text}>Mudar Camera</Text>
          </TouchableOpacity>
        </ View>
      </Camera>
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
 