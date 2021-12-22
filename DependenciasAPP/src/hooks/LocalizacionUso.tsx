import Geolocation from "@react-native-community/geolocation"
import { useEffect, useState } from "react"
import { Localizacion } from "../interfaces/appinterfaces";

export const LocalizacionUso = () => {
    const [ hasLocalizacion, setHasLocalizacion] = useState(false);
    const [ PosicionInicial, setPosicionInicial] = useState<Localizacion>({
        latitud: 0,
        longitud: 0
    });
    
    useEffect(() => {
        getLocalizacionActual()
            .then(localizacion => {
            setPosicionInicial(localizacion);
            setHasLocalizacion(true);
            })
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
                (err)=> reject({err}),{enableHighAccuracy: true})
        })
    }

    return {
        hasLocalizacion,
        PosicionInicial,
        getLocalizacionActual
    }
    
}
