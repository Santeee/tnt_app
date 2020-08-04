import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import MapaScreen from './Screens/MapaScreen';
import ListaScreen from './Screens/ListaScreen';
import InfoItem from './Screens/InfoItem';
import infoItemGastronomico from './Screens/infoItemGastronomico';
import ListaFavoritosScreen from './Screens/ListaFavoritosScreen'

import { initPostgrestStorage } from './Services/PostgrestService'
initPostgrestStorage('http://192.168.1.12:3000')
const client = new ApolloClient({ uri: 'http://localhost:4000/v1/graphql' });

global.storage.save({
    key: `favoritos`,
    data: [{
        gastronomicos: [{
            id: 1
        }],
        alojamientos: [{
            id: 1
        }]
    }],
    expires: 0
})

const Stack = createStackNavigator();

const App = () => (
    <ApolloProvider client={client}>
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='Mapa'>
                <Stack.Screen name='Mapa' component={MapaScreen}/>
                <Stack.Screen name='Lista' component={ListaScreen}/>
                <Stack.Screen name='InfoItem' component={InfoItem}/>
                <Stack.Screen name='infoItemGastronomico' component={infoItemGastronomico}/>
                <Stack.Screen name='Favoritos' component={ListaFavoritosScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>

);

export default App;