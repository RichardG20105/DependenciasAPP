import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Dimensions, Image, NativeScrollEvent } from  'react-native'

const path = '../assets/Carousel'
const images = [
    require('../assets/Carousel/fondo1.jpg'),
    require('../assets/Carousel/fondo2.jpg'),
    require('../assets/Carousel/fondo3.jpg'),
    require('../assets/Carousel/fondo4.jpg'),
    require('../assets/Carousel/fondo5.jpg'),
    require('../assets/Carousel/fondo6.jpg'),
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Carousel = () => {
    const [imgActive, setimgActive] = useState(0);

    const onchange = (nativeEvent: NativeScrollEvent) => {
        if(nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != imgActive){
                setimgActive(slide);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.wrap, {elevation: 12}]}>
                <ScrollView
                    onScroll={({nativeEvent}) => onchange(nativeEvent)}                
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    
                    style = {styles.wrap}
                >
                    {
                        images.map((e, index) => 
                            <Image
                                key={e}
                                resizeMode= 'cover'
                                style={styles.wrap}
                                source={e}
                            />
                        )
                    }
                </ScrollView>
                <View style={styles.wrapDot}>
                    {
                        images.map((e, index) =>
                            <Text
                                key = {e}
                                style = { imgActive == index ? styles.dotActive : styles.dot }
                            >
                                ●
                            </Text>
                        )
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        marginVertical: 2,
        marginHorizontal: 21,
        paddingBottom: 198,
    },

    wrap: {
        width: WIDTH - 43,
        height: HEIGHT / 4.2,
        backgroundColor: 'transparent',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },

    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },

    dotActive: {
        margin: 4,
        color: 'black',
        fontSize: 30
    },

    dot: {
        margin: 4,
        color: 'white',
        fontSize: 30
    }
})

export default Carousel