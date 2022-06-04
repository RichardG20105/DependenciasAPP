import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import InicioSesion from '../componentes/InicioSesion';
import PantallaRegistro from './PantallaRegistro';

const PantallaSesion = () => {

    const Stack = createStackNavigator();
  return (
    <>
        <Stack.Navigator initialRouteName='InicioDeSesion' screenOptions={{headerShown:false}}>
            <Stack.Screen name='InicioDeSesion' component={InicioSesion}/>
            <Stack.Screen name='RegistroDeUsuario' component={PantallaRegistro}/>
        </Stack.Navigator>
    </>
  )
}

export default PantallaSesion