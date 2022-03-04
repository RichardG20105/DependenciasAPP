import axios from 'axios';
import {useEffect, useState} from 'react';
import Apis from '../api/Apis';
import { Dependencia, TipoDependencia } from '../interfaces/appinterfaces';

export const DependenciaUso = () => {
    const {Token, DependenciasApi, BaseURL} = Apis();
    const [Dependencias,setDependencias] = useState<Dependencia[]>([]);
    const [Dependencia, setDependencia] = useState<Dependencia>();

    const [DependenciasSugerida,setDependenciasSugerida] = useState<Dependencia[]>([]);
    
    const [Recomendados, setRecomendados] = useState<Dependencia[]>([])

    const CargarDependencias = async() => {
        try {
            const resp = await DependenciasApi.get<Dependencia[]>(BaseURL+'/Dependencia/Listado');
            setDependencias(resp.data);
        } catch (error) {
            console.log(error);
        }    
    }

    const CargarRecomendados = async() => {
        try{
            const resp = await DependenciasApi.get<Dependencia[]>(BaseURL + '/Dependencia/Recomendados');
            setRecomendados(resp.data);
        } catch (error) {
            console.log(error);
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
        CargarRecomendados();
    }, [])

    return{
        Dependencias,
        Dependencia,
        Recomendados,
        DependenciasSugerida,
        BuscarDependencia,
        BuscarDependenciaSugerida,
        CargarDependencias,
    }
}