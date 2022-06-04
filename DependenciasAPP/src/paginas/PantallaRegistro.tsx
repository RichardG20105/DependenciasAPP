import axios from 'axios';
import React, { useState } from 'react'
import { ScrollView, ImageBackground, Dimensions, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { BaseURL } from '../api/Apis';
import { UsuarioUso } from '../hooks/UsuarioUso';
import { Usuario } from '../interfaces/appinterfaces';

const PantallaRegistro = (props:any) => {
    const [NombreUsuario, setNombreUsuario] = useState('')
    const [Contrasena, setContrasena] = useState('')
    const [Nombres, setNombres] = useState('')
    const [Apellidos, setApellidos] = useState('')
    const [Correo, setCorreo] = useState('')
    const [Genero, setGenero] = useState('')


    const [EstadoContrasena, setEstadoContrasena] = useState(false)
    const [EstadoGeneroM, setEstadoGeneroM] = useState(false)
    const [EstadoGeneroF, setEstadoGeneroF] = useState(false)

    const onCrear = () =>{
        if(ValidarCampos()){
            const Usuario: Usuario = {
                idUsuario: 0,
                nombres: Nombres,
                apellidos: Apellidos,
                usuario: NombreUsuario,
                contrasena: Contrasena,
                genero: Genero,
                ciudad: '',
                telefono: '',
                correo: Correo
            }

            const URL = BaseURL + '/Usuario/Registro'
            axios.post(URL,Usuario).then((resp) => {
                if(resp.data){
                    props.navigation.goBack()
                    Alert.alert('Creacion de Cuenta','Su Cuenta fue creada exitosamente',[{text:'Aceptar'}])
                }
            }).catch((error) => {
            if(error.request.status === 404){
                Alert.alert('Error', error.response.data.message,[{text:'Aceptar'}])
            }
            });       
        }
    }

    const ValidarCampos = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        if(Contrasena.length < 8){
            Alert.alert('Error','La contraseña debe tener como minimo 8 caracteres',[{text: 'Aceptar'}])
            return false;
        }
        if(reg.test(Correo) === false){
            Alert.alert('Error','El correo ingresado es incorrecto',[{text: 'Aceptar'}])
            return false;
        }
        if(Genero === ''){
            Alert.alert('Error','Debe seleccionar un Genero',[{text: 'Aceptar'}])
            return false;
        }
        return true;
    }
  return (
    <ScrollView
        style={{flex: 1, backgroundColor: '#ffffff'}}
        showsVerticalScrollIndicator={false}
    >
    {/* Brand View */}
        <ImageBackground
            source={require('../assets/InicioSesion/Inicio.jpg')}
            style={{
                height: Dimensions.get('window').height /2.1
            }}
        >
        <View style={styles.brandView}>
            <Image
                style={styles.profile}
                source={require('../assets/InicioSesion/LogoSesion.png')}
                resizeMode="contain"
            />

            <Text style={styles.brandViewText}>LODES-ESPOCH</Text>
        </View>
    </ImageBackground>

    {/* Bottom View */}
    <View style={styles.bottomView}>
        {/* Wellcom View */}
        <View style={{padding: 40}}>
            <Text style={{color: '#FF6347', fontSize: 30}}>Registrate</Text>
            <Text style={{color: 'black', top: 10}}>Llena los campos solicitados para Registrarte
            </Text>
            {/* Form Inputs View */}    
            <View style={styles.action}>
                <FontAwesome
                    name= "address-card"
                    color= "#05375a"
                    size= {23}
                />
                <TextInput
                    value={Nombres}
                    onChangeText={setNombres}
                    placeholder="Nombres"
                    placeholderTextColor='grey'
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome
                    name= "address-card"
                    color= "#05375a"
                    size= {23}
                />
                <TextInput
                    value={Apellidos}
                    onChangeText={setApellidos}
                    placeholder="Apellidos"
                    placeholderTextColor='grey'
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome
                    name= "user"
                    color= "#05375a"
                    size= {23}
                />
                <TextInput
                    value={NombreUsuario}
                    onChangeText={setNombreUsuario}
                    placeholder="Usuario"
                    placeholderTextColor='grey'
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome
                    name= "lock"
                    color= "#05375a"
                    size= {23}
                />
                <TextInput
                    value={Contrasena}
                    onChangeText={setContrasena}
                    placeholder="Contraseña"
                    placeholderTextColor='grey'
                    secureTextEntry={!EstadoContrasena}
                    style={styles.textInput}
                    autoCorrect={false}
                    maxLength={16}
                />
                <TouchableOpacity
                    onPress={() => {setEstadoContrasena(!EstadoContrasena)}}
                >
                <Feather
                    name={!EstadoContrasena ?"eye-off" :"eye"}
                    color='grey'
                    size={21}
                />
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <FontAwesome
                    name= "envelope"
                    color= "#05375a"
                    size= {23}
                />
                <TextInput
                    value={Correo}
                    onChangeText={setCorreo}
                    placeholder="Correo"
                    placeholderTextColor='grey'
                    style={styles.textInput}
                    autoCapitalize='none'
                />
            </View>
            <View style={[styles.action,{alignItems: 'center'}]}>
                <Text style={{color:'black'}}>Genero</Text> 
                <TouchableOpacity style={styles.botonGenero} onPress={() => {setEstadoGeneroM(true), setEstadoGeneroF(false), setGenero('Masculino')}}>
                <FontAwesome
                    name= "mars"
                    color= {EstadoGeneroM ?"white" :"#05375a"}
                    size= {30}
                />
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonGenero} onPress={() => {setEstadoGeneroF(true), setEstadoGeneroM(false), setGenero('Femenino')}}>
                <FontAwesome
                    name= "venus"
                    color= {EstadoGeneroF ?"white" :"#05375a"}
                    size= {30}
                />
                </TouchableOpacity>
            </View>
                {/* Login Button */}
                <View
                    style={{
                        height: 100, 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity style={styles.commandButton} 
                        onPress={() => onCrear()}
                    >
                        <Text style={styles.panelButtonTitle}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    brandView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },

    panelButtonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
    },

    brandViewText: {
        color: '#3498DB',
        fontSize: 40,
        fontWeight: 'bold',
        top: -45,
        textTransform: 'uppercase'
    },

    commandButton: {
        top: 20,
        paddingBottom: 15,
        paddingHorizontal: 100,
        borderRadius: 10, 
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
    },

    bottomView: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60
    },

    textInput:{
        flex: 1,
        marginTop: -11,
        left: 10,
        color: '#05375a',
        fontSize: 17
    },

    action: {
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },

    profile: {
        height: 150,
        width: 150,
        borderRadius: 50,
        bottom: "12%",
    },
    botonGenero:{
        backgroundColor: '#8A979F',
        marginLeft: 20,
        width: 40,
        height: 40,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 20,
    }
})
export default PantallaRegistro