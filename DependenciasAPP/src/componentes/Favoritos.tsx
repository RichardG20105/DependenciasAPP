import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { Boton } from './Boton'
import { UsuarioUso } from '../hooks/UsuarioUso';
import { ContextoSesion } from '../contexto/ContextoSesion';

const Favoritos = () => {
  const {CerrarSesion} = UsuarioUso()

  const Cerrar =  () => {
    CerrarSesion()
  }
  return (
    <View>
      <Boton title='Cerrar Sesión' onPress={Cerrar}/>
    </View>
  )
}

export default Favoritos