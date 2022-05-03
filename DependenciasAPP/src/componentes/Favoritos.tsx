import React, { useEffect } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Boton } from './Boton'
import { UsuarioUso } from '../hooks/UsuarioUso';
import { useIsFocused } from '@react-navigation/native';
import { BaseURL } from '../api/Apis';

const Favoritos = ({navigation}:any) => {
  const {Favoritos, FavoritosUsuario} = UsuarioUso();

  const IsFocus = useIsFocused()

  useEffect(() => {
    FavoritosUsuario()
  }, [IsFocus])
  
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
        <FlatList
                data={Favoritos}
                keyExtractor={item => `${item.dependencias.idDependencia}`}
                renderItem = { ({item}) => {
                    return (
                      <ScrollView >
                        <TouchableOpacity onPress={() => navigation.navigate('Dependencias',{idDependencia: item.dependencias.idDependencia})}>
                        <View style={styles.itemContainer}>
                            { (item?.dependencias.fotos.length != 0)
                              ?<Image style={styles.image} source={{uri: `${BaseURL}/imagenes/${item?.dependencias.fotos[0].nombreFoto}`}}/>
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
                contentContainerStyle={{ paddingVertical: 7 * 2 }}
                />
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
  listado: {
    flex: 1,
    width: PantallaWidth * 0.95,
    height: PantallaHeight * 0.85,
  },
  item:{
    width: '94%',
    height: '10%'
  },
  itemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
    marginTop: 10,
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
})

export default Favoritos