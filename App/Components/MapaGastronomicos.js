import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';

const GASTRONOMICOS_POR_LOCALIDAD = gql`
    query myquery($localidades: [Int!], $especialidades: [Int!], $actividades: [Int!], $nombre : String ) {
        gastronomicos(where: { localidad_id: {_in: $localidades}, actividad_gastronomicos: { actividad_id: {_in: $actividades} }, especialidad_gastronomicos: { especialidad_id: {_in: $especialidades} } }) {
            id
            nombre
            domicilio
            lat
            lng
            localidade {
                nombre
            }
        }
    }
`;

const MapaGastronomicos = (params) => {
    const { localidadBusqueda, especialidadBusqueda, actividadBusqueda, especialidades, localidades, actividades } = params;
    const textoBusqueda = '';
    const [gpsStatus, setGpsStatus] = useState(RESULTS.GRANTED);

    const {loading, error, data} = useQuery(GASTRONOMICOS_POR_LOCALIDAD, {
        variables: {
            localidades: (localidadBusqueda == null) ? localidades.map(data => data.id) : localidadBusqueda,
            especialidades: (especialidadBusqueda == null) ? especialidades.map(data => data.id) : especialidadBusqueda,
            actividades: (actividadBusqueda == null) ? actividades.map(data => data.id) : actividadBusqueda,
            nombre: textoBusqueda.toLowerCase()
        },
        pollInterval: 0, //Consultar por los efectos del polling, es optimo?
    });

    const _pedirPermisoGps = async () => {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        });

        try {
            const result = await check(permission);
            console.warn(result);
                if (result !== RESULTS.GRANTED) {
                    const requestResult = request(permission);
                if (requestResult !== RESULTS.GRANTED) {
                    navigation.navigate('Mapa');
                } else {
                    setGpsStatus(RESULTS.GRANTED);
                }
            }
        } catch (error) {
            console.warn('ERROR!');
        }
    };

    return (
            gpsStatus === RESULTS.GRANTED
                ?
                    loading
                        ? <Text>Cargando datos...</Text>
                        : error
                            ? <Text>Ocurrió un error...</Text>
                            : (
                                <View style={styles.map}>
                                    <MapView
                                        style={styles.map}
                                        region={{
                                            latitude: -54.8205418,
                                            longitude: -68.331788,
                                            latitudeDelta: 0.0500,
                                            longitudeDelta: 0.0500,
                                        }}
                                    >
                                        { data.gastronomicos.map( data => (
                                            <Marker
                                                title={data.nombre}
                                                coordinate={{latitude: data.lat, longitude: data.lng}}
                                                description={data.domicilio}
                                                key={data.id.toString()}
                                            >
                                            </Marker>
                                        ))}
                                    </MapView>
                                </View>
                            )
                : <Button title="Pedir permiso" onPress={_pedirPermisoGps} />
    )
}

export default MapaGastronomicos

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})