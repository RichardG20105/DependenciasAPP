import React, {useState} from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View, 
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    ScrollView, TextInput} from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';
import { BaseURL } from '../api/Apis';
import { DependenciaUso } from '../hooks/DependendeciasUso';

import { getTipoDependencias } from './Iconos';
import { ImageBackground } from 'react-native';

const {width, height} = Dimensions.get('window')

const BuscadorDependencias = ({navigation}:any) => {

    const { DependenciasSugerida, BuscarDependenciaSugerida} = DependenciaUso()
    const [BuscadorVacio,setBuscadorVacio] = useState(true)
   
    const Buscar = (texto:string) => {
        if(texto === ''){
            setBuscadorVacio(true)
        }else{
            BuscarDependenciaSugerida(texto)
            setBuscadorVacio(false)
        }
    }

    const Regreso = () => {
        navigation.goBack()
    }

    function Buscador(){
        return (
            <View>
                
                <View style={{width: 30}}>
                    <TouchableOpacity
                        style={{right: 8,}}
                        onPress={() => Regreso()}
                    >
                        <Icon name="chevron-back"
                            color="black"
                            size={45}/>
                    </TouchableOpacity>
                </View>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder='Buscar Dependencia'
                    style={styles.textInput}
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
            </View>
        )
    }

    function Listado() {
        return (
            <View>
            { !BuscadorVacio
             ?<FlatList

                style={{marginTop: 20,height: height - 120, width: width - 20}}
                data={DependenciasSugerida}
                keyExtractor={item => `${item.idDependencia}`}
                renderItem = { ({item}) => {
                    return (
                       <ScrollView>
                           <TouchableOpacity
                            onPress={() => navigation.navigate('Dependencia',{idDependencia: item.idDependencia,idEstado:2})}
                           >
                           <View style={styles.itemContainer}>
                                { (item?.fotos.length != 0)
                                    ?<Image style={styles.image} source={{uri: `${BaseURL}/imagenes/${item?.fotos[0].nombreFoto}`}}/>
                                    :<Image style={styles.image} source={require('../assets/ImageNotFound.png')}/>
                                }
                                <View>
                                <Text style={styles.textname}>{item.nombreDependencia}</Text>
                                <Text style={styles.textlocation}>{getTipoDependencias(item.idTipoDependencia)}</Text>
                                </View>
                           </View>
                           </TouchableOpacity>
                       </ScrollView>
                    )
                }}
                contentContainerStyle={{ paddingVertical: 7 * 2, paddingBottom: "14%"}}
                />
                : <View/>
            }
            </View>         
        )
    }
    
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: 'white'}}>
            <StatusBar
            translucent = {false}
            backgroundColor= "white"
            barStyle= "dark-content"
            />
            <Image
                    source={require('../assets/FondoBuscador.jpg')}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={10}
                    width={width}
                    height={height}
                />
        <View style={styles.container}>
            {Buscador()}
            {Listado()}
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor:'transparent',
    },

    textBackground: {
        position: 'absolute',
        backgroundColor: '#F3F1F3',
        borderRadius: 30,
        height: 50,
        width: '88%',
        left: 42,
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
    textInput: {
        flex: 2,
        fontSize: 18,
        color: 'black',
        top: 1,
        right: 33
    },

    itemContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 1,
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 5
    },
    
    textname: {
        fontSize: 15,
        marginLeft: 10,
        fontWeight: "600",
        color: 'black',
        top: 11
    },

    textlocation: {
        fontSize: 12,
        marginLeft: 10,
        width:310,
        height: 50,
        color: 'black',
        opacity: .5,
        textAlign: 'justify',
        padding: 2,
        top: 11
    },
});

export default BuscadorDependencias