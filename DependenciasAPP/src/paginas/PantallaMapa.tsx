import React, { useContext } from 'react'
import { Mapa } from '../componentes/Mapa';
import { ContextoPermiso } from '../contexto/ContextoPermisos';
import { PantallaPermisos } from './PantallaPermisos';
import { createStackNavigator } from '@react-navigation/stack';
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
                ? <Stack.Screen name='ComponenteMapa' component={Mapa}/>
                : <Stack.Screen name='PantallaPermiso' component={PantallaPermisos}/>
            }
            <Stack.Screen name='Dependencias' component={PantallaDependencia}/>
        </Stack.Navigator>
    )
}

export default PantallaMapa