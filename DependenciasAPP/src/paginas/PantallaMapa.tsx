import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { Mapa } from '../componentes/Mapa';
import { ContextoPermiso, ProveedorPermisos } from '../contexto/ContextoPermisos';
import { PantallaPermisos } from './PantallaPermisos';

const Stack = createStackNavigator();


const PantallaMapa = () => {
    return (
        <View style={{flex:1}}>
            <Mapa/>
        </View> 
    )
}

export default PantallaMapa