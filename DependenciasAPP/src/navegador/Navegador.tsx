import React, { useEffect } from 'react'
import PantallaMapa from '../paginas/PantallaMapa';
import PantallaFavoritos from '../paginas/PantallaFavoritos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PantallaInicio from '../paginas/PantallaInicio';
import PantallaUsuario from '../paginas/PantallaUsuario';
import { Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window')

export const Navegador = ({props}:any) => {

  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarStyle:{height: 60,width: width,borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor:'#3498DB',position: 'absolute'},
      tabBarActiveTintColor: '#FF6347',
      tabBarInactiveTintColor: 'white',
      tabBarShowLabel: false,
      headerShown: false,
    }
  }
    >
      <Tab.Screen name='Home' component={PantallaInicio}
        options={{
          tabBarIcon: (props) => (
            <Icon name='home' size={30} color={props.color}/>
          ),
        }}
      />
        <Tab.Screen name='PantallaMapa' component={PantallaMapa}
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
          )
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