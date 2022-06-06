import { Busca, Usuario } from '../interfaces/appinterfaces';
import { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis from '../api/Apis';
import axios from 'axios';
import { Alert } from 'react-native';
import { ContextoSesion } from '../contexto/ContextoSesion';
import { request } from 'react-native-permissions';

export const UsuarioUso = () => {    


    const {BaseURL, DependenciasApi } = Apis();

    const [UsuarioInfo, setUsuarioInfo] = useState<Usuario>()

    
    const [Favoritos, setFavoritos] = useState<Busca[]>()
    
    const [FavDependencia, setFavDependencia] = useState(false)

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
        if(FavDependencia == true)
            setFavDependencia(false)
    }

    const InformacionUsuario = async() => {
        const UsuarioVacio = undefined
        setUsuarioInfo(UsuarioVacio)
        const tok = await AsyncStorage.getItem('Token')       
        if(tok != null){
            const usuario = await AsyncStorage.getItem('Usuario') 
            const contra = await AsyncStorage.getItem('Contrasena')

            const config = {
                headers: { Authorization: `${tok}`}
            }

            const URL = BaseURL + '/Usuario/Info'
            const Body = {
                "usuario": usuario,
                "contrasena": contra,
            }
            axios.post(URL,Body,config).then((resp) => {
                setUsuarioInfo(resp.data)
            }).catch((error) => {
                if(error.request.status === 401){
                    ReinicioSesion()
                }
            })
        }
    }    

    const ModificarUsuario = async(UsuarioModificar: Usuario) => {
        const UsuarioVacio = undefined
        setUsuarioInfo(UsuarioVacio)
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
                ReinicioSesion()
            }
        });
        
    }

    const EliminarCuenta =async () => {
        console.log(UsuarioInfo)
        const UsuarioVacio = undefined
        const tok = await AsyncStorage.getItem('Token')
        const config = {
            headers:{Authorization:`${tok}`}
        }
        const URL = BaseURL + '/Usuario/Eliminar/'+UsuarioInfo?.idUsuario

        axios.delete(URL, config).then((resp) => {
            Alert.alert('Cuenta','Se elimino la cuenta exitosamente.',[{text:'Aceptar'}])
            setUsuarioInfo(UsuarioVacio)
            CerrarSesion()
        }).catch((error) => {
            if(error.request.status === 401){
                ReinicioSesion()
            }
        });
    }
    const FavoritosUsuario = async() => {
        const tok = await AsyncStorage.getItem('Token')
        
        if(tok != null){
            const usuario = await AsyncStorage.getItem('Usuario')

            const config = {
                headers: {Authorization: `${tok}`}
            }

            const URL = BaseURL + '/Busca/' + `${usuario}`

            axios.get(URL,config).then((resp) => {
                setFavoritos(resp.data)
            }).catch((error) => {
                if(error.request.status === 401){
                    ReinicioSesion()
                }
                if(error.request.status === 404){
                    const Fav = undefined
                    setFavoritos(Fav)
                }
            })
        }
    }

    const DependenciaFavorito = async(IdDependencia: number) => {
        const tok = await AsyncStorage.getItem('Token')
        
        if(tok != null){
            const usuario = await AsyncStorage.getItem('Usuario')

            const config = {
                headers: {Authorization: `${tok}`}
            }

            const URL = BaseURL + '/Busca/Favorito/' + `${usuario}` + '/' + IdDependencia

            axios.get(URL,config).then((resp) => {
                setFavDependencia(resp.data)
            }).catch((error) => {
                console.log(error)
                if(error.request.status === 401){
                    ReinicioSesion()
                }else{
                    console.log(error)
                }
            })
        }
    }

    const AgregarFavorito = async(IdDependencia: number) => {
        const tok = await AsyncStorage.getItem('Token')
        
        if(tok != null){
            const usuario = await AsyncStorage.getItem('Usuario')

            const config = {
                headers: {Authorization: `${tok}`}
            }

            const URL = BaseURL + '/Busca/AgregarFavorito/' + `${usuario}` + '/' + IdDependencia

            axios.get(URL,config).then((resp) => {
                setFavDependencia(true)
            }).catch((error) => {
                console.log(error)
                if(error.request.status === 401){
                    ReinicioSesion()
                }else{
                    console.log(error)
                }
            })
        }
    }

    const EliminarFavorito = async(IdDependencia: number) => {
        const tok = await AsyncStorage.getItem('Token')
        
        if(tok != null){
            const usuario = await AsyncStorage.getItem('Usuario')

            const config = {
                headers: {Authorization: `${tok}`}
            }

            const URL = BaseURL + '/Busca/EliminarFavorito/' + `${usuario}` + '/' + IdDependencia

            axios.delete(URL,config).then((resp) => {
                setFavDependencia(false)
            }).catch((error) => {
                console.log(error)
                if(error.request.status === 401){
                    CerrarSesion()
                }else{
                    console.log(error)
                }
            })
        }
    }

    const ReinicioSesion = async() => {
        const usuario = await AsyncStorage.getItem('Usuario') 
        const contra = await AsyncStorage.getItem('Contrasena')

        if(usuario != null && contra != null){
            
            const Usuario: Usuario = {
                idUsuario: 0,
                nombres: '',
                apellidos: '',
                usuario: usuario,
                contrasena: contra,
                genero: '',
                ciudad: '',
                telefono: '',
                correo: ''
            }
            IniciarSesion(Usuario)
        }
    }

    return {
        UsuarioInfo,
        Favoritos,
        FavDependencia,
        setUsuarioInfo,
        IniciarSesion,
        InformacionUsuario,
        ModificarUsuario,
        CerrarSesion,
        EliminarCuenta,
        FavoritosUsuario,
        DependenciaFavorito,
        AgregarFavorito,
        EliminarFavorito,
    }
}

