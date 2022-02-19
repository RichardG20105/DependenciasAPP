import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PantallaCarga from '../paginas/PantallaCarga';
import PantallaMapa from '../paginas/PantallaMapa';
import { ContextoPermiso, EstadoPermiso, ProveedorPermisos } from '../contexto/ContextoPermisos';
import { PantallaFavoritos } from '../paginas/PantallaFavoritos';
import { PantallaUsuario } from '../paginas/PantallaUsuario';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fab } from '../componentes/Fab';
import Icon from 'react-native-vector-icons/Ionicons';
import PantallaInicio from '../paginas/PantallaInicio';

const Tab = createBottomTabNavigator();

export const Navegador = () => {

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: '#3556C4'},
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarInactiveBackgroundColor:'#3556C4',
      tabBarActiveBackgroundColor: '#21C437',
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
  );
}