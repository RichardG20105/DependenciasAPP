import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from "react-native-permissions";

export interface EstadoPermiso{
    EstadoLocalizacion: PermissionStatus;
}

export const EstadoPermisoInit: EstadoPermiso = {
    EstadoLocalizacion: 'unavailable',
}

type ContextoPermisoProps = {
    permisos: EstadoPermiso;
    PreguntarPermisoLocalizacion: () => void;
    VerificarPermisoLocalizacion: () => void;
}

export const ContextoPermiso = createContext({} as ContextoPermisoProps);

export const ProveedorPermisos = ({children}: any) => {
    
    const [permisos, setPermisos] = useState( EstadoPermisoInit );
    
    useEffect(() => {
        VerificarPermisoLocalizacion();
        AppState.addEventListener('change', estado => {
            if(estado !== 'active') return;
            VerificarPermisoLocalizacion();
        });
    }, [])

    const PreguntarPermisoLocalizacion = async() => {
        let estadoPermiso: PermissionStatus;
        if(Platform.OS === 'ios'){
            estadoPermiso = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
            estadoPermiso = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if( estadoPermiso === 'blocked') {
            openSettings();
        }

        setPermisos({
            ...permisos,
            EstadoLocalizacion: estadoPermiso
        });
    }
    
    const VerificarPermisoLocalizacion = async() => {
        let estadoPermiso: PermissionStatus;
        if(Platform.OS === 'ios'){
            estadoPermiso = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
            estadoPermiso = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermisos({
            ...permisos,
            EstadoLocalizacion: estadoPermiso
        });
    }
    
    return(
        <ContextoPermiso.Provider value={{
            permisos,
            PreguntarPermisoLocalizacion,
            VerificarPermisoLocalizacion,
        }}>
            { children }
        </ContextoPermiso.Provider>
    )
}