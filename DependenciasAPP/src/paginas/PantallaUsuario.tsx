import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { UsuarioInformacion } from '../componentes/UsuarioInformacion';
import { PantallaModificarUsuario } from './PantallaModificarUsuario';
import PantallaSesion from './PantallaSesion';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import Apis from '../api/Apis';

const PantallaUsuario = ({navigation}:any) => {
    const Stack = createStackNavigator();

    const {Token, getToken} = Apis();

    const isFocused = useIsFocused();

    useEffect(() => {
      getToken()
    },[isFocused])
  return(
    <>
      {
        (!Token)
        ? <PantallaSesion />
        : <Stack.Navigator initialRouteName='UsuarioInfo' screenOptions={{headerShown:false}}>
        <Stack.Screen name='UsuarioInfo' component={UsuarioInformacion}/>
        <Stack.Screen name='UsuarioModificar' component={PantallaModificarUsuario}/>
      </Stack.Navigator>
      }
    </>
  )
}

export default PantallaUsuario