import Geolocation from '@react-native-community/geolocation'
import React, { useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { LocalizacionUso } from '../hooks/LocalizacionUso';
import PantallaCarga from '../paginas/PantallaCarga';
import { Fab } from './Fab';
import { Boton } from './Boton';
import { Button, PixelRatio, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    markers?: Marker[]
}
export const Mapa = ({markers}: Props) => {

    const { hasLocalizacion, PosicionInicial, getLocalizacionActual } = LocalizacionUso();

    const ReferenciaVistaMapa = useRef<MapView>();

    const PosicionCentral = async() => {
        const {latitud, longitud} = await getLocalizacionActual();
        ReferenciaVistaMapa.current?.animateCamera({
            center: {
                latitude: latitud,
                longitude: longitud
            },
            zoom: 18
        })
    }

    const padding = Platform.OS === 'android'
        ? PixelRatio.getPixelSizeForLayoutSize(20)
        : 20;
    /* if( !hasLocalizacion){
        return <PantallaCarga/>
    } */

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
            >
                {/* <Marker
                    coordinate={{
                        latitude: -1.6555740282668656,
                        longitude: -78.67859671555266,
                    }}
                    title="Usuario"
                    description="Este es el Usuario"
                /> */}
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