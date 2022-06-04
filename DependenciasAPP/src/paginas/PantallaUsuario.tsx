import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { UsuarioInformacion } from '../componentes/UsuarioInformacion';
import { PantallaModificarUsuario } from './PantallaModificarUsuario';
import PantallaSesion from './PantallaSesion';
import { ContextoSesion } from '../contexto/ContextoSesion';
import PantallaRegistro from './PantallaRegistro';

const PantallaUsuario = () => {
    const Stack = createStackNavigator();

    const {sesion} = useContext(ContextoSesion)

  return(
    <>
      {
        (sesion.EstadoToken === 'unavailable')
        ? <PantallaSesion />
        : <Stack.Navigator initialRouteName='UsuarioInfo' screenOptions={{headerShown:false}}>
        <Stack.Screen name='UsuarioInfo' component={UsuarioInformacion}/>
        <Stack.Screen name='UsuarioModificar' component={PantallaModificarUsuario}/>
        <Stack.Screen name='Registro' component={PantallaRegistro}/>
      </Stack.Navigator>
      }
    </>
  )
}

export default PantallaUsuario