import { DependenciasApi, BaseURL } from "../api/Apis"
import {useEffect, useState} from 'react';
import { Dependencia, TipoDependencia } from '../interfaces/appinterfaces';

export const DependenciaUso = () => {

    const [Dependencias,setDependencias] = useState<Dependencia[]>([]);
    const [Dependencia, setDependencia] = useState<Dependencia>();

    const [TiposDependencia, setTiposDependencia] = useState<TipoDependencia[]>([])
    
    
    const CargarDependencias = async() => {
        try {
            const resp = await DependenciasApi.get<Dependencia[]>(BaseURL+'/Dependencia/Listado');
            setDependencias(resp.data);
        } catch (error) {
            console.log(error)
        }    
    }

    const BuscarDependencia = async (idDep:number) => {
        try {
            const resp = await DependenciasApi.get<Dependencia>(BaseURL+'/Dependencia/ID/'+idDep);
            setDependencia(resp.data);
        } catch (error) {
            console.log(error)
        }
    }

    const CargarTiposDependencia = async () => {
        try {
            const resp = await DependenciasApi.get<TipoDependencia[]>(BaseURL+'/TipoDependencia/Listado')
            setTiposDependencia(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        CargarDependencias();
        /* CargarTiposDependencia */
    }, [])

    return{
        Dependencias,
        Dependencia,
        TiposDependencia,
        BuscarDependencia,
    }
}