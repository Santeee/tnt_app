import React, {useState, useEffect} from 'react'
import { SafeAreaView, Text, Image, Button, StyleSheet, View } from 'react-native'
import axios from 'axios'

import Estrellas from '../Components/Estrellas'

const InfoItem = ({route, navigation}) => {
    const { id } = route.params;
    const [alojamiento, setAlojamiento] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isError, setIsError] = useState(false);

    const getDatos = async () => {
        setIsError(false)
        setIsFetching(true)

        return await axios.get(`http://localhost:3000/alojamientos?id=eq.${id}&select=*,categorias(*),localidades(*),clasificaciones(*)`)
                            .then(res => setAlojamiento(res.data.pop()))
                            .catch(err => {
                                console.warn(err);
                                setIsError(true)
                            })
                            .finally(() => {
                                setIsFetching(false)
                            })
    }

    useEffect(() => {
        getDatos();
    }, [])

    return (
        <SafeAreaView style={ styles.content }>
            {isFetching ? (
                <Text>Cargando datos...</Text>
            ) : isError ? (
                <Text>Ocurrió un error al traer los datos...</Text>
            ) : (
                <View>
                    <Button onPress={() => { navigation.goBack()} } title='Volver' />
                    <Estrellas cantidad={ alojamiento.categorias.valor } />
                    <Text style={ styles.nombre }>{ alojamiento.nombre }</Text>
                    <Image
                        style={styles.foto}
                        source={{
                            url: alojamiento.foto
                        }}
                    />
                    <Text>{ alojamiento.domicilio } - { alojamiento.localidades.nombre }</Text>
                    <Text style={ styles.tituloFotosPropias }>Fotos propias:</Text>
                    {/* TODO: refactoring para evitar hacerlo manualmente */}
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                        </View>
                        <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                        </View>
                    </View>
                </View>
            )
            }
        </SafeAreaView>
    )
}

export default InfoItem;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        margin: 20
    },

    nombre: {
        fontWeight: 'bold',
        fontSize: 30
    },

    foto: {
        width: '100%',
        height: '30%'
    },

    tituloFotosPropias: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})