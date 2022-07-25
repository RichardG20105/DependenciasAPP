import React, { useEffect, useRef, useState } from 'react'
import MapView, { Camera, Circle, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { LocalizacionUso } from '../hooks/LocalizacionUso';
import { Fab } from './Fab';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import MapViewDirections, { MapViewDirectionsMode } from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../hooks/API_KEY';
import { Dimensions, Image, Keyboard, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import {Svg} from 'react-native-svg';
import Apis, { BaseURL, MapJSON } from '../api/Apis';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { getIconoMapa, getColorLetras } from './Iconos';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IdleTimerManager from 'react-native-idle-timer';


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

    let mapRef = useRef<MapView>(null)

    const CameraInicial: Camera = {
        center: {latitude: PosicionInicial.latitud, longitude: PosicionInicial.longitud},
        heading: 300,
        pitch: 0,
        zoom: 18,
        altitude: 2873,
    }
    
    const [SeguirUsuario, setSeguirUsuario ]= useState<Boolean>(true);

    const [Texto, setTexto ] = useState<string>('');
    
    const [EstadoBusqueda, setEstadoBusqueda] = useState<Boolean>(false);

    const [Ruta, setRuta] = useState(false)

    const [TocarDependencia, setTocarDependencia] = useState<Boolean>(false);

    const [LongDelta, setLongDelta] = useState<number>(0.00421)

    const [Forma, setForma] = useState<MapViewDirectionsMode>('WALKING')

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

    const [Reposicion, setReposicion] = useState({
        latitude: 0,
        longitude: 0,
    })

    const [DistanciaTiempo, setDistanciaTiempo] = useState({
        tiempo: 0,
        distancia: 0,
    })

    const [UltimoValor, setUltimoValor] = useState({
        latitude: 0,
        longitude: 0
    })
    
    useEffect(() => {
        SeguirLocalizacionUsuario();
        return () => {
            DetenerSeguimientoUsuario();
        }
    }, [])
    

    useEffect(() => {
        if(Ruta) LocalizacionTiempoReal()
        if(!SeguirUsuario) return;

        const {latitud, longitud} = PosicionUsuario;
    
        mapRef.current?.animateCamera({
            center:{latitude:latitud,longitude:longitud}
        });

    }, [PosicionUsuario])

    useFocusEffect( () => {
        Reposicionar()
    })
    
    

    const Reposicionar = async() => {
        const Repo = await AsyncStorage.getItem('DependenciaRepo')
        if(Repo !== null){
            if(TocarDependencia){
                setTocarDependencia(false)
            }
            Dependencias.forEach(ElementDep => {
                if(ElementDep.nombreDependencia === Repo){
                    setReposicion({latitude: ElementDep.latitud,
                        longitude: ElementDep.longitud,
                    })

                    if(Reposicion.latitude !== 0){
                        setSeguirUsuario(false)
                        mapRef.current?.animateCamera({
                            center:{latitude:Reposicion.latitude,longitude:Reposicion.longitude}
                        });
                        if(!Ruta){
                            MarkerClic(ElementDep.idDependencia, ElementDep.latitud, ElementDep.longitud)
                        }
                        BorrarReposicion()
                    }
                }
            });
        }
    }

    const BorrarReposicion = () => {
        AsyncStorage.removeItem('DependenciaRepo')
        setReposicion({
            latitude: 0,
            longitude: 0,
        })
    }
    
    const LocalizacionTiempoReal = async () => {
        const {latitud, longitud} = PosicionUsuario;
        setOrigen({
            LocalizacionUsuario: {latitude: latitud, longitude: longitud}
        })
    }

    const PosicionCentral = async() => {
        const {latitud, longitud} = await getLocalizacionActual();

        setSeguirUsuario(true)

        mapRef.current?.animateCamera({
            center: {
                latitude: latitud,
                longitude: longitud
            }
        })
    }

    const PosicionarDependenciaRuta =async () => {
        if(setSeguirUsuario)
            setSeguirUsuario(false)
        if(Dependencia){
            mapRef.current?.animateCamera({
                center:{
                    latitude: Dependencia.latitud,
                    longitude: Dependencia.longitud
                }
            })
        }
    }

    const PosicionarBusquedaSugerida = async(busqueda: string) => {
        BuscarDependenciaSugerida(busqueda);
        DependenciasSugerida.map(elemento => {
            if(elemento.nombreDependencia === busqueda){
                setEstadoBusqueda(false);
                setTexto(busqueda);
                mapRef.current?.animateCamera({
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
        BuscarDependencia(IdDep);
        setDestino({LocalizacionDestino:{latitude,longitude}});
        setTocarDependencia(true);
    }

    const TrazarRuta = () => {
        setSeguirUsuario(true)
        LocalizacionTiempoReal()
        setRuta(true)
        setTocarDependencia(false)
        IdleTimerManager.setIdleTimerDisabled(true);
    }

    const Tiempo = (tiempo: number, distancia: number) => {
        setDistanciaTiempo({tiempo,distancia})
    }

    const CancelarRuta = () => {
        setRuta(false);
        setOrigen({LocalizacionUsuario:{latitude: 0, longitude: 0}});
        setDestino({LocalizacionDestino:{latitude: 0, longitude: 0}});
        setUltimoValor({latitude: 0, longitude: 0})
        IdleTimerManager.setIdleTimerDisabled(false);
    }

    const MensajeLlegada = (Distancia: number) => {
        if(Distancia <= 0.001){
            Alert.alert('Llegaste a',Dependencia?.nombreDependencia,[
                {text: 'Aceptar',onPress: () => CancelarRuta()}
            ])
        }
    }

    const getTexto = ():string =>{
        return Texto;
    }

    const MarcadorTam = () => {
        const calculo =  0.1263 / LongDelta
        const maximo = 37
        if(calculo < maximo){
            return calculo
        }
        return maximo
    }

    const LetraTam = () => {
        return ((-160.77 * LongDelta) + 8.18)
    }

    const CambiarDeModo = (Modo: MapViewDirectionsMode) => {
        if(Forma != Modo){
            setForma(Modo)
        }
    }

    const CalcularUltimoValor = (coordenadas:any[]) => {
        let Lat: any = 'latitude'
        let Long: any = 'longitude'
        setUltimoValor({latitude: coordenadas[Lat],longitude: coordenadas[Long]})
    }

    return (
        <>
            <MapView
                provider={'google'}
                style={{width:'100%', height:'100%'}}
                showsMyLocationButton={false}
                showsCompass={false}
                showsUserLocation
                toolbarEnabled={false}
                scrollDuringRotateOrZoomEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
                customMapStyle={MapJSON}
                initialRegion={{
                    latitude: PosicionInicial.latitud,
                    longitude: PosicionInicial.longitud,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                }}
                ref={mapRef}
                onTouchStart={ () => [setSeguirUsuario(false), setTocarDependencia(false), setEstadoBusqueda(false), Keyboard.dismiss()]}
                maxZoomLevel={21}
                minZoomLevel={18}
                initialCamera={CameraInicial}
                

                /* Permitira Calcular los puntos*/
                onRegionChangeComplete={(cambio) => {setLongDelta(cambio.longitudeDelta)}}
            >
                {
                    Dependencias.map((val) => {
                        return(
                            <Marker 
                                key={val.idDependencia}
                                coordinate={{
                                    latitude:val.latitud,
                                    longitude:val.longitud,

                                }}
                                onPress={() => {
                                    (!Ruta ?MarkerClic(val.idDependencia,val.latitud, val.longitud) :Alert.alert('Error','Para seleccionar una Dependencia debe cancelar la ruta primero',[{text: 'Aceptar'}]))
                                }}
                            >
                                <View style={{alignContent: 'center', alignItems: 'center'}}>
                                    <Image source={ getIconoMapa(val.idTipoDependencia) } style={(TocarDependencia && val.idDependencia === Dependencia?.idDependencia) ?{width: MarcadorTam()+11, height: MarcadorTam()+11, zIndex: 9999} :{width: MarcadorTam(), height: MarcadorTam()}} resizeMode='contain'/>
                                    <Text style={[styles.TextoMarcador,{color: getColorLetras(val.idTipoDependencia),marginTop: 5, width: 75, textAlign: 'center'},(TocarDependencia && val.idDependencia === Dependencia?.idDependencia) ?{fontSize: (LetraTam()-1), zIndex: 9999} :{fontSize:LetraTam()}]} numberOfLines={2}>{val.nombreDependencia}</Text>
                                </View>
                            </Marker>
                        )
                    })
                }
                { Ruta &&
                    <Circle center={UltimoValor} radius={3} fillColor={'#43699C'} strokeColor={'black'} zIndex={99999} />
                }
                { Ruta && 
                    <MapViewDirections
                        origin={Origen.LocalizacionUsuario}
                        destination={Destino.LocalizacionDestino}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={4}
                        strokeColor={Forma === 'WALKING' ?'#35A800' :"#FF6347"}
                        mode={Forma}
                        region='ec'
                        resetOnChange={false}
                        precision='high'
                        onReady={result => { 
                            if(UltimoValor.latitude === 0) {CalcularUltimoValor(result.coordinates[result.coordinates.length - 1])}
                            Tiempo(result.duration, result.distance), MensajeLlegada(result.distance)
                        }}
                    />
                }
                
            </MapView>
            { !Ruta &&
                <View style={styles.BuscadorCuadro}>
                    <View style={styles.Buscador}>
                        <TextInput 
                            placeholder='Buscador...'
                            value={ getTexto()}
                            style={styles.InputBuscador}
                            onChangeText={busqueda => BusquedaSugerida(busqueda)}
                            placeholderTextColor={'grey'}
                        />
                        {(getTexto() !== '') &&
                            <TouchableOpacity style={{height: 30,width: 30,position: 'absolute', right: 10, top: 9}} onPress={() => {setTexto(''),setEstadoBusqueda(false)}}>
                                <Icon name='close' color='grey' size={30} />
                            </TouchableOpacity>
                        }
                    </View>
                    { EstadoBusqueda && <FlatList
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
                                    onPress={() => {setSeguirUsuario(false), PosicionarBusquedaSugerida(item.nombreDependencia), MarkerClic(item.idDependencia,item.latitud, item.longitud)}}
                                >
                                    <Text style={styles.TextoLista} numberOfLines={1}>{item.nombreDependencia}</Text>
                                </TouchableOpacity>
                            )
                            }} 
                        />
                    }
                </View>
            }
            { TocarDependencia &&
                <View style={styles.Carta}>
                        <Svg>
                            { (Dependencia?.fotos.length != 0)
                                ?<Image style={styles.CartaContenido} source={{uri: `${BaseURL}/imagenes/${Dependencia?.fotos[0].nombreFoto}`}}/>
                                :<Image style={styles.CartaContenido} source={require('../assets/ImageNotFound.png')}/>
                            }
                            <View style={styles.Info}>
                            <Text style={styles.Titulo}>{Dependencia?.nombreDependencia}</Text>
                            </View>
                        </Svg>
                        <Fab NombreIcono="arrow-redo-outline" PLeft={0} onPress={() => TrazarRuta()} Color='white' BGColor='#273E5C' IconSize={35}
                                style={{position: 'absolute',bottom: 20, right:10}}/>
                        <Fab NombreIcono="information-outline" PLeft={0} onPress={() => {navigation.navigate('Dependencias',{idDependencia:Dependencia!.idDependencia,idEstado:2})}} Color='white' BGColor='#273E5C' IconSize={35}
                                style={{position: 'absolute',bottom: 20, right: 70}}/>
                    </View>
            }
            
            <Fab NombreIcono="locate" Color='#43699C' BGColor='white' PLeft={0} IconSize={43}
                onPress={() => PosicionCentral()}
                style={{
                    bottom: DispositvoHeight * .60,
                    right: -DispositivoWidth *.84 
                }}
            />

            {Ruta && 
                <Fab NombreIcono="business" Color='#43699C' BGColor='white' PLeft={1.5} IconSize={30}
                    onPress={() => PosicionarDependenciaRuta()}
                    style={{
                        bottom: DispositvoHeight * .75,
                        right: -DispositivoWidth *.84 
                    }}
                />
            }

            { Ruta && <View style={styles.CuadroRuta}>
                { (Dependencia?.fotos.length != 0)
                    ?<Image style={styles.ImagenRuta} source={{uri: `${BaseURL}/imagenes/${Dependencia?.fotos[0].nombreFoto}`}} resizeMode={'stretch'} />
                    :<Image style={styles.ImagenRuta} source={require('../assets/ImageNotFound.png')} resizeMode={'stretch'} />
                }
                <TouchableOpacity onPress={() => CancelarRuta()} style={{position: 'absolute', right: 10, top: 10, backgroundColor:'rgba(0,0,0,0.4)', borderRadius: 50}}>
                    <Icon name='close' color={'white'} size={30}/>
                </TouchableOpacity>
                
                <View style={styles.CuadroContenido}>
                    <Text style={{textAlign:'center',fontSize: 18, fontWeight:'bold', color:'black', paddingBottom:7}}>Ruta</Text>
                    <Text style={styles.Texto}>Tiempo de Llegada: <Text style={{fontWeight:'normal'}}> {DistanciaTiempo.tiempo.toFixed(0)}.min</Text></Text>
                    <Text style={styles.Texto}>Km Aproximados: <Text style={{fontWeight: 'normal'}}>{DistanciaTiempo.distancia.toFixed(1)}.km</Text></Text>
                </View>
                <Fab NombreIcono="walk" Color={Forma === 'WALKING' ?'#35A800' :'grey'} BGColor='#EAECEE' PLeft={0} IconSize={35}
                    onPress={() => CambiarDeModo('WALKING')} 
                    style={{
                        position: 'absolute',
                        bottom: 7,
                        right: 160,
                    }}
                />

                <Fab NombreIcono="car" Color={Forma === 'DRIVING' ?'#FF6347' :'grey'} BGColor='#EAECEE' PLeft={0} IconSize={35}
                    onPress={() => CambiarDeModo('DRIVING')}
                    style={{
                        position: 'absolute',
                        bottom: 7,
                        right: 90,
                    }}
                />
                <View style={{justifyContent: 'center',position:'absolute', top: 95, right: 100}}>
                    
                </View>
            </View>
            }
        </>
    )
}

const DispositivoWidth = Math.round(Dimensions.get('window').width)
const DispositvoHeight = Math.round(Dimensions.get('window').height)
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
        bottom: DispositvoHeight * .13,
        right: 7,
        width: DispositivoWidth - 15,
        height: 250,
        backgroundColor: '#3498DB',
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
        marginTop: 8,
    },
    Info: {
        marginHorizontal: 10,
        marginVertical: 5,
        marginRight: 125,
    },
    CuadroRuta:{
        position:'absolute',
        bottom: DispositvoHeight * .13,
        right: 7,
        width: DispositivoWidth - 15,
        height: 160,
        backgroundColor: '#3498DB',
        elevation: 9,
        borderRadius: Radio,
        shadowColor: '#000',
        shadowOffset:{
            width: 10,
            height: 10
        },
        shadowRadius: Radio,
        flexDirection: 'row'
    },
    ImagenRuta:{
        width: 150,
        height: 160,
        borderTopLeftRadius: Radio,
        borderBottomLeftRadius: Radio,
    },
    CuadroContenido:{
        alignContent: 'center',
        marginHorizontal: 14,
        marginVertical: 10,
        marginTop: 15,
    },
    Texto:{
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
    },
    TextoMarcador:{
        position: 'relative',
        bottom: 0,
        fontFamily:'Roboto',
        elevation: 7,
        fontWeight: '600',
        textShadowColor: 'white'
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
        borderRadius: Radio,
    },
    InputBuscador:{
        fontSize: 16,
        color: 'black',
        width: DispositivoWidth - 90,
        left: 10
    },
    ListaSugerida:{
        marginVertical: 5,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: Radio,
        width: DispositivoWidth - 40,
        maxHeight: DispositvoHeight * 0.48,
    },
    TextoLista:{
        padding: 1,
        fontSize: 16,
        marginHorizontal: 10, 
        color: 'black',
    },
    ListaTocar:{
        margin: 2,
        width: DispositivoWidth - 50,
        height: 35,
    }
})