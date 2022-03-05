import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View } from 'react-native';
import Apis from '../api/Apis';
import Favoritos from '../componentes/Favoritos';
import PantallaSesion from './PantallaSesion';

export const PantallaFavoritos = () => {
    const {Token, getToken} = Apis();
    
    const isFocused = useIsFocused()
    useEffect(() => {
        getToken()
    }, [isFocused])
    
    return (
        <View>
            {
                (!Token) 
                ? <PantallaSesion />
                : <Favoritos />
            }
        </View>
    )
}
