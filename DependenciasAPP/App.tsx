import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navegador } from './src/navegador/Navegador';
import { ProveedorPermisos } from './src/contexto/ContextoPermisos';



const App = () => {
  return (
    <NavigationContainer>
      <Navegador />
    </NavigationContainer>
  ) 
}
export default App;
