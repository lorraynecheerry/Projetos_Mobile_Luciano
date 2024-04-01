import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './src/routes/index'
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App() {
  return (
    <NavigationContainer>
      
      <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
      <Rotas />
     
    </NavigationContainer>
  );
}

