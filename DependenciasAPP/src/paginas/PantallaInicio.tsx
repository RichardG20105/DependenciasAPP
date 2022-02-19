import React ,{useEffect, useState} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native"
import  Carousel  from '../componentes/Carousel'
import {icons} from '../../constants'
import { TiposDependenciaUso } from '../hooks/TiposDependenciaUso';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseURL, DependenciasApi } from '../api/Apis';
import { Dependencia } from '../interfaces/appinterfaces';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import Svg from 'react-native-svg';
import { Dimensions } from 'react-native';


type RootStackParamList = {
    Inicio: undefined;
    Lista: undefined;
};

const PantallaInicio = () => {
    const Stack = createStackNavigator();

    const { TiposDependencia, CargarTiposDependencia} = TiposDependenciaUso();
    const { Dependencias } = DependenciaUso();

    const [IdTipo, setIdTipo] = useState(0);

    useEffect(() => {
      CargarTiposDependencia();
    }, [])
    

    const getIcono = (id:number) => {
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

    function renderHeader(){
        return (
            <View style={{flexDirection: 'row', height: 50}}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: 20,
                        justifyContent: 'center',
                        marginTop: 20
                    }}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    /> 
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '80%',
                            height: "80%",
                            backgroundColor: "#EFEFF1",
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                            marginTop: 20
                        }}
                    >
                        <Text style={{ color: "black", fontFamily: "Roboto-Bold", fontSize: 17, lineHeight: 20 }}>Location</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: 10,
                        justifyContent: 'center',
                        marginTop: 20
                    }}
                >
                    <Image
                        source={icons.basket}
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
    type homeScreenProp = StackNavigationProp<RootStackParamList, 'Inicio'>;
    function  renderMainCategories(){
        const navigation = useNavigation<homeScreenProp>();
        return(
            <View style={{ padding: 7 * 2, paddingVertical: 97 * 2}}>
                <Text style={{ color: "black", fontFamily: "Roboto-Black", fontSize: 25, lineHeight: 30 }}> Categories </Text>

                <FlatList
                    data={TiposDependencia}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.idTipoDependencia}`}
                    renderItem = { ({item}) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    paddingBottom: 10 * 2,
                                    backgroundColor: "#0CEF5C",
                                    borderRadius: 35,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 10,
                                    ...style.shadow
                                }}
                                onPress={() => {setIdTipo(item.idTipoDependencia),navigation.navigate('Lista')}}
                            >
                                <View   
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#FFFFFF"
                                    }}
                                >
                                    <Image
                                        source={getIcono(item.idTipoDependencia)}
                                        resizeMode="contain"
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                    />
                                </View>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        color: "#FFFFFF",
                                        fontFamily: "Roboto-Regular", fontSize: 12, lineHeight: 22
                                    }}
                                >
                                    {item.nombreTipoDependencia}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}  
                    contentContainerStyle={{ paddingVertical: 7 * 2 }}
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
            <SafeAreaView style={ style.ContenedorLista}>
                <TouchableOpacity style={style.contenedorBoton} onPress={() => Regreso()}>
                    <Icon name="arrow-back"
                    color="black"
                    size={35}/>
                </TouchableOpacity>
                <Text style={style.TituloLista}>Dependencias</Text>
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
                                            backgroundColor: '#22B002',
                                            marginVertical: 5,
                                            borderRadius: 10,
                                        }}
                                    >   
                                    { (item?.fotos.length != 0)
                                        ?<Image style={style.Imagen} source={{uri: `${BaseURL}/imagenes/${item.fotos[0].nombreFoto}`}}/>
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

    function InicioScreen(){
        return(
            <SafeAreaView style={style.container}>
                {renderHeader()}
                <View style={{paddingVertical: 8 * 2}}>
                    <Carousel />
                </View>
                {renderMainCategories()}   
            </SafeAreaView>
        )
    }

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Inicio' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Inicio' component={InicioScreen}/>
                <Stack.Screen name='Lista' component={ListaScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const VentanaWidth = Dimensions.get('window').width;
const VentanaHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F9"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
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
        backgroundColor: '#2a2a2a1a',
        height: VentanaHeight
    },
    Lista:{
        width: VentanaWidth * 0.95,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 10,
    },
    Imagen:{
        width: VentanaWidth * 0.95,
        height: VentanaHeight * 0.20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    TextoLista:{
        color: '#ffff',
        padding: 10
    }
})

export default PantallaInicio