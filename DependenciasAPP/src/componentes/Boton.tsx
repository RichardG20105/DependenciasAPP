import React from 'react'
import { StyleProp, TouchableOpacity, Text, ViewStyle, StyleSheet } from 'react-native';

interface Props{
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}
export const Boton = ({title, onPress, style = {} }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={{
                ...style as any,
                ...styles.boton,
            }}
        >
            <Text style={styles.textoBoton}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boton: {
        height: 50,
        width: 150,
        backgroundColor: '#273E5C',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 6
    },
    textoBoton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
