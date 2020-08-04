import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'

import ListaFavoritos from '../Components/ListaFavoritos'

const ListaFavoritosScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [ids_favoritos, setIdFavoritos] = useState({})

    const _getFavoritos = async () => {
        return await global.storage.load({
                key: 'favoritos'
            })
            .then( res => res.pop() )
            .then( data => setIdFavoritos(data))
            .catch(err => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        _getFavoritos()
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Favoritos</Text>
            {isLoading
                ? <Text>Cargando datos..s.</Text>
                : isError
                    ? <Text>Ocurrió un error</Text>
                    :
                        <ListaFavoritos
                            ids_favoritos={ids_favoritos}
                            navigation={navigation}
                        />
            }
        </SafeAreaView>
    )
}

export default ListaFavoritosScreen