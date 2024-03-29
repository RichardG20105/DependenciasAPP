import React ,{useEffect} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
} from "react-native"

import  Carousel  from '../componentes/Carousel'
import {icons} from '../../constants'
import { TiposDependenciaUso } from '../hooks/TiposDependenciaUso';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import { Dimensions } from 'react-native';
import Card from '../componentes/Card';
import PantallaDependencia from './PantallaDependencia';
import Apis from '../api/Apis';
import BuscadorDependencias from '../componentes/BuscadorDependencias';
import { getIconoInicio } from '../componentes/Iconos';
import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
    Inicio: undefined;
    Lista: {idTipoDep:number};
    Dependencia: {idDependencia: number};
    Buscador: undefined;
};

const {width, height} = Dimensions.get('window')
const Stack = createStackNavigator();   

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Inicio'>;

const PantallaInicio = () => {
    
    const { TiposDependencia, CargarTiposDependencia} = TiposDependenciaUso();
    
    const { Recomendados, CargarRecomendados } = DependenciaUso();


    useEffect(() => {
        CargarTiposDependencia()
        CargarRecomendados()
    }, [])

    function renderHeader(){
        const navigation = useNavigation<homeScreenProp>();
        return (
            <View style={{flexDirection: 'row', height: 50, marginBottom: 11}}>
                <View
                    style={{
                        width: 50,
                        paddingLeft: 18,
                        justifyContent: 'center',
                        marginTop: 15,
                    }}
                >
                    <Image
                        source={require('../assets/InicioSesion/LogoSesion.png')}
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
                            backgroundColor: "white",
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                            marginTop: 20,
                            right: 5
                        }}
                    >
                        <Text style={{ color: "#295074", fontFamily: "Roboto-Bold", fontSize: 20, lineHeight: 26, fontWeight: 'bold' }}>LODES - ESPOCH</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 30,
                        justifyContent: 'center',
                        marginTop: 20,
                        right: 22
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
                            <View
                                style={{
                                    padding: 7,
                                    paddingBottom: 4 * 2,
                                    backgroundColor: "#E6EEF9",
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 2, 
                                    
                                }}
                            >
                                <TouchableOpacity   
                                    onPress={() => {navigation.navigate('Lista',{idTipoDep: item.idTipoDependencia})}}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 23,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#88C2FC",
                                        ...style.shadow
                                    }}
                                >
                                    <Image
                                        source={getIconoInicio(item.idTipoDependencia)}
                                        resizeMode="contain"
                                        style={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        color: "#295074",
                                        fontFamily: "Roboto-Regular", 
                                        fontSize: 14, 
                                        lineHeight: 22,
                                        fontWeight: '700',
                                        textAlign: 'justify'
                                    }}
                                >
                                    {item.nombreTipoDependencia}
                                </Text>
                            </View>
                        )
                    }}  
                    contentContainerStyle={{ paddingVertical: 1 * 2 }}
                />

            </View>   
        )
    }
    function ListaScreen(props:any){
        const {BaseURL} = Apis();
        const navigation = useNavigation<homeScreenProp>();
        const {DependenciasTipo,CargarDependenciasTipo} = DependenciaUso();
        
        const Regreso = () =>{
            navigation.goBack()
        }

        useEffect(() => {
            CargarDependenciasTipo(props.route.params.idTipoDep);
        },[])
        

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
                            backgroundColor: "white"
                        }}
                    >
                        <Text style={{fontFamily: "Roboto-Bold",fontSize: 18, lineHeight: 22, color: "#295074", fontWeight: 'bold'}}>Dependencias</Text>
                    </View>
                </View>
            </View>
                <View style={style.Lista}>
                    <FlatList
                        data={DependenciasTipo}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                                return(
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#5383C2',
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
                        }}
                        keyExtractor={item => `${item.idDependencia}`}
                    />
                </View>
            </SafeAreaView>
        )
    }

    function rendermainCards(){
        const navigation = useNavigation<homeScreenProp>()
        

        return(
            <>
                <FlatList
                data={Recomendados}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => `${item.idDependencia}`}
                renderItem = { ({item}) => {
                    return (
                        <TouchableOpacity 
                            style={{marginBottom: 3 * 2}}
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
            <SafeAreaView style={{backgroundColor: '#E6EEF9', width,height}}>

                    <StatusBar
                        translucent = {false}
                        backgroundColor= "#E6EEF9"
                        barStyle= "dark-content"
                    />
                    {renderHeader()}
                    <View style={{paddingVertical: 2 * 2}}>
                        <Carousel />
                    </View>
                    {renderMainCategories()}
                    <Text style={{ color: "#295074", fontFamily: "Roboto-Black", fontSize: 17, lineHeight: 26, paddingLeft:14, fontWeight: 'bold'}}> Recomendados </Text>
                    {rendermainCards()}
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


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6EEF9",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
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
        height: height
    },
    Lista:{
        width: width * 0.95,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 10,
        padding: 0,
        marginBottom: height * 0.20,
    },
    Imagen:{
        padding: 0,
        margin: 0,
        width: '100%',
        height: height * 0.20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    TextoLista:{
        color: '#ffff',
        padding: 10
    },
})
export default PantallaInicio