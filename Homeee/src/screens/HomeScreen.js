import React, { Component } from 'react';
// import { BackHandler, Alert } from "react-native";

import { NavigationContainer, } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HopeScreen from './HopeScreen';
import YouScreen from './YouScreen';
import HappyScreen from './HappyScreen';

const Tab = createMaterialBottomTabNavigator();

export default class HomeScreen extends Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    initialRouteName='Hope'
                    inactiveColor='black'
                    activeColor='red'
                    barStyle={{ backgroundColor: 'white' }}
                    backBehavior="initialRoute"
                >
                    <Tab.Screen
                        name="Hope"
                        component={HopeScreen}
                        options={{ tabBarLabel: 'Hope', tabBarIcon: ({ color }) => (<Icon name='tags' color={color} size={15} />) }}
                    />
                    <Tab.Screen
                        name="You"
                        component={YouScreen}
                        options={{ tabBarLabel: 'You', tabBarIcon: ({ color }) => (<Icon name='tags' color={color} size={15} />) }}
                    />
                    <Tab.Screen
                        name="Happy"
                        component={HappyScreen}
                        options={{ tabBarLabel: 'Happy', tabBarIcon: ({ color }) => (<Icon name='tags' color={color} size={15} />) }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
