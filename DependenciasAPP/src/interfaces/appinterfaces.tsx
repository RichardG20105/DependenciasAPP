

export interface Localizacion{
    latitud: number;
    longitud: number;
}

export interface Dependencia{
    idDependencia:number;
    idTipoDependencia: number;
    nombreDependencia: string;
    descripcionDependencia: string;
    latitud: number;
    longitud: number;
}

export interface Foto{
    idFoto: string;
    idDependencia: number;
    nombreFoto: string;
}