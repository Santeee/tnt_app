import React from 'react'
import { View, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Estrellas = ({ cantidad }) => {

    let estrellas = []

    for (let i = 0; i < cantidad; i++) {
        estrellas.push(
            <MaterialCommunityIcons name="star" size={20} color={'#ebe017'}/>
        )
    }

    return (
        <View style={ styles.estrellas }>
            { estrellas }
        </View>
    )
}

export default Estrellas;

const styles = StyleSheet.create({
    estrellas: {
        flexDirection: 'row',
        width: '50%'
    }
})