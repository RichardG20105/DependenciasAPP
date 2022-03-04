import React, {useEffect, useState,useRef} from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View, 
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Animated } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/Ionicons';
import {images, icons} from '../../constants'
import { BaseURL } from '../api/Apis';
import { DependenciaUso } from '../hooks/DependendeciasUso';

const BuscadorDependencias = ({navigation}:any) => {

    const {Dependencias, DependenciasSugerida, BuscarDependenciaSugerida} = DependenciaUso()
    const [BuscadorVacio,setBuscadorVacio] = useState(true)
   
    const Buscar = (texto:string) => {
        if(texto === ''){
            setBuscadorVacio(true)
        }else{
            BuscarDependenciaSugerida(texto)
            setBuscadorVacio(false)
        }
    }
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar
            translucent = {false}
            backgroundColor= "white"
            barStyle= "dark-content"
            />
        <View style={styles.container}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder='Buscar Dependencia'
                    style={styles.textImput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor= '#ABB2B9'
                    onChangeText={(text) => Buscar(text)}
                />
                <Icon
                    name="search-outline"
                    color= "grey"
                    size= { 25 }
                    style={{left: 33}}
                />
            </View>   
            <View>
            { !BuscadorVacio
             ?<FlatList
                data={DependenciasSugerida}
                keyExtractor={item => `${item.idDependencia}`}
                renderItem = { ({item}) => {
                    return (
                       <ScrollView>
                           <TouchableOpacity
                            onPress={() => navigation.navigate('Dependencia',{idDependencia: item.idDependencia})}
                           >
                           <View style={styles.itemContainer}>
                                { (item?.fotos.length != 0)
                                    ?<Image style={styles.image} source={{uri: `${BaseURL}/imagenes/${item?.fotos[0].nombreFoto}`}}/>
                                    :<Image style={styles.image} source={require('../assets/ImageNotFound.png')}/>
                                }
                                <View>
                                <Text style={styles.textname}>{item.nombreDependencia}</Text>
                                <Text style={styles.textlocation}>{item.descripcionDependencia}</Text>
                                </View>
                           </View>
                           </TouchableOpacity>
                       </ScrollView>
                    )
                }}
                contentContainerStyle={{ paddingVertical: 7 * 2 }}
                />
                : <View/>
            }
            </View>         
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor:'white',
    },

    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 50,
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    textDependencias: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10,
        color:'black'
    },

    textImput: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        top: 1,
        right: 33
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
});

export default BuscadorDependencias