import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Navegador from './src/navegador/Navegador';
import { ProveedorPermisos } from './src/contexto/ContextoPermisos';
import { ActivityIndicator, Image, LogBox, Text, View, StyleSheet, Dimensions } from 'react-native';
import { ProovedorSesion } from './src/contexto/ContextoSesion';
import SplashScreen from 'react-native-splash-screen';
import { DependenciaUso } from './src/hooks/DependendeciasUso';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const {width,height} = Dimensions.get('window')
const EstadoApp = ({ children}:any)=>{
  return (
      <ProveedorPermisos>
          {children}
      </ProveedorPermisos>
  )
}

const App = () => {
  const [EstadoCarga, setEstadoCarga] = useState(false)
  const {Recomendados} = DependenciaUso()
  
  useEffect(() => {
    setTimeout(() =>{setEstadoCarga(false)},1500)
  }, [EstadoCarga])

  useEffect(() => {
    SplashScreen.hide()
    setEstadoCarga(true)
  }, [Recomendados])
  
  return (
    <NavigationContainer>
      <EstadoApp>
        <ProovedorSesion>
          {!EstadoCarga && <Navegador/>}
      
          { EstadoCarga && 
            <View style ={{height: height, backgroundColor: 'black'}}>
              <View style={{top: width * 0.7}}>
                <Image style={{width: 100, height: 150, left:width*0.35, marginBottom: 10}} source={require('./src/assets/InicioSesion/LogoSesion.png')} resizeMode={'stretch'}/>
                <Text style={style.TextoCarga}>LODES - ESPOCH</Text>
                <ActivityIndicator
                  size={50}
                  color='#273E5C'
                />
              </View>
            </View>
          }
        </ProovedorSesion>
      </EstadoApp>
    </NavigationContainer>
  ) 
}

const style = StyleSheet.create({
  
  TextoCarga: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingBottom: 20
}
})
export default App;
