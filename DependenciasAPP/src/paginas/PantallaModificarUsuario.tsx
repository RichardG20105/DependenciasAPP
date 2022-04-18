import React, { useEffect, useState } from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View, 
    Text,
    TextInput,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions} from 'react-native'
    import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
    import FontAwesome from 'react-native-vector-icons/FontAwesome'
    import Feather from 'react-native-vector-icons/Feather'
import {images, icons} from '../../constants'
import { UsuarioUso } from '../hooks/UsuarioUso'
import { Usuario } from '../interfaces/appinterfaces';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


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
                            width: 25,
                            height: 25
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
                            backgroundColor: "#EFEFF1"
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
        const [Ciudad, setCiudad] = useState('')
        const [Correo, setCorreo] = useState('')
        const [Telefono, setTelefono] = useState('')

        const [EstadoContrasena, setEstadoContrasena] = useState(true)

        const Guardar = () => {
            if(UsuarioInfo != null){
                const User: Usuario = {
                    idUsuario: UsuarioInfo.idUsuario,
                    usuario: VerificarDatos(Usuario,UsuarioInfo.usuario),
                    contrasena: VerificarDatos(Contrasena,UsuarioInfo.contrasena),
                    nombres: VerificarDatos(Nombres,UsuarioInfo.nombres),
                    apellidos: VerificarDatos(Apellidos,UsuarioInfo.apellidos),
                    ciudad: VerificarDatos(Ciudad,UsuarioInfo.ciudad),
                    telefono: VerificarDatos(Telefono,UsuarioInfo.telefono),
                    correo: VerificarDatos(Correo,UsuarioInfo.correo)
                }
                ModificarUsuario(User)
                
                navigation.goBack()
            }
        }

        const VerificarDatos = (dato1:any,dato2:any) => {
            if(dato1 != ''){
                return dato1
            }
            return dato2
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
        return(
            <ScrollView style={{backgroundColor: '#bbe3ed'}}>
                <View style={styles.container}>
                <Image 
                style={styles.bgimagen} 
                source={images.avatar_2}
                />
            <View style={styles.bottomContainer}>
               <Image
                    style={styles.profile}
                    source={images.avatar_3}
               />

               <View style={styles.action}>
                   <FontAwesome name="user-o" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
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
                   <FontAwesome name="user-o" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
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
                   <FontAwesome name="user-o" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
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
                   <FontAwesome name="user-o" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
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
                   <Feather name="phone" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
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
                   <FontAwesome name="envelope-o" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
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
                   <Icon name="map-marker-outline" color="black" size={20} style={{paddingLeft: 15, paddingTop: 12}}/>
                    <TextInput 
                        defaultValue={UsuarioInfo?.ciudad}
                        onChangeText={setCiudad}
                        placeholder= 'Ciudad'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
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
            <StatusBar
            translucent = {false}
            backgroundColor= "white"
            barStyle= "dark-content"
            />
            {renderHeader()}
            {renderProfile()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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
        paddingHorizontal: 100,
        borderRadius: 10, 
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
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
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
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
        color: '#05375a',
        fontSize: 18,
    },

    bottomContainer: {
        marginTop: "25%",
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
});