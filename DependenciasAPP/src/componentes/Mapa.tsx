import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { LocalizacionUso } from '../hooks/LocalizacionUso';
import { Fab } from './Fab';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../hooks/API_KEY';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import { BaseURL } from '../api/Apis';
import { Boton } from './Boton';

export const Mapa = () => {
    const { 
        PosicionInicial, 
        getLocalizacionActual,
        SeguirLocalizacionUsuario,
        DetenerSeguimientoUsuario,
        PosicionUsuario
    } = LocalizacionUso();

    const { Dependencias, 
            Dependencia, BuscarDependencia,
    } = DependenciaUso();

    const ReferenciaVistaMapa = useRef<MapView>();
    const SeguirUsuario = useRef<Boolean>(true);

    const [Ruta, setRuta] = useState(false)
    const [TocarDependencia, setTocarDependencia] = useState<Boolean>(false);
    const [Origen, setOrigen] = useState({
        LocalizacionUsuario: {
            latitude: 0,
            longitude: 0
        }
    })
    const [Destino, setDestino] = useState({
        LocalizacionDestino:{
            latitude: 0,
            longitude: 0
        }
    })

    const [DistanciaTiempo, setDistanciaTiempo] = useState({
        tiempo: 0,
        distancia: 0,
    })

    useEffect(() => {
        const intervalo = setInterval(() => {
            LocalizacionTiempoReal()
        }, 10000)
        return () => clearInterval(intervalo)
    }, [])

    useEffect(() => {
        SeguirLocalizacionUsuario();
        return () => {
            DetenerSeguimientoUsuario();
        }
    }, [])

    useEffect(() => {
        LocalizacionTiempoReal();
        if(!SeguirUsuario.current) return;

        const {latitud, longitud} = PosicionUsuario;
        ReferenciaVistaMapa.current?.animateCamera({
            center:{latitude:latitud,longitude:longitud}
        });
    }, [PosicionUsuario])
    
    const LocalizacionTiempoReal = async () => {
        const {latitud, longitud} = PosicionUsuario;
        setOrigen({
            LocalizacionUsuario: {latitude: latitud, longitude: longitud}
        })
    }

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

    const getMarcador = (id:number) => {
        let path = '../assets/MapPins/'
        switch(id){
            case 1:
                return require(path+'Auditorio.png')
                break;
            case 2:
                return require(path+'Baño.png')
                break;
            case 3:
                return require(path+'Estadio.png')
                break;
            case 4: 
                return require(path+'Cancha.png');
                break;
            case 5:
                return require(path+'Parqueadero.png')
                break;
            default:
                return
                break;

        }
    }
    
    const MarkerClic = (IdDep: number,latitude: number,longitude: number)  =>{
        setTocarDependencia(true);
        BuscarDependencia(IdDep);
        setDestino({LocalizacionDestino:{latitude,longitude}});
    }

    const TrazarRuta = () => {
        setRuta(true);
        setTocarDependencia(false);
    }

    const Tiempo = (tiempo: number, distancia: number) => {
        setDistanciaTiempo({tiempo,distancia})
    }

    const CancelarRuta = () => {
        setRuta(false);
    }

    return (
        <>
            <MapView 
                ref={ (el) => ReferenciaVistaMapa.current = el!}
                style={{width:'100%', height:'100%'}}
                showsMyLocationButton={false}
                showsUserLocation
                toolbarEnabled={false}
                initialRegion={{
                    latitude: PosicionInicial.latitud,
                    longitude: PosicionInicial.longitud,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                }
                }
                onTouchStart={ () => [SeguirUsuario.current = false, setTocarDependencia(false)]}
                
            >
               {
                    Dependencias.map((val) => {
                        return(
                            <Marker 
                                key={val.idDependencia}
                                coordinate={{
                                    latitude:val.latitud,
                                    longitude:val.longitud
                                }}
                                onPress={() => MarkerClic(val.idDependencia,val.latitud, val.longitud)}
                            >
                            <Image source={getMarcador(val.idTipoDependencia)} style={styles.Marcador} resizeMode="contain"/>
                            </Marker>
                            
                        )
                    })
                }
                { Ruta
                    ? <MapViewDirections
                        origin={Origen.LocalizacionUsuario}
                        destination={Destino.LocalizacionDestino}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={6}
                        strokeColor="red"
                        onReady={result => {
                            Tiempo(result.duration, result.distance)
                        } }
                    />
                    :<View/>
                }
            </MapView>
            { TocarDependencia
                ?   <View style={styles.Carta}>
                        <Svg>
                            { (Dependencia?.fotos.length != 0)
                                /* ?<ImageSvg width={'80%'} height={'80%'} 
                                    preserveAspectRatio="xMidYMid slice" href={{uri: `${BaseURL}/imagenes/${Dependencia?.fotos[0].nombreFoto}`}}/>                                        
                                :<ImageSvg  width={'100%'} height={'100%'} 
                                    preserveAspectRatio="xMidYMid slice" href={require('../assets/ImageNotFound.png')}/> */
                                ?<Image style={styles.CartaContenido} source={{uri: `${BaseURL}/imagenes/${Dependencia?.fotos[0].nombreFoto}`}}/>
                                :<Image style={styles.CartaContenido} source={require('../assets/ImageNotFound.png')}/>
                            }
                            <View style={styles.Info}>
                            <Text style={styles.Titulo}>{Dependencia?.nombreDependencia}</Text>
                            </View>
                        </Svg>
                        <Fab NombreIcono="arrow-redo-outline" onPress={() => TrazarRuta()}
                                style={{position: 'absolute',bottom: 20, right:10,}}/>
                    </View>
                : <View/>
            }
            { !Ruta && !TocarDependencia
                ? <Fab   NombreIcono="locate"
                    onPress={() => PosicionCentral()}
                    style={{
                        bottom: 150,
                        right: -350
                    }}
                />
                : <View/>
            }
            { Ruta
                ?   <View style={styles.CuadroRuta}>
                        <View style={styles.CuadroContenido}>
                            <Text style={styles.Texto}>Tiempo de Llegada: <Text style={{fontWeight:'normal'}}> {DistanciaTiempo.tiempo.toFixed(2)}.min</Text></Text>
                            <Text style={styles.Texto}>Km Aproximados: <Text style={{fontWeight: 'normal'}}>{DistanciaTiempo.distancia.toFixed(2)}.km</Text></Text>
                        </View>
                        <View style={{flex: 2,justifyContent: 'center', right: -120}}>
                            <Boton title='Cancelar' style={{width: 10,height: 10}} onPress={() => CancelarRuta()}/>
                        </View>
                    </View>
                : <View/>
            }
        </>
    )
}

