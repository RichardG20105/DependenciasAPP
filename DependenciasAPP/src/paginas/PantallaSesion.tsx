import React, { useState } from 'react'
import { Text, View, Image, StyleSheet,
         useWindowDimensions, TextInput, TouchableOpacity,
         Dimensions, Alert, ImageBackground, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UsuarioUso } from '../hooks/UsuarioUso';
import { Usuario } from '../interfaces/appinterfaces';

const PantallaSesion = () => {
    const [NombreUsuario, setNombreUsuario] = useState('')
    const [Contrasena, setContrasena] = useState('')
    const [EstadoContrasena, setEstadoContrasena] = useState(false)

    const {IniciarSesion} = UsuarioUso();

    const onIniciar = () =>{
        if(NombreUsuario.length < 4 || Contrasena.length < 5){
            Alert.alert('Usuario Invalido','Ingrese los datos correspondientes',[
                {text: 'Aceptar'}
            ])
        }else{
            const Usuario: Usuario = {
                idUsuario: 0,
                nombres: '',
                apellidos: '',
                usuario: NombreUsuario,
                contrasena: Contrasena,
                genero: '',
                ciudad: '',
                telefono: '',
                correo: ''
            }
            IniciarSesion(Usuario);
        }
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
                    <Text style={{color: '#FF6347', fontSize: 30}}>Bienvenido</Text>
                    <Text style={{color: 'black', top: 10}}>¿No tienes una cuenta?
                        <Text style={{color: '#4632A1', fontStyle: 'italic'}}>
                            {' '} Registrate ahora
                        </Text>
                    </Text>
                    {/* Form Inputs View */}    
                    <View style={styles.action}>
                        <FontAwesome
                            name= "user-o"
                            color= "#05375a"
                            size= {23}
                        />
                        <TextInput
                            value={NombreUsuario}
                            onChangeText={setNombreUsuario}
                            placeholder="Usuario"
                            style={styles.textInput}
                            autoCapitalize='none'
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
                            secureTextEntry={!EstadoContrasena}
                            style={styles.textInput}
                            autoCapitalize="none"
                            autoCorrect={false}
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
                    {/* Login Button */}
                    <View
                        style={{
                            height: 100, 
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity style={styles.commandButton} 
                            disabled={!Boolean(NombreUsuario && Contrasena)}
                            onPress={() => onIniciar()}
                        >
                            <Text style={styles.panelButtonTitle}>Iniciar Sesión</Text>
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
})
export default PantallaSesion