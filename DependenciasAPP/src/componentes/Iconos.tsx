export const getIconoInicio = (id:number) => {
    let path = '../assets/Categorias/'
    switch(id){
        case 1:
            return require(path+'auditorio.png')
            break;
        case 2:
            return require(path+'servicioh.png')
            break;
        case 3:
            return require(path+'estadio.png')
            break;
        case 4: 
            return require(path+'cancha.png');
            break;
        case 5:
            return require(path+'parqueadero.png')
            break;
        case 6:
            return require(path+'edificio-de-oficinas.png')
            break;
        case 7:
            return require(path + 'biblioteca.png')
            break
        case 8:
            return require(path + 'cafeteria.png')
            break
        case 9:
            return require(path + 'edificio-de-oficinas.png')
            break
        default:
            return
            break;
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
            break;
        case 2:
            return '#0c7c8c'
            break;
        case 3:
            return '#3c8c04'
            break;
        case 4:
            return '#6c7454'
            break;
        case 5:
            return '#0434bc'
            break;
        case 6:
            return '#641c0c'
            break;
        case 7:
            return '#e4c404'
            break;
        case 8:
            return '#543404'
            break;
        case 9:
            return '#4c4c4c'
            break;
        default:
            return '#d40404'
            break;

    }
}

export const getTipoDependencias = (id: number) => {
    switch(id){
        case 1:
            return 'Auditorio'
            break;
        case 2:
            return 'Baño'
            break;
        case 3:
            return 'Estadio'
            break;
        case 4:
            return 'Cancha'
            break;
        case 5:
            return 'Parqueadero'
            break;
        case 6:
            return 'Facultad'
            break;
        case 7:
            return 'Biblioteca'
            break;
        case 8:
            return 'Cafeteria'
            break;
        case 9:
            return 'Administrativo'
            break;
        default:
            return ''
            break;
    }
} 