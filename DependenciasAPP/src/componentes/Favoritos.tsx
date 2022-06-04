import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { UsuarioUso } from '../hooks/UsuarioUso';
import { useIsFocused } from '@react-navigation/native';
import { BaseURL } from '../api/Apis';

const Favoritos = ({navigation}:any) => {
  const {Favoritos, FavoritosUsuario} = UsuarioUso();

  const isFocus = useIsFocused()

  useEffect(() => {
    FavoritosUsuario()
  }, [isFocus])
  
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection:'row', paddingTop: 15, paddingBottom: 15 }}>
                <View 
                    style={{
                        flex: 1,
                        marginHorizontal: 15,
                        marginRight: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
            <View
              style={{
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                            paddingHorizontal: 40,
                            borderRadius: 30,
                            backgroundColor: "#EFEFF1"
                        }}
            >
              <Text style={{fontFamily: "Roboto-Bold",fontSize: 18, lineHeight: 22, color:"black"}}>Favoritos</Text>
            </View>
        </View>
      </View>
      <View>
        { Favoritos && <FlatList
          data={Favoritos}
          keyExtractor={(item) => `${item.idBusca}`}
          renderItem = {({item}) => {
              return (
                <ScrollView>
                  <TouchableOpacity onPress={() => navigation.navigate('ComponenteDependencias',{idDependencia: item.dependencias.idDependencia})}>
                  <View style={styles.itemContainer}>
                      { (item.dependencias.fotos.length != 0)
                        ?<Image style={styles.image} source={{uri: `${BaseURL}/imagenes/${item.dependencias.fotos[0].nombreFoto}`}}/>
                        :<Image style={styles.image} source={require('../assets/ImageNotFound.png')}/>
                      }
                      <View>
                        <Text style={styles.textname}>{item.dependencias.nombreDependencia}</Text>
                        <Text style={styles.textlocation}>{item.dependencias.descripcionDependencia}</Text>
                      </View>
                    </View>  
                  </TouchableOpacity>
                  </ScrollView>
              )
          }}
          contentContainerStyle={{ paddingVertical: 7 * 2}}
        ></FlatList> ||
          <Text style={styles.textoNoFavoritos}>No existen Favoritos</Text>
        }
      </View>
    </View>
  )
}

const PantallaWidth = Dimensions.get('window').width
const PantallaHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    width: PantallaWidth,
    height: PantallaHeight,
    backgroundColor: 'white'
},
  itemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
    marginTop: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 20,
    shadowOffset:{
      width: 1,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 50,
},
image: {
    width: 50,
    height: 50,
    borderRadius: 25,
},
textname: {
  fontSize: 15,
  marginLeft: 10,
  fontWeight: "600",
  color: 'black',
},
textlocation: {
  fontSize: 12,
  marginLeft: 10,
  color: 'grey',
},
textoNoFavoritos: {
  color: 'black', 
  fontSize: 30,
  fontWeight: '600',
  width: '74%', 
  position: 'absolute', 
  top: 250, 
  left: 55,
  opacity: .5
}
})
export default Favoritos