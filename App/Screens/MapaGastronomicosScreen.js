import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, TextInput } from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import RNPickerSelect from 'react-native-picker-select';

import MapaGastronomicos from '../Components/MapaGastronomicos'

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

const MapaGastronomicosScreen = ({ navigation }) => {

    // const [gpsStatus, setGpsStatus] = useState(RESULTS.GRANTED);
    const [localidadBusqueda, setLocalidadBusqueda] = useState(null);
    const [especialidadBusqueda, setEspecialidadBusqueda] = useState(null);
    const [actividadBusqueda, setActividadBusqueda] = useState(null);
    const [textoBusqueda, setTextoBusqueda] = useState('');

    const {loading: filtros_loading, error: filtros_error, data: filtros_datos} = useQuery(DATA_FILTROS, {
        pollInterval: 0
    });

    const _goToLista = () => {
        navigation.navigate('Lista', { screen: 'Gastronomicos' });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Lista" onPress={_goToLista} />
            {
                (filtros_loading)
                  ? <Text>Cargando filtros...</Text>
                  : (filtros_error)
                      ? <Text>Ocurrió un error al cargar los filtros</Text>
                      : (
                        <View style={{flex: 1}}>
                          <View>
                              <TextInput
                                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }}
                                  onChangeText={text => {setTextoBusqueda(text);}}
                                  value={ textoBusqueda }
                              />
                              <RNPickerSelect
                                  style={{width: '50%', backgroundColor: 'lightyellow' }}
                                  onValueChange={(value) => {setLocalidadBusqueda(value); }}
                                  placeholder={ ({label:"Seleccione una localidad...", value: null}) }
                                  items={ filtros_datos.localidades.map(localidad => ({ label: localidad.nombre, value: localidad.id })) }
                              />
                              <RNPickerSelect
                                  style={{width: '50%', backgroundColor: 'lightyellow' }}
                                  onValueChange={(value) => {setActividadBusqueda(value);  }}
                                  placeholder={ ({label:"Seleccione una actividad...", value: null}) }
                                  items={ filtros_datos.actividades.map(actividad => ({ label: actividad.nombre, value: actividad.id })) }
                              />
                              <RNPickerSelect
                                  style={{width: '50%', backgroundColor: 'lightyellow' }}
                                  onValueChange={(value) => {setEspecialidadBusqueda(value); }}
                                  placeholder={ ({label:"Seleccione una especialidad...", value: null}) }
                                  items={ filtros_datos.especialidades.map(especialidad => ({ label: especialidad.nombre, value: especialidad.id })) }
                              />
                          </View>
                              <MapaGastronomicos
                                  localidades={filtros_datos.localidades}
                                  actividades={filtros_datos.actividades}
                                  especialidades={filtros_datos.especialidades}
                                  localidadBusqueda={localidadBusqueda}
                                  actividadBusqueda={actividadBusqueda}
                                  especialidadBusqueda={especialidadBusqueda}
                              />
                        </View>
                      )}
        </SafeAreaView>
    )
}

export default MapaGastronomicosScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})