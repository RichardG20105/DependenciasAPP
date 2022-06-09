import React, { useContext } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ContextoPermiso } from '../contexto/ContextoPermisos';
import { Boton } from '../componentes/Boton';

export const PantallaPermisos = () => {

    const { PreguntarPermisoLocalizacion } = useContext( ContextoPermiso );


    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Para hacer uso del Mapa debe conceder los Permisos de GPS </Text>

            <Boton
                title="Permiso"
                onPress={ PreguntarPermisoLocalizacion }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#BFEEFE'
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color:'black'
    }
});

