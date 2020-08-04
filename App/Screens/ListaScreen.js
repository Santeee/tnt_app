import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListaAlojamientosScreen from './ListaAlojamientosScreen';
import ListaGastronomicosScreen from './ListaGastronomicosScreen';

const BottomTab = createMaterialBottomTabNavigator();

const ListaScreen = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen 
                name="Gastronomicos"
                component={ListaGastronomicosScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="food-fork-drink" color={color} size={30} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Alojamientos"
                component={ListaAlojamientosScreen}
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

export default ListaScreen;