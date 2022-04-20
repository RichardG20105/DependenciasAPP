import React, { createContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { PermissionStatus } from "react-native-permissions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EstadoSesion{
    EstadoToken: PermissionStatus;
}

export const EstadoSesionInit: EstadoSesion = {
    EstadoToken: 'unavailable',
}
type ContextoSesionProps = {
    sesion: EstadoSesion;
    PreguntarEstadoSesion: () => void;
    VerificarEstadoSesion: () => void;
}

export const ContextoSesion = createContext({} as ContextoSesionProps);

export const ProovedorSesion = ({children}: any) => {
    const [sesion, setSesion] = useState(EstadoSesionInit)

    useEffect(() => {
        VerificarEstadoSesion();
        AppState.addEventListener('change', sesion => {
          if(sesion !== 'active') return;
          VerificarEstadoSesion();
        });
    }, [])

    const PreguntarEstadoSesion = async() => {
        let estadoSesion: PermissionStatus;

        const resp = await AsyncStorage.getItem('Token')
        
        if(resp === null ){
            estadoSesion = 'unavailable'
        }else{
            estadoSesion = 'granted'
        }

        setSesion({
            ...sesion,
            EstadoToken: estadoSesion
        });
    }
    

    const VerificarEstadoSesion = async() => {
        let estadoSesion: PermissionStatus;

        const resp = await AsyncStorage.getItem('Token')
        
        if(resp === null){
            estadoSesion = 'unavailable'
        }else{
            estadoSesion = 'granted'
        }

        setSesion({
            ...sesion,
            EstadoToken: estadoSesion
        })
    }

    return(
        <ContextoSesion.Provider value={{
            sesion,
            PreguntarEstadoSesion,
            VerificarEstadoSesion,
        }}>
            { children }
        </ContextoSesion.Provider>
    )
}