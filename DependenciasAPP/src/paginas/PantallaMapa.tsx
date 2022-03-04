import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Mapa } from '../componentes/Mapa';
import { ContextoPermiso, ProveedorPermisos, EstadoPermiso } from '../contexto/ContextoPermisos';
import { PantallaPermisos } from './PantallaPermisos';
import { DependenciaUso } from '../hooks/DependendeciasUso';

const PantallaMapa = (props: any) => {
    const {permisos} = useContext(ContextoPermiso)
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

export default PantallaMapa