import Geolocation from "@react-native-community/geolocation"
import { useEffect, useRef, useState } from "react"
import { Localizacion } from "../interfaces/appinterfaces";

export const LocalizacionUso = () => {
    const [ hasLocalizacion, setHasLocalizacion] = useState(false);
    const [ PosicionInicial, setPosicionInicial] = useState<Localizacion>({
        latitud: 0,
        longitud: 0
    });
    
    const [PosicionUsuario, setPosicionUsuario] = useState<Localizacion>({
        longitud: 0,
        latitud: 0
    });

    const IdSeguimiento = useRef<number>();

    useEffect(() => {
        getLocalizacionActual()
            .then(localizacion => {
            setPosicionInicial(localizacion);
            setPosicionUsuario(localizacion);
            setHasLocalizacion(true);
            });
    }, []);

    const getLocalizacionActual = (): Promise<Localizacion> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    resolve({
                        latitud: coords.latitude,
                        longitud: coords.longitude
                    });

                },
                (err)=> reject({err}),{enableHighAccuracy: false})
        })
    }

    const SeguirLocalizacionUsuario = () => {
        IdSeguimiento.current = Geolocation.watchPosition(
            ({coords}) => {
                setPosicionUsuario({
                    latitud: coords.latitude,
                    longitud: coords.longitude
                })
            },
            (err) => console.log(err), {enableHighAccuracy: false, distanceFilter: 10}
        )
    }

    const DetenerSeguimientoUsuario = () => {
        if(IdSeguimiento.current)
            Geolocation.clearWatch(IdSeguimiento.current);
    }

    return {
        hasLocalizacion,
        getLocalizacionActual,
        PosicionInicial,
        SeguirLocalizacionUsuario,
        DetenerSeguimientoUsuario,
        PosicionUsuario
    }
    
}
