import { DependenciasApi, FotosApi } from "../api/Apis"
import {useEffect, useState} from 'react';
import { Dependencia, Foto } from "../interfaces/appinterfaces";

export const DependenciaUso = () => {
    
    const BaseURL = 'http://192.168.1.14:8080'

    const [Dependencias,setDependencias] = useState<Dependencia[]>([]);
    const [Fotos, setFotos] = useState<Foto[]>([]);
    
    const CargarDependencias = async() => {
        try {
            const resp = await DependenciasApi.get<Dependencia[]>(BaseURL+'/Dependencia/Listado');
            setDependencias(resp.data);
        } catch (error) {
            console.log(error)
        }
    }

    const FotoDependencias = async(idDep:number) => {
        try {
            const resp = await FotosApi.get<Foto[]>(BaseURL+'/Foto/'+idDep)
            setFotos(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        CargarDependencias();
    }, [])
    return{
        Dependencias,
        Fotos,
        FotoDependencias
    }
}