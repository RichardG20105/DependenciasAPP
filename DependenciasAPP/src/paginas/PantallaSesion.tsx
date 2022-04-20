import React, { useState, useContext } from 'react'
import { Text, View, Image, StyleSheet,
         useWindowDimensions, TextInput, TouchableOpacity,
         Dimensions, Alert } from 'react-native';
import { UsuarioUso } from '../hooks/UsuarioUso';
import { Usuario } from '../interfaces/appinterfaces';

const PantallaSesion = ({navigation}:any) => {
    const [NombreUsuario, setNombreUsuario] = useState('')
    const [Contrasena, setContrasena] = useState('')
    const {height} = useWindowDimensions()

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
                ciudad: '',
                telefono: '',
                correo: ''
            }
            IniciarSesion(Usuario);
        }
    }

    return (
        <View style={styles.root}>
            <Image style={[styles.logo, {height: height * 0.3}]} source={require('../assets/LogoEspoch.png')} resizeMode='contain'/>
            <View style={styles.container}>
                <TextInput 
                    value={NombreUsuario}
                    onChangeText={setNombreUsuario}
                    placeholder='Usuario' 
                    placeholderTextColor='grey'
                    secureTextEntry={false}
                    style={styles.input}/>
            </View>
            <View style={styles.container}>
                <TextInput 
                    value={Contrasena}
                    onChangeText={setContrasena}
                    placeholder='Contraseña' 
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    style={styles.input}/>
            </View>
            <TouchableOpacity
                disabled={!Boolean(NombreUsuario && Contrasena)}
                style={styles.Boton}
                onPress={() => onIniciar()}
            >
                <Text style={styles.TextoBoton}>Iniciar</Text>
            </TouchableOpacity>
        </View>
    )
}

const PantallaWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#EA3805',
        height: '100%'
    },
    logo:{
        width:'70%',
        maxWidth: 300,
        maxHeight: 200,
        marginVertical: 5,
    },
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#D9D9D9',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 0.2,
        marginBottom: 5,
        marginTop: 5,
    },
    input: {
        color: 'black',
    },
    Boton: {
        width: PantallaWidth * 0.3,
        backgroundColor: '#1A56DF',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    TextoBoton:{
        fontSize: 15,
        color: 'white'
    }
})

export default PantallaSesion