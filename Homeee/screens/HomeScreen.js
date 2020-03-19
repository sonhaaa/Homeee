import React, { Component } from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HopeScreen from './HopeScreen';
import YouScreen from './YouScreen';
import HappyScreen from './HappyScreen';

import { string } from '../strings/en';

const Tab = createMaterialBottomTabNavigator();

export default class HomeScreen extends Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    inactiveColor='black'
                    activeColor='red'
                    barStyle={{ backgroundColor: 'white', fontFamily: 'Sofiabold' }}
                    backBehavior="initialRoute"
                >
                    <Tab.Screen
                        name={string.hope}
                        component={HopeScreen}
                        options={{ tabBarLabel: 'Hope', tabBarIcon: ({ color }) => (<Icon name='tags' color={color} size={15} />) }}
                    />
                    <Tab.Screen
                        name={string.you}
                        component={YouScreen}
                        options={{ tabBarLabel: 'You', tabBarIcon: ({ color }) => (<Icon name='tags' color={color} size={15} />) }}
                    />
                    <Tab.Screen
                        name={string.happy}
                        component={HappyScreen}
                        options={{ tabBarLabel: 'Happy', tabBarIcon: ({ color }) => (<Icon name='tags' color={color} size={15} />) }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
