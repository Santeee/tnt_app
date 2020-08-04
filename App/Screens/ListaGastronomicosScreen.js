import React, { useState } from 'react';
import { SafeAreaView, Button, StyleSheet, View, Text, TextInput } from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import RNPickerSelect from 'react-native-picker-select';

import ListaGastronomicos from '../Components/ListaGastronomicos'

const DATA_FILTROS = gql`
    query myquery {
        actividades {
            id
            nombre
        }
        especialidades {
            id
            nombre
        }
        localidades {
            id
            nombre
        }
    }
`;

const ListaGastronomicosScreen = ({ navigation }) => {

    const [localidadBusqueda, setLocalidadBusqueda] = useState(null);
    const [especialidadBusqueda, setEspecialidadBusqueda] = useState(null);
    const [actividadBusqueda, setActividadBusqueda] = useState(null);
    const [textoBusqueda, setTextoBusqueda] = useState('');

    const {loading: filtros_loading, error: filtros_error, data: filtros_datos} = useQuery(DATA_FILTROS, {
        pollInterval: 0
    });

    const _goToMapa = () => {
        navigation.navigate('Mapa', { screen: 'Gastronomicos' });
    }

    const _goToPerfil = () => {
        return 'algo'
    }

    const _goToFavoritos = () => {
        navigation.navigate('Favoritos');
    }

    const _goToFiltros = () => {
        return 'algo'
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
                <View style={styles.row_filtro}>
                    <Button
                        title='Filtro'
                        onPress={_goToFiltros}
                    />
                </View>
                {(filtros_loading)
                    ? <Text>Cargando filtros...</Text>
                    : (filtros_error)
                        ? <Text>Ocurrió un error al cargar los filtros</Text>
                        : (
                            <View>
                                <View>
                                    <TextInput
                                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }}
                                        onChangeText={text => {setTextoBusqueda(text);}}
                                        value={ textoBusqueda }
                                    />
                                    <RNPickerSelect
                                        style={{width: '50%', backgroundColor: 'lightyellow' }}
                                        onValueChange={(value) => {setLocalidadBusqueda(value);}}
                                        placeholder={ ({label:"Seleccione una localidad...", value: null}) }
                                        items={ filtros_datos.localidades.map(localidad => ({ label: localidad.nombre, value: localidad.id })) }
                                    />
                                    <RNPickerSelect
                                        style={{width: '50%', backgroundColor: 'lightyellow' }}
                                        onValueChange={(value) => {setActividadBusqueda(value);}}
                                        placeholder={ ({label:"Seleccione una actividad...", value: null}) }
                                        items={ filtros_datos.actividades.map(actividad => ({ label: actividad.nombre, value: actividad.id })) }
                                    />
                                    <RNPickerSelect
                                        style={{width: '50%', backgroundColor: 'lightyellow' }}
                                        onValueChange={(value) => {setEspecialidadBusqueda(value);}}
                                        placeholder={ ({label:"Seleccione una especialidad...", value: null}) }
                                        items={ filtros_datos.especialidades.map(especialidad => ({ label: especialidad.nombre, value: especialidad.id })) }
                                    />
                                </View>
                                <View>
                                    <ListaGastronomicos
                                        localidadBusqueda={localidadBusqueda}
                                        actividadBusqueda={actividadBusqueda}
                                        especialidadBusqueda={especialidadBusqueda}
                                        textoBusqueda={textoBusqueda}
                                        actividades={filtros_datos.actividades}
                                        localidades={filtros_datos.localidades}
                                        especialidades={filtros_datos.especialidades}
                                        navigation={navigation}
                                    />
                                </View>
                            </View>
                        )
                }
            </SafeAreaView>
    )
}

export default ListaGastronomicosScreen;

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