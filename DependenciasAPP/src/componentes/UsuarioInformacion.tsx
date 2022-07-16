import React, { useState } from 'react'
import { 
    StyleSheet,
    View, 
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {images} from '../../constants'
import { UsuarioUso } from '../hooks/UsuarioUso';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')

export const UsuarioInformacion = ({navigation}:any) => {
    const {CerrarSesion} = UsuarioUso()
    const {UsuarioInfo, InformacionUsuario, EliminarCuenta} = UsuarioUso();

    const [Mostrar, setMostrar] = useState(false)
    

    const isFocus = useIsFocused();

    useEffect(() => {
        InformacionUsuario()
        setTimeout(() => {setMostrar(true)},1000)
    }, [isFocus])

    useEffect(() => {
        setMostrar(false)
    }, [!isFocus])

    const Cerrar =  () => {
        Alert.alert("Sesión","¿Desea cerrar la sesión?",[
            {text:'Cancelar',style:"cancel"},
            {text:'Aceptar',onPress: () => CerrarSesion()},
        ])
    }

    const Eliminar = () => {
        Alert.alert("Cuenta",'¿Desea eliminar la cuenta?, no podra recuperar la información despues.',[
            {text:'Cancelar',style:"cancel"},
            {text:'Aceptar',onPress: () => EliminarCuenta()}
        ])
    }

    return (
        <View style={{backgroundColor:'black', height}}>
            {Mostrar && UsuarioInfo &&
             <View style={styles.container}>
                <Image 
                    style={styles.bgimagen} 
                    source={images.avatar_2}
                    blurRadius={20}
                />
                <View style={styles.bottomContainer}>
                <Image
                        style={styles.profile}
                        source={UsuarioInfo.genero === 'Masculino' ?images.avatar_3 :images.avatar_6}
                /> 
                <Text style={styles.name}>{UsuarioInfo.nombres}</Text>
                <Text style={styles.name}>{UsuarioInfo.apellidos}</Text>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                            <Icon name= "account" color="black" size={25}/>
                            <Text style={styles.text}>{UsuarioInfo.usuario}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name= "map-marker-radius" color="black" size={25} />
                            <Text style={styles.text}>{UsuarioInfo.ciudad}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name= "phone" color="black" size={25}/>
                            <Text style={styles.text}>(+593) {UsuarioInfo.telefono}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name= "email" color="black" size={25}/>
                            <Text style={styles.text}>{UsuarioInfo.correo}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.commandButton} onPress={() => {navigation.navigate('UsuarioModificar')}}>
                        <Text style={styles.panelButtonTitle}>Modificar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.commandButton} onPress={() => Eliminar()}>
                        <Text style={styles.panelButtonTitle}>Eliminar Cuenta</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                            style={{
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: 13
                            }}
                            onPress={() => Cerrar()}
                        >
                            <Icon name="exit-to-app"
                                color="#ffffff"
                                size={35}
                                />
                        </TouchableOpacity>
            </View>
            }
            {!Mostrar && 
                <View style ={{height: height, backgroundColor: 'black'}}>
                    <View style={{top: width * 0.7,justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                        <Image style={{width: 100, height: 150, marginBottom: 10}} source={require('../assets/InicioSesion/LogoSesion.png')} resizeMode={'stretch'}/>
                        <Text style={styles.TextoCarga}>LODES - ESPOCH</Text>
                        <ActivityIndicator
                            size={50}
                            color='#273E5C'
                        />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    bgimagen: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },

    bottomContainer: {
        marginTop: "50%",
        height:"90%",
        width: "100%",
        backgroundColor: '#E6EEF9',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        alignItems: 'center'
    },

    profile: {
        height: 150,
        width: 150,
        borderRadius: 80,
        bottom: "12%",
        backgroundColor: 'white'
    },

    name: {
        fontSize: 32,
        fontWeight:'bold',
        bottom: "8%",
        color: "black"
    },

    userInfoSection: {
        paddingHorizontal: 20,
        marginBottom: 10,
        marginRight: 'auto'
    },

    row: {
        flexDirection: 'row',
        marginBottom: 25,
    },

    text: {
        fontSize: 18,
        color: "black" ,
        marginLeft: 15, 
    },

    commandButton: {
        paddingBottom: 14,
        paddingHorizontal: 40,
        borderRadius: 10, 
        backgroundColor: '#273E5C',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 2
    },

    panelButtonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
    },
    TextoCarga: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        paddingBottom: 20
    }
});