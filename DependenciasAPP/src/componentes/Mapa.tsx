import React, { Children, useContext, useEffect, useRef } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import { LocalizacionUso } from '../hooks/LocalizacionUso';
import PantallaCarga from '../paginas/PantallaCarga';
import { Fab } from './Fab';
import { Boton } from './Boton';
import { Button, Image, PixelRatio, Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { PantallaPermisos } from '../paginas/PantallaPermisos';
import { ContextoPermiso, ProveedorPermisos } from '../contexto/ContextoPermisos';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import {Svg, Image as ImageSvg}from 'react-native-svg';

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

    const {Dependencias} = DependenciaUso();

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
            }
        })
    }

    const BaseURL = 'http://192.168.1.14:8080'
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
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                }
                }
                onTouchStart={ () => SeguirUsuario.current = false}
            >
               {
                    Dependencias.map((val,i) => {
                        return(
                            <Marker 
                                key={val.idDependencia}
                                coordinate={{
                                    latitude:val.latitud,
                                    longitude:val.longitud
                                }}
                                title={val.nombreDependencia}
                                description={val.descripcionDependencia}
                            >
                                <Callout tooltip>
                                    <View style={styles.Marcador}>
                                        <Text style={styles.Titulo}>{val.nombreDependencia}</Text>
                                        <Text  style={styles.Texto}>{val.descripcionDependencia}</Text>
                                        <Svg>
                                            <ImageSvg width={150} height={100} 
                                                preserveAspectRatio="xMidYMid slice" href={{uri: BaseURL+'/imagenes/auditorio.jpg'}}/>                                        
                                        </Svg>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <Fab
                NombreIcono="locate"
                onPress={() => PosicionCentral()}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 30
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    Marcador:{
        flexDirection:'column',
        borderRadius: 6,
        backgroundColor: 'white',
        width: 150,
        height: 130
    },
    Titulo:{
        color: 'black',
        fontSize: 11,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    Texto:{
        padding: 5,
        color:'black',
        fontSize: 10
    }
})
