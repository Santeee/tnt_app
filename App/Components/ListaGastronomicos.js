import React, { useState, useEffect } from 'react'
import { FlatList, Text} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

import Item from '../Components/Item'

const GASTRONOMICOS_POR_LOCALIDAD = gql`
    query myquery($localidades: [Int!], $especialidades: [Int!], $actividades: [Int!], $nombre : String ) {
        gastronomicos(where: { localidad_id: {_in: $localidades}, actividad_gastronomicos: { actividad_id: {_in: $actividades} }, especialidad_gastronomicos: { especialidad_id: {_in: $especialidades} } }) {
            id
            nombre
            domicilio
            localidade {
                nombre
            }
        }
    }
`;

const ListaGastronomicos = (params) => {
    const { localidades, actividades, especialidades, localidadBusqueda, actividadBusqueda, especialidadBusqueda, textoBusqueda, navigation } = params
    const {loading, error, data} = useQuery(GASTRONOMICOS_POR_LOCALIDAD, {
        variables: {
            localidades: (localidadBusqueda == null) ? localidades.map(data => data.id) : [localidadBusqueda],
            especialidades: (especialidadBusqueda == null) ? especialidades.map(data => data.id) : [especialidadBusqueda],
            actividades: (actividadBusqueda == null) ? actividades.map(data => data.id) : [actividadBusqueda],
            nombre: textoBusqueda.toLowerCase()
        },
        pollInterval: 0, //Consultar por los efectos del polling, es optimo?
    });

    return (
        loading
            ? <Text>Cargando datos...</Text>
            : error
                ? <Text>Ocurrió un error...</Text>
                : (
                    <FlatList
                        data={data.gastronomicos}
                        renderItem={({ item }) => <Item info={item} navigation={navigation} tipo={'gastronomico'}/>}
                        keyExtractor={item => item.id.toString()}
                    />
                )
    )
}

export default ListaGastronomicos