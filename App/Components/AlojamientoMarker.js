import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Marker } from 'react-native-maps'

const AlojamientoMarker = ( params ) => {
    const {title, cordinate} = params;

    return (
        <SafeAreaView>
            <View style={{backgroundColor: "red", padding: 10}}>
                <Text>SFasdasdasd</Text>
            </View>
        </SafeAreaView>
    )
}

export default AlojamientoMarker