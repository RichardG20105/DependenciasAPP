import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { UsuarioInformacion } from '../componentes/UsuarioInformacion';
import { PantallaModificarUsuario } from './PantallaModificarUsuario';

const PantallaUsuario = ({navigation}:any) => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='UsuarioInfo' screenOptions={{headerShown:false}}>
        <Stack.Screen name='UsuarioInfo' component={UsuarioInformacion}/>
        <Stack.Screen name='UsuarioModificar' component={PantallaModificarUsuario}/>
    </Stack.Navigator>
  )
}

export default PantallaUsuario