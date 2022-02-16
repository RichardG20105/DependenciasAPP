import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { Text, View, AppState, StyleSheet } from 'react-native';
import { Boton } from '../componentes/Boton';
import { Mapa } from '../componentes/Mapa';
import { ContextoPermiso, ProveedorPermisos, EstadoPermiso } from '../contexto/ContextoPermisos';
import PantallaCarga from './PantallaCarga';
import { PantallaPermisos } from './PantallaPermisos';

const PantallaMapa = () => {

    const {permisos, PreguntarPermisoLocalizacion} = useContext(ContextoPermiso)
    
    return (
        <View style={{flex:1}}>
            {
                ( permisos.EstadoLocalizacion === 'granted' )
                ? <Mapa/>
                : <PantallaPermisos/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color:'black'
    }
});

export default PantallaMapa