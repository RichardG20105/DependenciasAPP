import React, { useContext } from 'react'
import { ContextoSesion } from '../contexto/ContextoSesion';
import { createStackNavigator } from '@react-navigation/stack';
import Favoritos from '../componentes/Favoritos';
import PantallaSesion from './PantallaSesion';
import PantallaDependencia from './PantallaDependencia';

const PantallaFavoritos = () => {
    const {sesion} = useContext(ContextoSesion)    
    
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {
                (sesion.EstadoToken === 'granted')
                ? <Stack.Screen name='ComponenteFavoritos' component={Favoritos} />
                : <Stack.Screen name='PantallaSesion' component={PantallaSesion} />
            }
            <Stack.Screen name='Dependencias' component={PantallaDependencia}/>
        </Stack.Navigator>
    )
}

export default PantallaFavoritos
