export const getIconoInicio = (id:number) => {
    let path = '../assets/Categorias/'
    switch(id){
        case 1:
            return require(path+'auditorio.png')
        case 2:
            return require(path+'servicioh.png')
        case 3:
            return require(path+'estadio.png')
        case 4: 
            return require(path+'cancha.png');
        case 5:
            return require(path+'parqueadero.png')
        case 6:
            return require(path+'edificio-de-oficinas.png')
        case 7:
            return require(path + 'biblioteca.png')
        case 8:
            return require(path + 'cafeteria.png')
        case 9:
            return require(path+'edificio-de-oficinas.png')
        case 10:
            return require(path + 'piscina.png')
        case 11:
            return require(path + 'coliseo.png')
        case 12:
            return require(path + 'gimnasio.png')
        case 13:
            return require(path + 'unidad-academica.png')
        case 14:
            return require(path + 'centro-medico.png')            
        default:
            return
    }
}

export const getIconoMapa = (id:number) => {
    let path = '../assets/MapPins/'
    switch(id){
        case 1:
            return require(path+'Auditorio.png')
        case 2:
            return require(path+'Baño.png')
        case 3:
            return require(path+'Estadio.png')
        case 4:
            return require(path+'Cancha.png');
        case 5:
            return require(path+'Parqueadero.png')
        case 6:
            return require(path+'Facultad.png')
        case 7:
            return require(path+'Biblioteca.png')
        case 8:
            return require(path+'Cafeteria.png')
        case 9:
            return require(path+'Administrativo.png')
        case 10:
            return require(path+'Piscina.png')
        case 11:
            return require(path+'Coliseo.png')
        case 12:
            return require(path+'Gimnasio.png')
        case 13:
            return require(path+'UnidadAcademica.png')
        case 14:
            return require(path+'CentroMedico.png')
        default:
            return require(path+'Pin.png')
            
    }
}

export const getColorLetras = (id:number) => {
    switch(id){
        case 1:
            return '#7c2424'
        case 2:
            return '#0c7c8c'
        case 3:
            return '#3c8c04'
        case 4:
            return '#6c7454'
        case 5:
            return '#0434bc'
        case 6:
            return '#641c0c'
        case 7:
            return '#e4c404'
        case 8:
            return '#543404'
        case 9:
            return '#4c4c4c'
        default:
            return '#d40404'
    }
}

export const getTipoDependencias = (id: number) => {
    switch(id){
        case 1:
            return 'Auditorio'
        case 2:
            return 'Baño'
        case 3:
            return 'Estadio'
        case 4:
            return 'Cancha'
        case 5:
            return 'Parqueadero'
        case 6:
            return 'Facultad'
        case 7:
            return 'Biblioteca'
        case 8:
            return 'Cafeteria'
        case 9:
            return 'Administrativo'
        case 10:
            return 'Piscina'
        case 11:
            return 'Coliseo'
        case 12:
            return 'Gimnasio'
        case 13:
            return 'Unidad Academica'
        case 14:
            return 'Centro Médico'
        default:
            return ''
    }
} 