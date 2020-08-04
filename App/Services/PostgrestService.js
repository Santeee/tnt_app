import axios from 'axios'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

const syncData = async (url, dataType) => {
    const res = await axios.get(`${url}/${dataType}`)

    global.storage.save({
        key: `'${dataType}'`,
        data: res.data,
        expires: 1000 * 60 * 60 * 24
    })

    return res.data
}

const initPostgrestStorage = (url) => {
    global.storage = new Storage({
        size: 1000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: false,
        sync: {
            alojamientos: syncData(url, 'alojamientos?select=*,categorias(valor),localidades(nombre)'),
            localidades: syncData(url, 'localidades'),
            categorias: syncData(url, 'categorias'),
            clasificaciones: syncData(url, 'clasificaciones'),
            favoritos: []
        }
    })
}

export {initPostgrestStorage}