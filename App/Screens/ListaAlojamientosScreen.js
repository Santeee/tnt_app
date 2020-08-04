import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, FlatList, StyleSheet, View, TextInput, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Item from '../Components/Item';

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

const ListaAlojamientosScreen = ({ navigation }) => {

    const [alojamientos, setAlojamientos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [clasificaciones, setClasificaciones] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [localidadBusqueda, setLocalidadBusqueda] = useState(null);
    const [categoriaBusqueda, setCategoriaBusqueda] = useState(null);
    const [clasificacionBusqueda, setClasificacionBusqueda] = useState(null);

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

        return filtrados
    }

    useEffect(() => {
        getAlojamientos().then( data => setAlojamientos(data));
        getCategorias().then( data => setCategorias(data));
        getClasificaciones().then( data => setClasificaciones(data));
        getLocalidades().then( data => setLocalidades(data));
    }, []);

    const _goToMapa = () => {
        navigation.navigate('Mapa', { screen: 'Alojamientos' });
    }

    const _goToPerfil = () => {
        return 'algo'
    }

    const _goToFavoritos = () => {
        navigation.navigate('Favoritos');
    }

    const _goToFiltros = () => {
        setTextoBusqueda('')
        setLocalidadBusqueda(null)
        setCategoriaBusqueda(null)
        setClasificacionBusqueda(null)
    }

    return (
        <SafeAreaView>
            <View style={styles.botones_top}>
                <Button
                    title='Perfil'
                    onPress={_goToPerfil}
                />
                <Button
                    title='Mapa'
                    onPress={_goToMapa}
                />
                <Button
                    title='Favoritos'
                    onPress={_goToFavoritos}
                />
            </View>
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
            <View style={styles.row_filtro}>
                <Button
                    title='Limpiar filtros'
                    onPress={_goToFiltros}
                />
            </View>
            <FlatList
                data={getAlojamientosFiltrados()}
                renderItem={({ item }) => <Item info={item} navigation={navigation} tipo="alojamiento"/>}
                keyExtractor={(item, index) => item.id.toString()}
            />
        </SafeAreaView>
    )
}

export default ListaAlojamientosScreen;

const styles = StyleSheet.create({
    botones_top: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    row_filtro: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})