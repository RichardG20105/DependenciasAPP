import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { UsuarioUso } from '../hooks/UsuarioUso';
import { useIsFocused } from '@react-navigation/native';
import { BaseURL } from '../api/Apis';
import { Icon } from 'react-native-vector-icons/Icon';

const {width, height} = Dimensions.get('window')
const BG_IMG = require('../assets/BgFavoritos.jpg')
const ITEM_SIZE = 70 + 20 * 3;
const Favoritos = ({navigation}:any) => {
  const {Favoritos, FavoritosUsuario} = UsuarioUso();

  const IsFocus = useIsFocused()

  useEffect(() => {
    FavoritosUsuario()
  }, [IsFocus])
  
  const scrollY = React.useRef(new Animated.Value(0)).current;


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
            source={BG_IMG}
            style={StyleSheet.absoluteFillObject}
            blurRadius={20}
            width={width}
            height={height}
        />
         { Favoritos && <Animated.FlatList
            data={Favoritos}
            onScroll={ Animated.event(
                [{ nativeEvent: {contentOffset: {y: scrollY}}}],
                { useNativeDriver: true}
            )}
            keyExtractor={(item) => `${item.idBusca}`}
            contentContainerStyle={{
              padding: 20,
              paddingTop: StatusBar.currentHeight || 42,
              paddingBottom: 87
            }}
            renderItem = {({item, index}) => {
              const inputRange = [
                  -1,
                  0,
                  ITEM_SIZE * index,
                  ITEM_SIZE * (index + 2)
              ]
              const opacityInputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + .5)
              ]

              const scale = scrollY.interpolate({
                  inputRange,
                  outputRange: [1, 1, 1, 0]
              })

              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0]
              })

              return (
                <TouchableOpacity onPress={() => navigation.navigate('ComponenteDependencias',{idDependencia: item.dependencias.idDependencia})}>
                  <Animated.View style={{flexDirection: 'row', padding: 20, marginBottom: 20, backgroundColor: 'rgba(250, 250, 250, 0.9)', borderRadius: 8,
                      shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 10,
                      },
                      shadowOpacity: .3,
                      shadowRadius: 20,
                      opacity,
                      transform: [{scale}]

                  }}>
                    
                    { (item.dependencias.fotos.length != 0)
                              ?<Image style={styles.image} source={{uri: `${BaseURL}/imagenes/${item.dependencias.fotos[0].nombreFoto}`}}/>
                              :<Image style={styles.image} source={require('../assets/ImageNotFound.png')}/>
                    }
                    <View>
                              <Text style={styles.textname}>{item.dependencias.nombreDependencia}</Text>
                              <Text style={styles.textlocation}>{item.dependencias.descripcionDependencia}</Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              )
              }}
        /> ||
        <View>
          <Text style={styles.textoNoFavoritos}>No existen Dependencias agregadas a Favoritos</Text>
          
        </View>
          }
    </View>
  )
}



const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 12, 
  },

  textname: {
    width: 260,
    fontSize: 15,
    fontWeight: "700",
    color: 'black',
  },
  
  textlocation: {
    width: 255,
    textAlign: 'justify',
    height: 50,
    fontSize: 12,
    color: 'black',
    opacity: .5,
  },
  textoNoFavoritos: {
    color: 'white', 
    fontSize: 22,
    fontWeight: '600',
    width: '74%', 
    position: 'absolute', 
    top: 350, 
    left: 61,
    opacity: .9,
    textAlign: 'center'
  }
})

export default Favoritos