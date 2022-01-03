import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navegador } from './src/navegador/Navegador';
import { ProveedorPermisos } from './src/contexto/ContextoPermisos';

const EstadoApp = ({ children}:any)=>{
  return (
      <ProveedorPermisos>
          {children}
      </ProveedorPermisos>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <EstadoApp>
        <Navegador />
      </EstadoApp>
    </NavigationContainer>
  ) 
}
export default App;
