import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react'
import { View } from 'react-native';
import Apis from '../api/Apis';
import { ContextoSesion } from '../contexto/ContextoSesion';
import { createStackNavigator } from '@react-navigation/stack';
import Favoritos from '../componentes/Favoritos';
import PantallaSesion from './PantallaSesion';

const PantallaFavoritos = () => {
    const {sesion} = useContext(ContextoSesion)
    
    useEffect(() => {
      console.log(sesion.EstadoToken)

    }, [])
    
    
    return (
        <View>
            {
                (sesion.EstadoToken === 'unavailable')
                ? <PantallaSesion />
                : <Favoritos />
            }
        </View>

        /*<Stack.Navigator>
            {
                ( sesion.EstadoToken === 'granted')
                ? <Stack.Screen name='PantFavoritos' component={Favoritos}/>
                : <Stack.Screen name='PantSesion' component={PantallaSesion} />
            }
        </Stack.Navigator>*/
    )
}

export default PantallaFavoritos
