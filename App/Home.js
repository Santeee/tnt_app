import React from 'react'
import { Text, SafeAreaView, View , StyleSheet, Image } from 'react-native'

import Button from './Components/Button'

const Home = () => (
    <SafeAreaView style={styles.fondo}>
        <View style={styles.principal}>
            <View style={styles.menuBotones}>
                <Button backgroundColor='#55CEF0' label='Barritas'></Button>
                <Button
                    style={[styles.btnBusqueda, styles.btnEspecial]}
                    backgroundColor='#24dd22'
                    label='B'>
                </Button>
                <Button backgroundColor='#521DD2' label='C'></Button>
                <Button backgroundColor='#25AF12' label='D'></Button>
            </View>
            <View style={styles.main}>
                <Image
                    style={styles.imagen}
                    source={ require('./images/img.png') }
                ></Image>

                <View style={styles.rows}>
                    <Button backgroundColor='#55CEF0' label='CONNECT' />
                    <Button backgroundColor='#000000' label='MESSAGE' />
                </View>
                <View style={styles.rows}>
                    <View style={styles.contadores}>
                        <Text>2K</Text>
                        <Text>Orders</Text>
                    </View>
                    <View style={styles.contadores}>
                        <Text>20</Text>
                        <Text>Photos</Text>
                    </View>
                    <View style={styles.contadores}>
                        <Text>89</Text>
                        <Text>Comments</Text>
                    </View>
                </View>
            </View>
        </View>
    </SafeAreaView>
)

console.warn('render');

export default Home;

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
        marginTop: 150
    },

    contadores: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'red'
    },

    menuBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    btnBusqueda: {
        alignSelf: 'center'
    },

    principal: {
        padding: 20,
        flex: 1,
        margin: 20,
        borderRadius: 10
    },

    fondo: {
        backgroundColor: '#521ADF',
        flex: 1
    },

    btnEspecial: {
        width: 100,
        flex: 1,
        marginRight: 5
    },

    main: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center'
    },

    imagen: {
        borderRadius: 200,
        width: 100,
        height: 100,
        position: 'absolute'
    }
})