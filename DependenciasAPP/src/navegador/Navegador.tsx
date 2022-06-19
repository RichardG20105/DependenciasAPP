import React, { useEffect, useRef } from 'react'
import PantallaMapa from '../paginas/PantallaMapa';
import PantallaFavoritos from '../paginas/PantallaFavoritos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PantallaInicio from '../paginas/PantallaInicio';
import PantallaUsuario from '../paginas/PantallaUsuario';
import { StyleSheet, TouchableOpacity, View, } from 'react-native';

import * as Animatable from 'react-native-animatable'

const TabArr = [
  { label: 'Inicio', type: Icon, icon: 'home', route: 'Home', component: PantallaInicio},
  { label: 'Mapa', type: Icon, icon: 'location', route: 'PantallaMapa', component: PantallaMapa},
  { label: 'Favoritos', type: Icon, icon: 'heart', route:'PantallaFavoritos', component: PantallaFavoritos},
  { label: 'Cuenta', type: Icon, icon: 'person', route: 'Usuario', component: PantallaUsuario},
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -17 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }



const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={styles.container}>
        <Animatable.View
          ref={viewRef}
          duration={1000}
          style={styles.container}>
          <View style={styles.btn}>
            <Animatable.View
              ref={circleRef}
              style={styles.circle} />
            <Icon name={item.icon} color={focused ? 'white' : '#43699C'} size={30}/>
          </View>
          <Animatable.Text
            ref={textRef}
            style={styles.text}>
            {item.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
  )
}

const Navegador = () => {

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
    }}
    >
      {TabArr.map((item, index) =>{
          return(
              <Tab.Screen key={index} name={item.route} component={item.component}
                  options={{
                    
                    tabBarShowLabel: false,
                    tabBarButton: (props) => <TabButton {...props} item={item} />
                    
                  }}
              />
          )
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 3,
    right: 13,
    left: 13,
    borderRadius: 18,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#43699C',
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#43699C',
    fontWeight: 'bold',
  }
})

export default Navegador