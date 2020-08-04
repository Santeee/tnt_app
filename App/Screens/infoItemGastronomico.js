import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
// import { RNCamera } from 'react-native-camera';

const GASTRONOMICO_INFO = gql`
    query myQuery($id: Int!) {
        local: gastronomicos_by_pk( id: $id ) {
            domicilio
            nombre
            foto
            localidade {
                nombre
            }
            especialidad_gastronomicos {
                especialidade {
                    nombre
                }
            }
        }
    }
`;

// const PendingView = () => (
//     <View
//         style={{
//         flex: 1,
//         backgroundColor: 'lightgreen',
//         justifyContent: 'center',
//         alignItems: 'center',
//         }}
//     >
//         <Text>Waiting</Text>
//     </View>
// );

const infoItemGastronomico = ({route, navigation}) => {

    const { id } = route.params
    const { loading, error, data } = useQuery(GASTRONOMICO_INFO, {
        variables: {
            id: id
        },
        pollInterval: 5000
    })

    // takePicture = async function(camera) {
    //     const options = { quality: 0.5, base64: true };
    //     const data = await camera.takePictureAsync(options);
    //     console.log(data.uri);
    // };

    return (
        <SafeAreaView style={ styles.content }>
            {loading ? (
                <Text>Cargando datos...</Text>
            ) : error ? (
                <Text>Ocurrió un error al traer los datos...</Text>
            ) : (
                <View>
                    <Button onPress={() => { navigation.goBack()} } title='Volver' />
                    <Text style={ styles.nombre }>{ data.local.nombre }</Text>
                    <Image
                        style={styles.foto}
                        source={{
                            url: data.local.foto
                        }}
                    />
                    <Text>{ data.local.domicilio } - { data.local.localidade.nombre}</Text>
                    <Text style={ styles.tituloFotosPropias }>Especialidades:</Text>
                    { data.local.especialidad_gastronomicos.map( ( {especialidade} )=> (<Text>+ {especialidade.nombre}</Text>) )}
                    <Text style={ styles.tituloFotosPropias }>Fotos propias:</Text>
                    {/* TODO: refactoring para evitar hacerlo manualmente */}
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                        </View>
                        <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                            <Image
                                style={{ width: '30%', height: 100}}
                                source={{
                                    url: `https://cdn2.iconfinder.com/data/icons/interface-icons-line/63/Image-512.png`
                                }}
                            />
                        </View>

                        {/* <View style={styles.container}>
                            <RNCamera
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.on}
                                androidCameraPermissionOptions={{
                                    title: 'Permission to use camera',
                                    message: 'We need your permission to use your camera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}
                                androidRecordAudioPermissionOptions={{
                                    title: 'Permission to use audio recording',
                                    message: 'We need your permission to use your audio',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}
                            >
                            {({ camera, status, recordAudioPermissionStatus }) => {
                                if (status !== 'READY') return <PendingView />;
                                return (
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                    </TouchableOpacity>
                                </View>
                                );
                            }}
                            </RNCamera>
                        </View> */}
                    </View>
                </View>
            )
            }
        </SafeAreaView>
    )
}

export default infoItemGastronomico;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        margin: 20
    },

    nombre: {
        fontWeight: 'bold',
        fontSize: 30
    },

    foto: {
        width: '100%',
        height: '30%'
    },

    tituloFotosPropias: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     backgroundColor: 'black',
    // },
    // preview: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    // },
    // capture: {
    //     flex: 0,
    //     backgroundColor: '#fff',
    //     borderRadius: 5,
    //     padding: 15,
    //     paddingHorizontal: 20,
    //     alignSelf: 'center',
    //     margin: 20,
    // },
})