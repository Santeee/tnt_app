import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Button = (props) => {
    
    const colorAdded = {
        backgroundColor: props.backgroundColor,
        borderColor: props.backgroundColor
    }

    return (
        <View style={[styles.buttonStyle, colorAdded]}>
            <Text style={styles.buttonTextStyle}>{props.label}</Text>
        </View>
    )
}

Button.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func
}

export default Button;

const styles = StyleSheet.create({

    buttonStyle: {
        backgroundColor: '#55CEF0',
        color: 'white',
        padding: 5,
        borderColor: '#55CEF0',
        borderRadius: 5,
        borderWidth: 1
    },

    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold'
    }
    
})
