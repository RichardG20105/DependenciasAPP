import React, { useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContextoPermiso, ProveedorPermisos } from '../contexto/ContextoPermisos';
import { Boton } from '../componentes/Boton';
import { createStackNavigator } from '@react-navigation/stack';
import { PantallaInicio } from './PantallaInicio';
import { Mapa } from '../componentes/Mapa';

export const PantallaPermisos = () => {

    const { permisos, PreguntarPermisoLocalizacion } = useContext( ContextoPermiso );


    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Es necesario el uso del GPS para usar esta aplicación </Text>

            <Boton 
                title="Permiso"
                onPress={ PreguntarPermisoLocalizacion }
            />

            <Text style={{ marginTop: 20 }}>
                { JSON.stringify( permisos, null, 5 ) }
            </Text>
            <Mapa/>
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
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    }
});

