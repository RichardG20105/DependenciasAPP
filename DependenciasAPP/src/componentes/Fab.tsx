import React  from 'react'
import { View, TouchableOpacity, StyleProp, ViewStyle, StyleSheet, ColorValue } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


interface Props{
    NombreIcono: string;
    Color: ColorValue;
    BGColor: ColorValue;
    PLeft: number;
    IconSize: number;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}
export const Fab = ({ NombreIcono, Color, BGColor, PLeft, IconSize, onPress, style = {}}: Props) => {
    return (
        <View style={{...style as any}}>

            <TouchableOpacity
                activeOpacity={0.8} 
                onPress={onPress}
                style={[styles.boton,{backgroundColor: BGColor}]}
            >
                <View style={{left: PLeft}}>
                    <Icon
                        name={NombreIcono}
                        color={Color}
                        size={IconSize}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    boton: {
        zIndex: 9999,
        height: 50,
        width: 50,
        /* backgroundColor: BGColor,  */
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
})
