import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './src/routes/index'
import AuthProvider from './src/Contexts/contexto';



export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>

        <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
        <Rotas />

      </AuthProvider>
    </NavigationContainer>
  );
}

