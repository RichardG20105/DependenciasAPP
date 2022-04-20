import { Usuario } from '../interfaces/appinterfaces';
import { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis from '../api/Apis';
import axios from 'axios';
import { Alert } from 'react-native';
import { ContextoSesion } from '../contexto/ContextoSesion';

export const UsuarioUso = () => {    


    const {BaseURL, DependenciasApi, getToken } = Apis();

    const [UsuarioInfo, setUsuarioInfo] = useState<Usuario>()

    const {PreguntarEstadoSesion} = useContext(ContextoSesion)
    
    const IniciarSesion = async(usuario: Usuario) =>{
        try{
            const resp = await DependenciasApi.post(BaseURL+'/Usuario/Sesion',usuario);
            AsyncStorage.setItem('Token',resp.data)
            AsyncStorage.setItem('Usuario',usuario.usuario)
            AsyncStorage.setItem('Contrasena',usuario.contrasena)
        }catch (error) {
            Alert.alert('Error de Sesión','Verifique que los datos sean correctos.',[{text: 'Aceptar'}])
        }
        PreguntarEstadoSesion()
    }

    const CerrarSesion = async() => {
        AsyncStorage.removeItem('Token')
        AsyncStorage.removeItem('Usuario')
        AsyncStorage.removeItem('Contrasena')
        PreguntarEstadoSesion()
    }

    const InformacionUsuario = async() => {
        
        const tok = await AsyncStorage.getItem('Token')
        const usuario = await AsyncStorage.getItem('Usuario') 
        const contra = await AsyncStorage.getItem('Contrasena')       
        
        const config = {
            headers: { Authorization: `${tok}`}
        }

        if(tok != null){
            const URL = BaseURL + '/Usuario/Info'
            const Body = {
                "usuario": usuario,
                "contrasena":contra,
            }
            axios.post(URL,Body,config).then((resp) => {
                setUsuarioInfo(resp.data)
            }).catch((error) => {
                if(error.request.status === 401){
                    AsyncStorage.removeItem('Token')
                    getToken()
                }
            })
        }else{
            console.log('No hay token')
        }
    }    

    const ModificarUsuario = async(UsuarioModificar: Usuario) => {
        const tok = await AsyncStorage.getItem('Token')
        const config = {
            headers: { Authorization: `${tok}`}
        }

        const URL = BaseURL + '/Usuario/Actualizar/' + UsuarioModificar.idUsuario
        axios.put(URL,UsuarioModificar,config).then((resp) => {
            setUsuarioInfo(resp.data)
            AsyncStorage.setItem('Usuario',resp.data.usuario)
            AsyncStorage.setItem('Contrasena',resp.data.contrasena)
        }).catch((error) => {
            if(error.request.status === 401){
                AsyncStorage.removeItem('Token')
                getToken()
            }
        });
        
    }

    return {
        UsuarioInfo,
        setUsuarioInfo,
        IniciarSesion,
        InformacionUsuario,
        ModificarUsuario,
        CerrarSesion
    }
}

