import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View, 
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert} from 'react-native'
    import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
    import FontAwesome from 'react-native-vector-icons/FontAwesome'
    import Feather from 'react-native-vector-icons/Feather'
import {images, icons} from '../../constants'
import { UsuarioUso } from '../hooks/UsuarioUso'
import { Usuario } from '../interfaces/appinterfaces';
import { useFocusEffect } from '@react-navigation/native';

export const PantallaModificarUsuario = ({navigation}:any) => {

    function renderHeader(){
        return(
            <View style={{ flexDirection:'row', paddingTop: 15, paddingBottom: 7}}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: 10 * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            right: 10,
                            width: 35,
                            height: 35
                        }}
                    />
                </TouchableOpacity>

                <View 
                    style={{
                        flex: 1,
                        paddingRight: 16 * 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 20 * 3,
                            borderRadius: 30,
                            backgroundColor: "white"
                        }}
                    >
                        <Text 
                            style={{
                                    fontFamily: "Roboto-Bold", 
                                    fontSize: 20, 
                                    lineHeight: 22, 
                                    color:"black"   
                            }}
                        >
                            Editar Perfil
                        </Text>
                    </View>
                </View>
            </View>
        )        
    }
    
    function renderProfile(){
        const {UsuarioInfo, InformacionUsuario, ModificarUsuario} = UsuarioUso();
        
        const [Nombres, setNombres] = useState('')
        const [Apellidos, setApellidos] = useState('')
        const [Usuario, setUsuario] = useState('')
        const [Contrasena, setContrasena] = useState('')
        const [Genero, setGenero] = useState('')
        const [Ciudad, setCiudad] = useState('')
        const [Correo, setCorreo] = useState('')
        const [Telefono, setTelefono] = useState('')

        const [EstadoContrasena, setEstadoContrasena] = useState(true)
        const [EstadoGeneroM, setEstadoGeneroM] = useState(false)
        const [EstadoGeneroF, setEstadoGeneroF] = useState(false)

        const Guardar = () => {
            if(UsuarioInfo != null){
                const User: Usuario = {
                    idUsuario: UsuarioInfo.idUsuario,
                    usuario: VerificarDatos(Usuario,UsuarioInfo.usuario),
                    contrasena: VerificarDatos(Contrasena,UsuarioInfo.contrasena),
                    nombres: VerificarDatos(Nombres,UsuarioInfo.nombres),
                    apellidos: VerificarDatos(Apellidos,UsuarioInfo.apellidos),
                    genero: VerificarDatos(Genero, UsuarioInfo.genero),
                    ciudad: VerificarDatos(Ciudad,UsuarioInfo.ciudad),
                    telefono: VerificarDatos(Telefono,UsuarioInfo.telefono),
                    correo: VerificarDatos(Correo,UsuarioInfo.correo)
                }

                Alert.alert('Modificar Datos','¿Desea Modificar los Datos?',[
                    {text: 'Cancelar'},
                    {text: 'Aceptar',
                        onPress: () => {if(ValidarCampos(User)){ModificarUsuario(User),navigation.goBack()}}
                    }
                ])
            }
        }

        const VerificarDatos = (dato1:any,dato2:any) => {
            if(dato1 != ''){
                return dato1
            }
            return dato2
        }

        const ValidarCampos = (User:Usuario) => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
            if(User.contrasena.length < 8){
                Alert.alert('Error','La contraseña debe tener como minimo 8 caracteres',[{text: 'Aceptar'}])
                return false;
            }
            if(reg.test(User.correo) === false){
                Alert.alert('Error','El correo ingresado es incorrecto',[{text: 'Aceptar'}])
                return false;
            }
            if(User.genero === ''){
                Alert.alert('Error','Debe seleccionar un Genero',[{text: 'Aceptar'}])
                return false;
            }
            return true;
        }

        const CambiarEstadoContrasena = () => {
            if(EstadoContrasena){
                setEstadoContrasena(false)
            }else{
                setEstadoContrasena(true)
            }
        }
        
        useEffect(() => {
            InformacionUsuario();
        }, [])

        useFocusEffect(
            useCallback(
              () => {
                if(UsuarioInfo?.genero === 'Masculino'){
                    setEstadoGeneroM(true),setEstadoGeneroF(false)
                }else{
                    setEstadoGeneroF(true), setEstadoGeneroM(false)
                }
              },
              [UsuarioInfo],
            )
        )

        return(
            <ScrollView style={{backgroundColor: '#red'}}>
                <View style={styles.container}>
                    <Image 
                        style={styles.bgimagen} 
                        source={images.avatar_2}
                    />
                <View style={styles.bottomContainer}>
                    <Image
                        style={styles.profile}
                        source={UsuarioInfo?.genero === 'Masculino' ?images.avatar_3 :images.avatar_6}
                    />

                    <View style={styles.action}>
                        <FontAwesome name="vcard" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                        <TextInput
                            defaultValue={UsuarioInfo?.nombres}
                            onChangeText={setNombres}
                            placeholder= 'Nombre'
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>

               <View style={styles.action}>
                   <FontAwesome name="vcard" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                    <TextInput
                        defaultValue={UsuarioInfo?.apellidos}
                        onChangeText={setApellidos}
                        placeholder= 'Apellido'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
               </View>

               <View style={styles.action}>
                   <FontAwesome name="user" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                    <TextInput
                        defaultValue={UsuarioInfo?.usuario}
                        onChangeText={setUsuario}
                        placeholder= 'Usuario'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
               </View>

               <View style={styles.action}>
                   <FontAwesome name="unlock" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                    <TextInput
                        defaultValue={UsuarioInfo?.contrasena}
                        onChangeText={setContrasena}
                        placeholder= 'Contraseña'
                        placeholderTextColor="#666666"
                        secureTextEntry={EstadoContrasena}
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                    <TouchableOpacity onPress={() => CambiarEstadoContrasena()}><Icon name={EstadoContrasena ?"eye-off" :'eye'} color={'black'} size={26} style={{paddingRight: 10, paddingTop: 5}} /></TouchableOpacity>
               </View>

               <View style={styles.action}>
                   <FontAwesome name="phone" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                    <TextInput 
                        defaultValue={UsuarioInfo?.telefono}
                        onChangeText={setTelefono}
                        placeholder= 'Telefono'
                        placeholderTextColor="#666666"
                        keyboardType='number-pad'
                        autoCorrect={false}
                        style={styles.textInput}
                    />
               </View>

               <View style={styles.action}>
                   <FontAwesome name="envelope" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                    <TextInput 
                        defaultValue={UsuarioInfo?.correo}
                        onChangeText={setCorreo}
                        placeholder= 'Correo Electrónico'
                        placeholderTextColor="#666666"
                        keyboardType= 'email-address'
                        autoCorrect={false}
                        style={styles.textInput}
                    />
               </View>

               <View style={styles.action}>
                   <Icon name="map-marker" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                    <TextInput 
                        defaultValue={UsuarioInfo?.ciudad}
                        onChangeText={setCiudad}
                        placeholder= 'Ciudad'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
               </View>

               <View style={styles.action}>
               <Text style={styles.textInput}>Genero</Text> 
                <TouchableOpacity style={styles.botonGenero} onPress={() => {setEstadoGeneroM(true), setEstadoGeneroF(false), setGenero('Masculino')}}>
                <FontAwesome
                    name= "male"
                    color= {EstadoGeneroM ?"#273E5C" :"white"}
                    size= {30}
                />
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonGenero} onPress={() => {setEstadoGeneroF(true), setEstadoGeneroM(false), setGenero('Femenino')}}>
                <FontAwesome
                    name= "female"
                    color= {EstadoGeneroF ?"#273E5C" :"white"}
                    size= {30}
                />
                </TouchableOpacity>
               </View>

                <TouchableOpacity style={styles.commandButton} onPress={() => {Guardar()}}>
                    <Text style={styles.panelButtonTitle}>Guardar</Text>
                </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
        )
    }
    
    return (
        
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderProfile()}
        </SafeAreaView>
    )
}

const {width,height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6EEF9"
    },
    bgimagen: {
       flex: 1,
       position: 'absolute',
       width: '100%',
       height: '100%',
       justifyContent: 'center',
    },
    commandButton: {
        paddingBottom: 15,
        paddingHorizontal: 75,
        borderRadius: 10, 
        backgroundColor: '#273E5C',
        alignItems: 'center',
        marginBottom: 10,
    },

    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    
    panelButtonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
    },
    
    action: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#737373',
        top: -50
    },
    
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: 'black',
        fontSize: 18,
    },

    bottomContainer: {
        marginTop: '25%',
        height: "90%",
        width: "100%",
        backgroundColor: '#E6EEF9',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        alignItems: 'center',
        marginBottom: "18%"
    },

    profile: {
        height: 150,
        width: 150,
        borderRadius: 80,
        bottom: "12%",
        backgroundColor: 'white'
    },
    botonGenero:{
        backgroundColor: '#8A979F',
        marginLeft: 20,
        width: 40,
        height: 40,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 20,
        right: 200,
        marginBottom: 10
    }
});