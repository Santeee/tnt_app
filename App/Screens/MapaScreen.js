import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MapaGastronomicosScreen from './MapaGastronomicosScreen';
import MapaAlojamientosScreen from './MapaAlojamientosScreen';

const BottomTab = createMaterialBottomTabNavigator();

const MapaScreen = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Gastronomicos"
                component={MapaGastronomicosScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="food-fork-drink" color={color} size={30} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Alojamientos"
                component={MapaAlojamientosScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bed-empty" color={color} size={30} />
                        ),
                    }}
            />
        </BottomTab.Navigator>
    )
}

export default MapaScreen;