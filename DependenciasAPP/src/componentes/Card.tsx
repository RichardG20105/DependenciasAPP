import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native"
import { BaseURL } from '../api/Apis'
import { Foto } from '../interfaces/appinterfaces'

interface Props{
    title: string;
    location: string;
    description: string;
    image: Foto[];

}

const Card = ({ title, location, description, image }: Props) => {
  return (
    <View style={styles.containerCard}>
        <View style={styles.cardImage}>
            {(image.length != 0)
                ? <Image style={{width: 115, height: 100, borderRadius: 20}} source={{uri: `${BaseURL}/imagenes/${image[0].nombreFoto}`}}/>    
                : <Image style={{width: 115, height: 100, borderRadius: 20}} source={require('../assets/ImageNotFound.png')}/>    
            }            
        </View>
        <View style={{flex: 0.6, marginHorizontal: 12, overflow: "hidden"}}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardLocation}>{location}</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>{description}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    
    containerCard: {
        flex: 1,
        backgroundColor: "#FFA888",
        paddingVertical: 12, 
        paddingHorizontal: 15,
        width: 370,
        marginHorizontal: 20,
        borderRadius: 20,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        flexDirection: "row",
        marginBottom: 10
    },

    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
        color: "black"
    },

    cardLocation: {
        fontSize: 12,
        marginLeft: 10,
        color: "black",
        opacity: .7
    },

    cardDescription: {
        fontSize: 12,
        marginLeft: 10,
        marginVertical: 5,
        color: "black"
    },

    cardImage: {
        padding: 0,
        flex: 0.4,
        justifyContent: 'center'
    }
})
export default Card