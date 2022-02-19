import React, { useState, useEffect } from 'react'
import { BaseURL, DependenciasApi } from '../api/Apis'
import { TipoDependencia, Dependencia } from '../interfaces/appinterfaces';

export const TiposDependenciaUso = () => {
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
