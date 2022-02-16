
export interface Uusario{
    idUsuario: number;
    nombre: string;
    apellidos: string;
    usuario: string;
    contrasena: string;
}

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
    fotos: Foto[];
}

export interface Foto{
    idFoto: number;
    idDependencia: number;
    nombreFoto: string;
}

export interface TipoDependencia{
    idTipoDependencia: number,
    nombreTipoDependencia: string
}