const DispositivoWidth = Math.round(Dimensions.get('window').width)
const Radio = 20
const styles = StyleSheet.create({
    Padre:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    Hijo:{
        flex: 4,
    },
    Hijo2:{
        flex: 1,
    },
    Carta:{
        position:'absolute',
        bottom: 5,
        right: 7,
        width: DispositivoWidth - 15,
        height: 250,
        backgroundColor: 'lightgreen',
        borderRadius: Radio,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: Radio,
        elevation: 9,
    },
    CartaContenido: {
        width: DispositivoWidth - 15,
        height: 170,
        borderTopLeftRadius: Radio,
        borderTopRightRadius: Radio,
    },
    Titulo:{
        color: 'black',
        fontSize: 17,
        fontWeight: '800',
    },
    Info: {
        marginHorizontal: 10,
        marginVertical: 5,
        marginRight: 50,
    },
    CuadroRuta:{
        position:'absolute',
        bottom: 10,
        right: 7,
        width: DispositivoWidth - 15,
        height: 130,
        backgroundColor: 'lightblue',
        elevation: 9,
        borderRadius: Radio,
        shadowColor: '#000',
        shadowOffset:{
            width: 10,
            height: 10
        },
        shadowRadius: Radio,
    },
    CuadroContenido:{
        alignContent: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    Texto:{
        color: 'black',
        fontSize: 15,
        fontWeight: '900',
    },
    Marcador:{
        width: 40, 
        height: 40
    },
})