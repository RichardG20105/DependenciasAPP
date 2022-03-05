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
            return require(path+'cafeteria.png')
            break;
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
            break;
        case 2:
            return require(path+'Baño.png')
            break;
        case 3:
            return require(path+'Estadio.png')
            break;
        case 4: 
            return require(path+'Cancha.png');
            break;
        case 5:
            return require(path+'Parqueadero.png')
            break;
        default:
            return
            break;
    }
}