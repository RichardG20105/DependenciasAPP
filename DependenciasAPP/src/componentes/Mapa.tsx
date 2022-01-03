import React, { Children, useContext, useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { LocalizacionUso } from '../hooks/LocalizacionUso';
import PantallaCarga from '../paginas/PantallaCarga';
import { Fab } from './Fab';
import { Boton } from './Boton';
import { Button, PixelRatio, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { PantallaPermisos } from '../paginas/PantallaPermisos';
import { ContextoPermiso, ProveedorPermisos } from '../contexto/ContextoPermisos';

interface Props{
    markers?: Marker[];
}

export const Mapa = ({markers}: Props) => {

    const { 
        hasLocalizacion, 
        PosicionInicial, 
        getLocalizacionActual,
        SeguirLocalizacionUsuario,
        DetenerSeguimientoUsuario,
        PosicionUsuario
    } = LocalizacionUso();

    const ReferenciaVistaMapa = useRef<MapView>();
    const SeguirUsuario = useRef<Boolean>(true);

    useEffect(() => {
        SeguirLocalizacionUsuario();
        return () => {
            DetenerSeguimientoUsuario();
        }
    }, [])

    useEffect(() => {
        
        if(!SeguirUsuario.current) return;

        const {latitud, longitud} = PosicionUsuario;
        ReferenciaVistaMapa.current?.animateCamera({
            center:{latitude:latitud,longitude:longitud}
        });
    }, [PosicionUsuario])

    const PosicionCentral = async() => {
        const {latitud, longitud} = await getLocalizacionActual();

        SeguirUsuario.current = true;

        ReferenciaVistaMapa.current?.animateCamera({
            center: {
                latitude: latitud,
                longitude: longitud
            },
            zoom: 18
        })
    }

    return (
        <>
            <MapView
                ref={ (el) => ReferenciaVistaMapa.current = el!}
                style={{flex:1}}
                showsMyLocationButton={false}
                showsUserLocation
                initialRegion={{
                    latitude: PosicionInicial.latitud,
                    longitude: PosicionInicial.longitud,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
                }
                onTouchStart={ () => SeguirUsuario.current = false}
            >
            </MapView>
            <Fab
                NombreIcono="locate"
                onPress={() => PosicionCentral()}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 30
                }}
            />
        </>
    )
}