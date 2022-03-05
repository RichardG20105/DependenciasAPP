import React, { useEffect } from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    View, 
    Text,
    TouchableOpacity,
    Image,
    Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import { DependenciaUso } from '../hooks/DependendeciasUso';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { BaseURL } from '../api/Apis';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const PantallaDependencia = (props: any) => {
    const idDependencia = props.route.params.idDependencia
    const {Dependencia, BuscarDependencia} = DependenciaUso();

    useEffect(() => {
      BuscarDependencia(idDependencia)
    }, [])
    
    function renderHeader(){
        const Regreso = () =>{
            props.navigation.goBack()
        }
        return(
            <View style={{ flexDirection:'row', paddingTop: 15, paddingBottom: 15 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: 10 * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => Regreso()}
                >
                    <Icon name="arrow-back"
                        color="black"
                        size={35}/>
                </TouchableOpacity>
                
                {/* Nombre de la Sección de la Dependencia */}

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
                        <Text style={{fontFamily: "Roboto-Bold",fontSize: 18, lineHeight: 22, color:"black"}}>{Dependencia?.nombreDependencia}</Text>
                    </View>
                </View>
            </View>
        )        
    }
    
    function renderDependenciaInfo(){
        const DirigirMapa = (idDependencia: any) =>{
            props.navigation.navigate('Mapa',{idDependencia: idDependencia})
        }
        return(
                <View style={{ 
                    alignItems: 'center',
                    }}
                >
                    <View style={{ height: HEIGHT * 0.30}}>
                       {(Dependencia?.fotos.length != 0)
                        ? <Image
                            source={{uri: `${BaseURL}/imagenes/${Dependencia?.fotos[0].nombreFoto}`}}
                            resizeMode='stretch'
                            style={{
                                width: WIDTH,
                                height: "140%",
                                borderRadius: 5
                            }} 
                        />
                        : <Image
                            source={require('../assets/ImageNotFound.png')}
                            resizeMode='stretch'
                            style={{
                                width: WIDTH,
                                height: "140%",
                                borderRadius: 5
                            }}
                         /> 
                       }
                        <View style={styles.detailsContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="favorite" color= "red" size={30} />
                            </View>
                            <View style={styles.iconContainer1}
                                //onPress={() => DirigirMapa(Dependencia?.idDependencia)}
                            >
                                <Icon name="directions" color= "#777873" size={40} />
                            </View>
                            
                        </View> 
                        
                        <View style={{ flexDirection: 'row', 
                                            }}>
                                <Icon name="place" size={28} color="blue" style={{marginLeft: 10}}/>
                                <Text 
                                    style={{
                                        marginLeft: 5, 
                                        fontSize: 18, 
                                        fontWeight: 'bold', 
                                        color:"blue"
                                    }}
                                > 
                                    Espoch 
                                </Text>
                        </View>
                        <ScrollView style={{paddingBottom: 275}}>
                            <Text style={{color: "black", marginTop: 15, fontWeight: 'bold', fontSize: 20, marginLeft: 15}}>
                                Acerca de
                            </Text>
                            <Text style={{color: "black", marginTop: 15, lineHeight: 22, marginLeft: 15}}>
                            {Dependencia?.descripcionDependencia}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
           
        )
    }

    
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderDependenciaInfo()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white",
    },

    detailsContainer: {
        top: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 20, 
        backgroundColor: 'white',
        flex: 0.3,
    },

    iconContainer: {
        height: 60,
        width: 60, 
        position: 'absolute',
        top:-30,
        backgroundColor: 'white',
        borderRadius: 30,
        right: 20,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    iconContainer1: {
        height: 60,
        width: 60, 
        marginRight: 80,
        position: 'absolute',
        top:-30,
        backgroundColor: 'white',
        borderRadius: 30,
        right: 20,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PantallaDependencia