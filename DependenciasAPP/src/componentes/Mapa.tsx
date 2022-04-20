import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { LocalizacionUso } from '../hooks/LocalizacionUso';
import { Fab } from './Fab';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../hooks/API_KEY';
import { Dimensions, Image, Keyboard, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import { BaseURL} from '../api/Apis';
import { Boton } from './Boton';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Dependencia } from '../interfaces/appinterfaces';
import { getIconoMapa } from './Iconos';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


export const Mapa = ({navigation}:any) => {
    const { 
        PosicionInicial, 
        getLocalizacionActual,
        SeguirLocalizacionUsuario,
        DetenerSeguimientoUsuario,
        PosicionUsuario
    } = LocalizacionUso();

    const { Dependencias, DependenciasSugerida, 
            Dependencia, BuscarDependencia, BuscarDependenciaSugerida,
    } = DependenciaUso();

    const [ReferenciaVistaMapa, setReferenciaVistaMapa ]= useState<MapView>();
    const [SeguirUsuario, setSeguirUsuario ]= useState<Boolean>(true);

    const [Texto, setTexto ] = useState<string>('');
    
    const [EstadoBusqueda, setEstadoBusqueda] = useState<Boolean>(false);

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
        if(!SeguirUsuario) return;

        const {latitud, longitud} = PosicionUsuario;
    
        ReferenciaVistaMapa?.animateCamera({
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

        setSeguirUsuario(true);

        ReferenciaVistaMapa?.animateCamera({
            center: {
                latitude: latitud,
                longitude: longitud
            }
        })
    }
    const PosicionarBusquedaSugerida = async(busqueda: string) => {
        BuscarDependenciaSugerida(busqueda);
        DependenciasSugerida.map(elemento => {
            if(elemento.nombreDependencia === busqueda){
                setEstadoBusqueda(false);
                setTexto(busqueda);
                ReferenciaVistaMapa?.animateCamera({
                    center:{latitude:elemento.latitud,longitude:elemento.longitud},
                    zoom: 18,
                });
            }
        })
    }

    const BusquedaSugerida = async(busqueda: string) => {
        if(busqueda === ''){
            setEstadoBusqueda(false); 
            setTexto('')  
        }
        else{
            setTexto(busqueda)
            setEstadoBusqueda(true);
            BuscarDependenciaSugerida(busqueda);
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
        setSeguirUsuario(true)
    }

    const Tiempo = (tiempo: number, distancia: number) => {
        setDistanciaTiempo({tiempo,distancia})
    }

    const CancelarRuta = () => {
        setRuta(false);
        setOrigen({LocalizacionUsuario:{latitude: 0, longitude: 0}});
        setDestino({LocalizacionDestino:{latitude: 0, longitude: 0}});
    }

    const getTexto = ():string =>{
        return Texto;
    }

    const setReferenciaMapa = (referencia: any) =>{
        if(referencia){
            setReferenciaVistaMapa(referencia)
        }
    }
    

    return (
        <>
            <MapView
                ref={ (el) => setReferenciaMapa(el)}
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
                onTouchStart={ () => [setSeguirUsuario(false), setTocarDependencia(false), Keyboard.dismiss()]}
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
                            <Image source={ getIconoMapa(val.idTipoDependencia) } style={styles.Marcador} resizeMode="contain"/>
                            <Text style={{color:'black',fontSize: 7}}>{val.nombreDependencia}</Text>
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
                        precision='high'
                        mode='WALKING'
                        onReady={result => {
                            Tiempo(result.duration, result.distance)
                        }}
                    />
                    :<View/>
                }
            </MapView>
            <View style={styles.BuscadorCuadro}>
                <TextInput 
                    placeholder='Buscador...'
                    value={ getTexto()}
                    style={styles.Buscador}
                    onChangeText={busqueda => BusquedaSugerida(busqueda)}
                />
                { EstadoBusqueda
                    ? <FlatList
                        style={styles.ListaSugerida} 
                        data={DependenciasSugerida} 
                        getItemLayout={(data, index) => {
                            return{
                                length: 30,
                                offset: 30 * index,
                                index
                            }
                        }}
                        renderItem={({item}) => {
                        return(
                            <TouchableOpacity style={styles.ListaTocar}
                                onPress={() => {setSeguirUsuario(false), PosicionarBusquedaSugerida(item.nombreDependencia)}}
                            >
                                <Text style={styles.TextoLista}>{item.nombreDependencia}</Text>
                            </TouchableOpacity>
                        )
                        }} 
                    />
                    : <View/>
                }
            </View>
            { TocarDependencia
                ?   <View style={styles.Carta}>
                        <Svg>
                            { (Dependencia?.fotos.length != 0)
                                ?<Image style={styles.CartaContenido} source={{uri: `${BaseURL}/imagenes/${Dependencia?.fotos[0].nombreFoto}`}}/>
                                :<Image style={styles.CartaContenido} source={require('../assets/ImageNotFound.png')}/>
                            }
                            <View style={styles.Info}>
                            <Text style={styles.Titulo}>{Dependencia?.nombreDependencia}</Text>
                            </View>
                        </Svg>
                        <Fab NombreIcono="arrow-redo-outline" onPress={() => TrazarRuta()}
                                style={{position: 'absolute',bottom: 20, right:10,}}/>
                        <Fab NombreIcono="information-outline" onPress={() => {navigation.navigate('Dependencias',{idDependencia:Dependencia!.idDependencia})}}
                                style={{position: 'absolute',bottom: 20, right: 70,}}/>
                    </View>
                : <View/>
            }
            { !TocarDependencia
                ? <Fab   NombreIcono="locate"
                    onPress={() => PosicionCentral()}
                    style={{
                        bottom: 200,
                        right: -350
                    }}
                />
                : <View/>
            }
            { Ruta
                ?   <View style={styles.CuadroRuta}>
                        <View style={styles.CuadroContenido}>
                            <Text style={styles.Texto}>Tiempo de Llegada: <Text style={{fontWeight:'normal'}}> {DistanciaTiempo.tiempo.toFixed(0)}.min</Text></Text>
                            <Text style={styles.Texto}>Km Aproximados: <Text style={{fontWeight: 'normal'}}>{DistanciaTiempo.distancia.toFixed(1)}.km</Text></Text>
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
        backgroundColor: '#21C437',
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
    BuscadorCuadro:{
        position: 'absolute',
        top: 15,
        right: 20,
        width: DispositivoWidth - 40,
        borderRadius: Radio,
        elevation: 9,
        shadowColor: '#000',
        shadowOffset: {
            width:10,
            height: 10,
        },
        shadowRadius: Radio,
    },
    Buscador: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: Radio,
    },
    ListaSugerida:{
        marginVertical: 5,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: Radio,
        width: DispositivoWidth - 40,
        maxHeight: 120,
    },
    TextoLista:{
        marginVertical: 3,
        marginHorizontal: 10, 
        color: 'black',
    },
    ListaTocar:{
        height: 30,
    }
})