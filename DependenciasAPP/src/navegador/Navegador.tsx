import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PantallaCarga from '../paginas/PantallaCarga';
import PantallaMapa from '../paginas/PantallaMapa';
import { ContextoPermiso, EstadoPermiso, ProveedorPermisos } from '../contexto/ContextoPermisos';
import { PantallaFavoritos } from '../paginas/PantallaFavoritos';
import { PantallaInicio } from '../paginas/PantallaInicio';
import { PantallaUsuario } from '../paginas/PantallaUsuario';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fab } from '../componentes/Fab';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


export const Navegador = () => {

  /* const { permisos} = useContext(ContextoPermiso); */


  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: '#EAECEE'},
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'grey',
      tabBarInactiveBackgroundColor:'#EAECEE',
      tabBarActiveBackgroundColor: '#127CE8',
      tabBarShowLabel: false,
      headerShown: false
    }}
    >
      <Tab.Screen name='Inicio' component={PantallaInicio}
        options={{
          tabBarIcon: (props) => (
            <Icon name='home' size={30} color={props.color}/>
          ),
        }}
      />
        <Tab.Screen name='Mapa' component={PantallaMapa}
          options={{
            tabBarIcon: (props) => (
              <Icon name='location' size={30} color={props.color}/>
            ),
          }}
        />
      <Tab.Screen name='Favoritos' component={PantallaFavoritos}
        options={{
          tabBarIcon: (props) => (
            <Icon name='heart' size={30} color={props.color}/>
          ),
        }}
      />
      <Tab.Screen name='Usuario' component={PantallaUsuario}
      options={{
        tabBarIcon: (props) => (
          <Icon name='person' size={30} color={props.color}/>
        ),
      }}
      />
    </Tab.Navigator>
    /* {/* <Stack.Navigator 
    
        screenOptions={{
            headerShown: false,
            cardStyle: {
            backgroundColor: 'green'
        }
    }}>
     
      {
        (permisos.EstadoLocalizacion === 'granted')
        ?<Stack.Screen name="Mapa" component={PantallaMapa} />
        :<Stack.Screen name="Permisos" component={PantallaPermisos} />
      }
        
    </Stack.Navigator> */
  );
}