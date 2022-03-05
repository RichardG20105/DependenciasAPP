import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Mapa } from '../componentes/Mapa';
import { ContextoPermiso, ProveedorPermisos, EstadoPermiso } from '../contexto/ContextoPermisos';
import { PantallaPermisos } from './PantallaPermisos';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import PantallaDependencia from './PantallaDependencia';


const PantallaMapa = () => {
    const {permisos} = useContext(ContextoPermiso)
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            
        >
            { 
                ( permisos.EstadoLocalizacion === 'granted')
                ? <Stack.Screen name='PantallaMapa' component={Mapa}/>
                : <Stack.Screen name='PantallaPermiso' component={PantallaPermisos}/>
            }
            <Stack.Screen name='Dependencias' component={PantallaDependencia}/>
        </Stack.Navigator>
    )
}

export default PantallaMapa