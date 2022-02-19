import { DependenciasApi, BaseURL } from "../api/Apis"
import {useEffect, useState} from 'react';
import { Dependencia, TipoDependencia } from '../interfaces/appinterfaces';

export const DependenciaUso = () => {

    const [Dependencias,setDependencias] = useState<Dependencia[]>([]);
    const [Dependencia, setDependencia] = useState<Dependencia>();

    const [DependenciasSugerida,setDependenciasSugerida] = useState<Dependencia[]>([]);

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

    const BuscarDependenciaSugerida = async (nombreDependencia: string) => {
        try {
            const resp = await DependenciasApi.get<Dependencia[]>(BaseURL+'/Dependencia/Listado/'+nombreDependencia);
            setDependenciasSugerida(resp.data);
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        CargarDependencias();
    }, [])

    return{
        Dependencias,
        Dependencia,
        DependenciasSugerida,
        BuscarDependencia,
        BuscarDependenciaSugerida,
        CargarDependencias,
    }
}