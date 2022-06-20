import { useState } from 'react'
import Apis from '../api/Apis';
import { TipoDependencia } from '../interfaces/appinterfaces';

export const TiposDependenciaUso = () => {
    const {DependenciasApi, BaseURL} = Apis();
    const [TiposDependencia, setTiposDependencia] = useState<TipoDependencia[]>([])
    
    const CargarTiposDependencia = async () => {
        try {
            const resp = await DependenciasApi.get<TipoDependencia[]>(BaseURL+'/TipoDependencia/Listado')
            setTiposDependencia(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        TiposDependencia,
        CargarTiposDependencia,
    }
}
