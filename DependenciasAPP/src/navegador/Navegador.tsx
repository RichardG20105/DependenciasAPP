import React from 'react'
import PantallaMapa from '../paginas/PantallaMapa';
import PantallaFavoritos from '../paginas/PantallaFavoritos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PantallaInicio from '../paginas/PantallaInicio';
import PantallaUsuario from '../paginas/PantallaUsuario';

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
      <Tab.Screen name='Home' component={PantallaInicio}
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
       <Tab.Screen name='PantallaFavoritos' component={PantallaFavoritos}
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