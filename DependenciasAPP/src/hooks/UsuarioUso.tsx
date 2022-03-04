import { Usuario } from '../interfaces/appinterfaces';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis from '../api/Apis';
import axios from 'axios';

export const UsuarioUso = () => {    


    const {Token, BaseURL, DependenciasApi, getToken } = Apis();

    const [UsuarioInfo, setUsuarioInfo] = useState<Usuario>()

    const IniciarSesion = async(usuario: Usuario) =>{
        try{
            const resp = await DependenciasApi.post(BaseURL+'/Usuario/Sesion',usuario);
            AsyncStorage.setItem('Token',resp.data)
            AsyncStorage.setItem('Usuario',usuario.usuario)
            AsyncStorage.setItem('Contrasena',usuario.contrasena)
        }catch (error) {
            console.log(error)
        }
    }

    const InformacionUsuario = async() => {
        const tok = await AsyncStorage.getItem('Token')
        const usuario = await AsyncStorage.getItem('Usuario') 
        const contra = await AsyncStorage.getItem('Contrasena')
        const config = {
            headers: { Authorization: `${tok}`}
        }

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
            console.log(error.request.status)
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
        ModificarUsuario
    }
}

