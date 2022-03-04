import React from 'react'
import { ActivityIndicator, View } from 'react-native';

const PantallaCarga = () => {
    return (
        <View style ={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator
                size={50}
                color="cyan"
            />
        </View>
    )
}

export default PantallaCarga