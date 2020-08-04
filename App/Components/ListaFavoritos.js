import React, { useState } from 'react'
import { Text, FlatList, View, TextInput, Switch, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

import Item from '../Components/Item'

const FAVORITOS = gql`
    query myQuery( $ids_gastronomicos: [Int!], $ids_alojamientos: [Int!] ) {
        gastronomicos: gastronomicos(where: {id: {_in:$ids_gastronomicos}} ) {
            id
            nombre
            foto
            domicilio
            lat
            lng
            localidade {
                id
                nombre
            }
        }
        alojamientos: alojamientos(where: {id: {_in:$ids_alojamientos}}){
            id
            nombre
            domicilio
            lat
            lng
            localidade {
                id
                nombre
            }
            clasificacione {
                nombre
            }
            categoria {
                valor
            }
        }
    }
`;

const ListaFavoritos = ({ ids_favoritos, navigation }) => {
    const { loading, error, data } = useQuery(FAVORITOS, {
        variables: {
            ids_gastronomicos: ids_favoritos.gastronomicos.map(data => data.id),
            ids_alojamientos: ids_favoritos.alojamientos.map(data => data.id)
        },
        pollInterval: 0
    })

    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const getListado = () => {
        let listado = []

        data.gastronomicos.forEach(element => {
            listado.push({ ... element, tipo: 'gastronomico'})
        });
        data.alojamientos.forEach(element => {
            listado.push({ ... element, tipo: 'alojamiento'})
        });

        if (textoBusqueda != '')
            listado = listado.filter(data => data.nombre.toLowerCase().indexOf(textoBusqueda.toLowerCase()) >= 0)

        return listado
    }

    return (
        <View style={{ flex:1 }}>
            <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }}
                        onChangeText={text => setTextoBusqueda(text)}
                        value={textoBusqueda}
                        placeholder="Ingrese el texto a buscar"
                    />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20}}>
                <Text style={styles.texto_switch}>Listado</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "black" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={styles.texto_switch}>Mapa</Text>
            </View>
            {loading
                ? <Text>Cargando datos...</Text>
                : error
                    ? <Text>Ocurrió un error...</Text>
                    :
                    <View style={{ flex:1 }}>
                        {isEnabled
                        ?
                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: -54.8205418,
                                    longitude: -68.331788,
                                    latitudeDelta: 0.0500,
                                    longitudeDelta: 0.0500,
                                }}
                            >
                                { getListado().map( data => (
                                    <Marker
                                        title={data.nombre}
                                        coordinate={{latitude: data.lat, longitude: data.lng}}
                                        description={data.domicilio}
                                        key={'marker_'+data.tipo+data.id.toString()}
                                    >
                                    </Marker>
                                ))}
                            </MapView>
                        :
                            <FlatList
                                data={getListado()}
                                renderItem={({ item }) => <Item info={item} navigation={navigation} tipo={item.tipo}/>}
                                keyExtractor={(item, key)=> key.toString()}
                            />
                        }
                    </View>
            }
        </View>
    )
}

export default ListaFavoritos;

const styles = StyleSheet.create({
    texto_switch: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },
    map: {
        flex: 1
    }
})