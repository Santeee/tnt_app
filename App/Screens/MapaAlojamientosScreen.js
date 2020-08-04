import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, View, StyleSheet, TextInput, Text } from 'react-native';
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import RNPickerSelect from 'react-native-picker-select';

import AlojamientoMarker from '../Components/AlojamientoMarker'

function getAlojamientos(){
    return global.storage.load({
        key: 'alojamientos'
    })
}

function getCategorias(){
    return global.storage.load({
        key: 'categorias'
    })
}

function getClasificaciones(){
    return global.storage.load({
        key: 'clasificaciones'
    })
}

function getLocalidades(){
    return global.storage.load({
        key: 'localidades'
    })
}

const MapaAlojamientosScreen = ({ navigation }) => {

    const [gpsStatus, setGpsStatus] = useState(RESULTS.GRANTED);
    const [alojamientos, setAlojamientos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [clasificaciones, setClasificaciones] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [localidadBusqueda, setLocalidadBusqueda] = useState(null);
    const [categoriaBusqueda, setCategoriaBusqueda] = useState(null);
    const [clasificacionBusqueda, setClasificacionBusqueda] = useState(null);
    const [longitud, setLongitud] = useState(0);
    const [latitud, setLatitud] = useState(0);

    const getAlojamientosFiltrados = () => {
        let filtrados = alojamientos

        if (textoBusqueda != '')
            filtrados = filtrados.filter(aloj => aloj.nombre.toLowerCase().indexOf(textoBusqueda.toLowerCase()) >= 0)

        if (categoriaBusqueda != null)
            filtrados = filtrados.filter(aloj => aloj.categoria_id == categoriaBusqueda)

        if (localidadBusqueda != null)
            filtrados = filtrados.filter(aloj => aloj.localidad_id == localidadBusqueda)

        if (clasificacionBusqueda != null)
            filtrados = filtrados.filter(aloj => aloj.clasificacion_id == clasificacionBusqueda)

        // setLatitud(filtrados.pop().lat)
        // setLongitud(filtrados.pop().lng)

        return filtrados
    }

    useEffect(() => {
        getAlojamientos().then( data => setAlojamientos(data));
        getClasificaciones().then( data => setClasificaciones(data));
        getCategorias().then( data => setCategorias(data));
        getLocalidades().then( data => setLocalidades(data));
        setLatitud(-54.8205418);
        setLongitud(-68.331788);
    }, []);

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

    const _goToLista = () => {
        navigation.navigate('Lista', { screen: 'Alojamientos'} );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Lista" onPress={_goToLista} />

            <View style={{flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center'}}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }}
                    onChangeText={text => setTextoBusqueda(text)}
                    value={textoBusqueda}
                />
                <RNPickerSelect
                    style={{width: '50%', backgroundColor: 'lightyellow' }}
                    onValueChange={(value) => setLocalidadBusqueda(value)}
                    placeholder={ ({label:"Seleccione una localidad...", value: null}) }
                    items={ localidades.map(localidad => ({ label: localidad.nombre, value: localidad.id })) }
                />
            </View>
            <View style={{flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center'}}>
                <RNPickerSelect
                    style={{width: '50%', backgroundColor: 'lightyellow'}}
                    onValueChange={(value) => setCategoriaBusqueda(value)}
                    placeholder={ ({label:"Seleccione una categoría...", value: null}) }
                    items={ categorias.map(categoria => ({ label: categoria.estrellas, value: categoria.id })) }
                />
                <RNPickerSelect
                    style={{width: '50%', backgroundColor: 'lightyellow'}}
                    onValueChange={(value) => setClasificacionBusqueda(value)}
                    placeholder={ ({label:"Seleccione una clasificación...", value: null}) }
                    items={ clasificaciones.map(clasificacion => ({ label: clasificacion.nombre, value: clasificacion.id })) }
                />
            </View>
            { gpsStatus === RESULTS.GRANTED
            ? (
                <View style={styles.map}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: latitud,
                            longitude: longitud,
                            latitudeDelta: 0.0500,
                            longitudeDelta: 0.0500,
                        }}
                    >
                        { getAlojamientosFiltrados().map( data => (
                            <Marker
                                title={data.nombre}
                                coordinate={{latitude: data.lat, longitude: data.lng}}
                                description={data.domicilio}
                                key={data.id.toString()}
                                // image={data.foto}
                            >
                                {/* <AlojamientoMarker></AlojamientoMarker> */}
                            </Marker>
                        )) }
                    </MapView>
                </View>
            )
            :
                <Button title="Pedir permiso" onPress={_pedirPermisoGps} />
            }
        </SafeAreaView>
    )
}

export default MapaAlojamientosScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1,
    }
})