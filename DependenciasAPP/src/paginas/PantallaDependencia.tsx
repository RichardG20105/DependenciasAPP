import React, { useContext, useEffect, useState} from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    View, 
    Text,
    TouchableOpacity,
    Image,
    Alert,
    Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import { useIsFocused } from '@react-navigation/native';
import { BaseURL } from '../api/Apis';
import { ContextoSesion } from '../contexto/ContextoSesion';
import { UsuarioUso } from '../hooks/UsuarioUso';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const PantallaDependencia = (props: any) => {
    const idDependencia = props.route.params.idDependencia
    const Estado = props.route.params.idEstado
    const {Dependencia, BuscarDependencia} = DependenciaUso();
    const {FavDependencia, DependenciaFavorito, AgregarFavorito, EliminarFavorito} = UsuarioUso()

    const {sesion} = useContext(ContextoSesion)

    const IsFocus = useIsFocused()

    useEffect(() => {
        BuscarDependencia(idDependencia)
        DependenciaFavorito(idDependencia)
    }, [IsFocus])

        const VerificarLogeo = () =>{
            if(sesion.EstadoToken === 'unavailable'){
                Alert.alert('Error de Sesión','Necita Iniciar Sesión para poder agregar a favoritos',[{text: 'Cancelar'},{text: 'Aceptar',onPress: () => props.navigation.navigate("Usuario")}])
            }else{
                if(FavDependencia === true){
                    EliminarFavorito(idDependencia)
                }else{
                    AgregarFavorito(idDependencia)
                }
                
            }
        }

        const Regreso = () =>{
            props.navigation.goBack()
        }

        const DirigirMapa = (NombreDep: any) => {
            AsyncStorage.setItem('DependenciaRepo',NombreDep)
            if(Estado === 2)
                props.navigation.goBack()
            props.navigation.navigate('PantallaMapa')
        } 
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ 
                    alignItems: 'center',
                    }}
                >
                    <View style={{ height: HEIGHT / 2.9}}>
                       {(Dependencia?.fotos.length != 0)
                        ? <Image
                            source={{uri: `${BaseURL}/imagenes/${Dependencia?.fotos[0].nombreFoto}`}}
                            resizeMode='stretch'
                            style={{
                                width: WIDTH,
                                height: "140%",
                                borderRadius: 5
                            }} 
                        />
                        : <Image
                            source={require('../assets/ImageNotFound.png')}
                            resizeMode='stretch'
                            style={{
                                width: WIDTH,
                                height: "140%",
                                borderRadius: 5
                            }}
                         /> 
                       }
                        <TouchableOpacity
                            style={{
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 20,
                                left: 20,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: 13
                            }}
                            onPress={() => Regreso()}
                        >
                            <Icon name="arrow-back-ios"
                                color="#ffffff"
                                size={35}
                                style={{left: 7.5}}/>
                        </TouchableOpacity>
                        <View style={styles.detailsContainer}>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => VerificarLogeo()}>
                                    <Icon name="favorite" color= {FavDependencia ? 'red' : 'grey'} size={30} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconContainer1}>
                                <TouchableOpacity onPress={() => DirigirMapa(Dependencia?.nombreDependencia)}>
                                    <Icon name="directions" color= "#777873" size={40} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text 
                                        style={{
                                            color:'black',
                                            marginTop: 15,
                                            height: 50,
                                            width:  350,
                                            fontFamily: "Roboto-Bold",
                                            fontSize: 20, 
                                            lineHeight: 22,
                                            fontWeight: 'bold'
                                        }}
                                    > 
                                        {Dependencia?.nombreDependencia}
                                </Text>
                            </View>
                        </View> 
                        
                        <View style={{ flexDirection: 'row', 
                                            }}>
                                <Icon name="place" size={25} color="blue" style={{marginLeft: 10, marginTop: -10}}/>
                                <Text 
                                    style={{
                                        marginTop: -10,
                                        marginLeft: 2, 
                                        fontSize: 18, 
                                        fontWeight: 'bold', 
                                        color:"blue"
                                    }}
                                > 
                                    Espoch 
                                </Text>
                        </View>
                        <ScrollView style={{paddingBottom: 275}}>
                            <Text style={{color: "black", marginTop: 10, fontWeight: 'bold', fontSize: 20, marginLeft: 15}}>
                                Acerca de
                            </Text>
                            <Text style={{color: "black", marginTop: 15, lineHeight: 22, marginLeft: 15}}>
                            {Dependencia?.descripcionDependencia}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#E6EEF9",
    },

    detailsContainer: {
        top: -45,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingVertical: 38,
        paddingHorizontal: 20, 
        backgroundColor: '#E6EEF9',
        flex: 1.3,
    },

    iconContainer: {
        height: 60,
        width: 60, 
        marginRight: 18,
        position: 'absolute',
        top:-30,
        backgroundColor: '#E6EEF9',
        borderRadius: 30,
        right: 20,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    iconContainer1: {
        height: 60,
        width: 60, 
        marginRight: 100,
        position: 'absolute',
        top:-30,
        backgroundColor: '#E6EEF9',
        borderRadius: 30,
        right: 20,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PantallaDependencia