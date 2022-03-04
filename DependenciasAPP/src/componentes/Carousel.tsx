import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Dimensions, Image, NativeScrollEvent } from  'react-native'

const images = [
    'https://cdn.pixabay.com/photo/2016/09/01/19/53/pocket-watch-1637396_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/10/03/17/53/nature-2813487_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/07/28/11/08/guitar-3567767_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/06/07/09/01/emotions-3459666_960_720.jpg'
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
            <View style={styles.wrap}>
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
                                resizeMode= 'stretch'
                                style={styles.wrap}
                                source={{uri: e}}
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
        paddingBottom: 158,
    },

    wrap: {
        width: WIDTH - 42,
        height: HEIGHT * 0.21
    },

    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },

    dotActive: {
        margin: 4,
        color: 'black'
    },

    dot: {
        margin: 4,
        color: 'white'
    }
})

export default Carousel
