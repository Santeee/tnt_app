import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Estrellas from './Estrellas'

const Item = ({navigation, info, tipo}) => {
    const [esFavorito, setEsFavorito] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [favoritos, setFavoritos] = useState([])

    const getFavoritos = async () => {
        setIsLoading(true);
        setIsError(false);

        return await global.storage.load({
                    key: 'favoritos'
                })
                .then(res => res.pop())
                .catch(err => {
                    setIsError(true)
                })
                .finally(() => {
                    setIsLoading(false)
                })
    }

    useEffect(() => {
        getFavoritos()
            .then(favoritos => {
                if (tipo == 'alojamiento'){
                    if ( favoritos.alojamientos.filter(data => data.id == info.id).length > 0 )
                        setEsFavorito(true)
                    } else {
                        if ( favoritos.gastronomicos.filter(data => data.id == info.id).length > 0 )
                        setEsFavorito(true)
                    }
                setFavoritos(favoritos)
            })
    }, [])

    const checkFavorito = () => {
        if (tipo == 'alojamiento'){
            if ( favoritos.alojamientos.filter(data => data.id == info.id).length > 0 ) {
                let nuevos = favoritos.alojamientos.filter(data => data.id != info.id)
                let favoritos_actualizados = [{
                    gastronomicos: favoritos.gastronomicos,
                    alojamientos: nuevos
                }]

                global.storage.save({
                    key: 'favoritos',
                    data: favoritos_actualizados
                })

                setFavoritos(favoritos_actualizados)
                setEsFavorito(false)
            } else {
                let nuevos = favoritos.alojamientos
                nuevos.push({ id: info.id })
                let favoritos_actualizados = [{
                    gastronomicos: favoritos.gastronomicos,
                    alojamientos: nuevos
                }]

                global.storage.save({
                    key: 'favoritos',
                    data: favoritos_actualizados
                })

                setFavoritos(favoritos_actualizados)
                setEsFavorito(true)
            }
        } else {
            if ( favoritos.gastronomicos.filter(data => data.id == info.id).length > 0 ) {
                let nuevos = favoritos.gastronomicos.filter(data => data.id != info.id)
                let favoritos_actualizados = [{
                        alojamientos: favoritos.alojamientos,
                        gastronomicos: nuevos
                    }]

                global.storage.save({
                    key: 'favoritos',
                    data: favoritos_actualizados
                })

                setFavoritos(favoritos_actualizados)
                setEsFavorito(false)
            } else {
                let nuevos = favoritos.gastronomicos
                nuevos.push({ id: info.id })

                let favoritos_actualizados = [{
                    alojamientos: favoritos.alojamientos,
                    gastronomicos: nuevos
                }]

                global.storage.save({
                    key: 'favoritos',
                    data: favoritos_actualizados
                })

                setFavoritos(favoritos_actualizados)
                setEsFavorito(true)
            }
        }
    }

    const _goToInfo = () => {
        (tipo == 'alojamiento')
        ? navigation.navigate('InfoItem', info)
        : navigation.navigate('infoItemGastronomico', info)
    }

    return (
        <View style={ estilos.estructura }>
            <TouchableOpacity style={ estilos.info } onPress={_goToInfo}>
                <View style={ estilos.info_texto }>
                    { (tipo == 'alojamiento')
                        ? (
                            <View>
                                <Estrellas id={info.id.toString()} cantidad={info.categoria_id} />
                            </View>
                            )
                        : (<Text></Text>)
                    }
                    <View><Text style={ estilos.titulo }>{ info.nombre }</Text></View>
                    <View><Text>{ info.domicilio } | { ( tipo == 'gastronomico' )? (<Text> {info.localidade.nombre} </Text>) : (<Text></Text>)  }</Text></View>
                </View>
                <View style={ estilos.info_flecha }>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={'black'}/>
                </View>
            </TouchableOpacity>
            <View style={ estilos.separador }></View>
            {isLoading
                ? <Text>actualizando fav</Text>
                : isError
                    ? <Text>Ocurrio un error en fav</Text>
                    : (<TouchableOpacity
                            style={ estilos.favorito }
                            onPress={checkFavorito}
                        >
                            <Text style={ estilos.favorito_button }>
                                <MaterialCommunityIcons name="star" size={30} color={esFavorito ? '#ebe017' : '#FFFFFF'}/>
                            </Text>
                        </TouchableOpacity>
                    )
            }
        </View>
    );
}

export default Item

const estilos = StyleSheet.create({
    estructura: {
        borderColor: '#d3d9e3',
        borderWidth: 1,
        padding: 5,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },

    separador: {
        borderWidth: 1,
        borderColor: '#d3d9e3'
    },

    info: {
        width: '80%',
        flexDirection: 'row'
    },

    info_texto: {
        width: '90%'
    },

    info_flecha: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '10%'
    },

    favorito: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '20%'
    },

    favorito_button: {
    }
})