import React ,{useEffect, useState} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    ActivityIndicator
} from "react-native"

import  Carousel  from '../componentes/Carousel'
import {icons} from '../../constants'
import { TiposDependenciaUso } from '../hooks/TiposDependenciaUso';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import { Dimensions } from 'react-native';
import Card from '../componentes/Card';
import PantallaDependencia from './PantallaDependencia';
import Apis from '../api/Apis';
import BuscadorDependencias from '../componentes/BuscadorDependencias';
import { getIconoInicio } from '../componentes/Iconos';


type RootStackParamList = {
    Inicio: undefined;
    Lista: undefined;
    Dependencia: {idDependencia: number};
    Buscador: undefined;
};

const {width, height} = Dimensions.get('window')

const PantallaInicio = () => {
    const {BaseURL} = Apis();
    const Stack = createStackNavigator();

    const { TiposDependencia, CargarTiposDependencia} = TiposDependenciaUso();
    const { Dependencias, Recomendados } = DependenciaUso();

    const [IdTipo, setIdTipo] = useState(0);

    const [EstadoCarga, setEstadoCarga] = useState(false)

    useEffect(() => {
      CargarTiposDependencia();
      setEstadoCarga(true)
    }, [])

    useEffect(() => {
      setTimeout(() =>{setEstadoCarga(false)},1000)
    }, [EstadoCarga])
    

    type homeScreenProp = StackNavigationProp<RootStackParamList, 'Inicio'>;    

    function renderHeader(){
        const navigation = useNavigation<homeScreenProp>();
        return (
            <View style={{flexDirection: 'row', height: 50, marginBottom: 11}}>
                <View
                    style={{
                        width: 50,
                        paddingLeft: 20,
                        justifyContent: 'center',
                        marginTop: 20
                    }}
                >
                    <Image
                        source={require('../assets/Logo.png')}
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50
                        }}
                    /> 
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '80%',
                            height: "80%",
                            backgroundColor: "#EFEFF1",
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                            marginTop: 20,
                            left: 8
                        }}
                    >
                        <Text style={{ color: "#295074", fontFamily: "Roboto-Bold", fontSize: 20, lineHeight: 26, fontWeight: 'bold' }}>LODES - ESPOCH</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        
                        justifyContent: 'center',
                        marginTop: 20
                    }}
                    onPress={() => {navigation.navigate('Buscador')}}
                >
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    /> 
                </TouchableOpacity>

            </View>
        )
    }
    
    function  renderMainCategories(){
        const navigation = useNavigation<homeScreenProp>();
        return(
            <View style={{ padding: 7 * 2, paddingBottom: 4}}>
                <Text style={{ color: "#295074", fontFamily: "Roboto-Black", fontSize: 17, lineHeight: 21, fontWeight: 'bold' }}> Categorías </Text>

                <FlatList
                    data={TiposDependencia}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.idTipoDependencia}`}
                    renderItem = { ({item}) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    padding: 7,
                                    paddingBottom: 4 * 2,
                                    backgroundColor: "#FF6347",
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 6.5,
                                    
                                    ...style.shadow
                                }}
                                onPress={() => {setIdTipo(item.idTipoDependencia),navigation.navigate('Lista')}}
                            >
                                <View   
                                    style={{
                                        width: 50,
                                        height: 48,
                                        borderRadius: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#FFFFFF"
                                    }}
                                >
                                    <Image
                                        source={getIconoInicio(item.idTipoDependencia)}
                                        resizeMode="contain"
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                    />
                                </View>
                                <Text
                                    style={{
                                        marginTop: 0,
                                        color: "#FFFFFF",
                                        fontFamily: "Roboto-Regular", fontSize: 12, lineHeight: 22,
                                        textAlign: 'justify'
                                    }}
                                >
                                    {item.nombreTipoDependencia}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}  
                    contentContainerStyle={{ paddingVertical: 2 * 2 }}
                />

            </View>   
        )
    }
    function ListaScreen(){
        const navigation = useNavigation<homeScreenProp>();
        const Regreso = () =>{
            navigation.goBack()
        }

        return(
            <SafeAreaView style={style.container}>
                <View style={{ flexDirection:'row', paddingTop: 15, paddingBottom: 15 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: 10 * 2,
                        justifyContent: 'center',
                        right: 10
                    }}
                    onPress={() => Regreso()}
                >
                    <Icon name="chevron-back"
                        color="black"
                        size={45}/>
                </TouchableOpacity>
                
                {/* Nombre de la Sección de la Dependencia */}

                <View 
                    style={{
                        flex: 1,
                        marginHorizontal: 15,
                        marginRight: 60,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 40,
                            borderRadius: 30,
                            backgroundColor: "#EFEFF1"
                        }}
                    >
                        <Text style={{fontFamily: "Roboto-Bold",fontSize: 18, lineHeight: 22, color: "#295074", fontWeight: 'bold'}}>Dependencias</Text>
                    </View>
                </View>
            </View>
                <View style={style.Lista}>
                    <FlatList
                        data={Dependencias}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => `${item.idDependencia}`}
                        renderItem={({item}) => {
                            if(item.idTipoDependencia === IdTipo){
                                return(
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#3498DB',
                                            marginVertical: 5,
                                            borderRadius: 10,
                                            borderColor: 'black',
                                            borderWidth: 1
                                        }}
                                        onPress={() => navigation.navigate('Dependencia',{idDependencia: item.idDependencia})}
                                    >   
                                    { (item?.fotos.length != 0)
                                        ?<Image style={style.Imagen} source={{uri: BaseURL+`/imagenes/${item.fotos[0].nombreFoto}`}}/>
                                        :<Image style={style.Imagen} source={require('../assets/ImageNotFound.png')}/>
                                    }
                                       <View >
                                            <Text style={style.TextoLista} >{item.nombreDependencia}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }else{
                                return(
                                    <></>
                                )
                            }
                        }}
                    />
                </View>
            </SafeAreaView>
        )
    }

    function rendermainCards(){
        const navigation = useNavigation<homeScreenProp>();

        return(
            <>
                <FlatList
                data={Recomendados}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => `${item.idDependencia}`}
                renderItem = { ({item}) => {
                    return (
                        <TouchableOpacity 
                            style={{marginBottom: 5 * 2}}
                            onPress={() => navigation.navigate('Dependencia',{idDependencia: item.idDependencia})}
                        >  
                            <Card 
                                title = {item.nombreDependencia}
                                location = 'ESPOCH'
                                description = {item.descripcionDependencia}
                                image = {item.fotos}
                            />
                        </TouchableOpacity>
                    )
                }}
                contentContainerStyle={{ paddingVertical: 3 * 2,paddingBottom: "15%" }}
            />
        
            </>
        )
    }

    function InicioScreen(){
        return(
            <SafeAreaView style={{backgroundColor: 'black', width,height}}>
                {!EstadoCarga && <View style={style.container}>
                    <StatusBar
                        translucent = {false}
                        backgroundColor= "white"
                        barStyle= "dark-content"
                    />
                    {renderHeader()}
                    <View style={{paddingVertical: 2 * 2}}>
                        <Carousel />
                    </View>
                    {renderMainCategories()}
                    <Text style={{ color: "#295074", fontFamily: "Roboto-Black", fontSize: 17, lineHeight: 26, paddingLeft:14, fontWeight: 'bold'}}> Recomendados </Text>
                    {rendermainCards()}
                </View>
                }

                { EstadoCarga && 
                    <View style ={{
                        top: 250,
                        
                  }}>
                      <Image style={{width: 100, height: 150, left:width*0.35, marginBottom: 10}} source={require('../assets/InicioSesion/LogoSesion.png')} resizeMode={'stretch'}/>
                      <Text style={style.TextoCarga}>LODES - ESPOCH</Text>
                    <ActivityIndicator
                    size={50}
                    color="#FF6347"
                    />
                  </View>
                }
                
            </SafeAreaView>
        )
    }

    return (
        <Stack.Navigator initialRouteName='Inicio' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Inicio' component={InicioScreen}/>
            <Stack.Screen name='Lista' component={ListaScreen}/>
            <Stack.Screen name='Dependencia' component={PantallaDependencia}/>
            <Stack.Screen name='Buscador' component={BuscadorDependencias}/>
        </Stack.Navigator>
    )
}

const VentanaWidth = Dimensions.get('window').width;
const VentanaHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    contenedorBoton:{
        width: 35
    },
    TituloLista:{
        textAlign:'center',
        color: 'black',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
    },
    ContenedorLista:{
        flex: 1,
        height: VentanaHeight
    },
    Lista:{
        width: VentanaWidth * 0.95,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 10,
        padding: 0,
    },
    Imagen:{
        padding: 0,
        margin: 0,
        width: '100%',
        height: VentanaHeight * 0.20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    TextoLista:{
        color: '#ffff',
        padding: 10
    },
    TextoCarga: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        paddingBottom: 20
    }
})
export default PantallaInicio