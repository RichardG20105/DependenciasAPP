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
            {text:'Cancelar'},
            {text:'Aceptar',onPress: () => CerrarSesion()}
        ])
    }

    const Eliminar = () => {
        Alert.alert("Cuenta",'¿Desea eliminar la cuenta?, no podra recuperar la información despues.',[
            {text:'Cancelar'},
            {text:'Aceptar',onPress: () => EliminarCuenta()}
        ])
    }

    return (
        <View>
            {Mostrar && UsuarioInfo &&
             <View style={styles.container}>
                <Image 
                    style={styles.bgimagen} 
                    source={images.avatar_2}
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
                            <Icon name= "account" color="#777777" size={25} />
                            <Text style={styles.text}>{UsuarioInfo.usuario}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name= "map-marker-radius" color="#777777" size={25} />
                            <Text style={styles.text}>{UsuarioInfo.ciudad}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name= "phone" color="#777777" size={25}/>
                            <Text style={styles.text}>(+593) {UsuarioInfo.telefono}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name= "email" color="#777777" size={25}/>
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
            { !Mostrar && <View style ={{
                    justifyContent: 'center',
                    alignItems: 'center',
              }}>
                <ActivityIndicator
                size={50}
                color="cyan"
                />
              </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
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
        backgroundColor: '#bbe3ed',
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
        marginBottom: 20,
        marginRight: 'auto'
    },

    row: {
        flexDirection: 'row',
        marginBottom: 25,
    },

    text: {
        fontSize: 18,
        color: "#777777" ,
        marginLeft: 15,
        
    },

    commandButton: {
        paddingBottom: 15,
        paddingHorizontal: 60,
        borderRadius: 10, 
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },

    panelButtonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
    },
});