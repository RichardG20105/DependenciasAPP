import React, {useCallback, useEffect} from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View, 
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated } from 'react-native'
    import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {images, icons} from '../../constants'
import { UsuarioUso } from '../hooks/UsuarioUso';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Usuario } from '../interfaces/appinterfaces';


export const UsuarioInformacion = ({navigation}:any) => {
    const {UsuarioInfo, InformacionUsuario} = UsuarioUso();

    useFocusEffect(
        useCallback(
          () => {
            InformacionUsuario()
            console.log('focus')
            return () => {
                console.log('unfocused')
            }
          },[],
        )
        
    )
    
    return (
        <View style={styles.container}>
            <Image 
                style={styles.bgimagen} 
                source={images.avatar_2}
            />
            <View style={styles.bottomContainer}>
               <Image
                    style={styles.profile}
                    source={images.avatar_3}
               /> 
               <Text style={styles.name}>{UsuarioInfo?.nombres}</Text>
               <Text style={styles.name}>{UsuarioInfo?.apellidos}</Text>
               <View style={styles.userInfoSection}>
                   <View style={styles.row}>
                       <Icon name= "account" color="#777777" size={25} />
                        <Text style={styles.text}>{UsuarioInfo?.usuario}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name= "map-marker-radius" color="#777777" size={25} />
                        <Text style={styles.text}>{UsuarioInfo?.ciudad}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name= "phone" color="#777777" size={25}/>
                        <Text style={styles.text}>(+593) {UsuarioInfo?.telefono}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name= "email" color="#777777" size={25}/>
                        <Text style={styles.text}>{UsuarioInfo?.correo}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={() => {navigation.navigate('UsuarioModificar'),InformacionUsuario()}}>
                    <Text style={styles.panelButtonTitle}>Modificar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    bgimagen: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },

    bottomContainer: {
        marginTop: "70%",
        height:"90%",
        width: "100%",
        backgroundColor: '#bbe3ed',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        alignItems: 'center'

    },

    profile: {
        height: 150,
        width: 150,
        borderRadius: 80,
        bottom: "12%",
        backgroundColor: 'white'
    },

    name: {
        fontSize: 32,
        fontWeight:'bold',
        bottom: "8%",
        color: "black"
    },

    userInfoSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
        marginRight: 'auto'
    },

    row: {
        flexDirection: 'row',
        marginBottom: 25,
        
    },

    text: {
        fontSize: 18,
        color: "#777777" ,
        marginLeft: 15,
        
    },

    commandButton: {
        paddingBottom: 15,
        paddingHorizontal: 100,
        borderRadius: 10, 
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 1,
    },

    panelButtonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,

    },
});
