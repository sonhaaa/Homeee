import React, { Component } from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from '../components/Icon';

import HopeScreen from './HopeScreen';
import YouScreen from './YouScreen';
import HappyScreen from './HappyScreen';

import { string } from '../strings/en';

import { color } from '../assets/color/color';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'

const Tab = createMaterialBottomTabNavigator();

export default class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            colorPalette: 'default',
            isDarkMode: false
        }
    }

    componentDidMount() {
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid).on('value', snapshot => this.setState({
            colorPalette: snapshot.val().colorPalette,
            isDarkMode: snapshot.val().isDarkMode
        }))
    }

    render() {
        const { colorPalette, isDarkMode } = this.state
        return (
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    inactiveColor={isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor}
                    activeColor={color[colorPalette].level5}
                    barStyle={{
                        backgroundColor: isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor,
                        fontFamily: 'Sofiabold',
                        borderTopLeftRadius: 20
                    }}
                    style={{ fontFamily: 'sofialight' }}
                    backBehavior="initialRoute"
                >
                    <Tab.Screen
                        name={string.hope}
                        component={HopeScreen}
                        options={{ tabBarLabel: 'Hope', tabBarIcon: ({ color }) => (<Icon name='hope' color={color} size={18} />) }}
                    />
                    <Tab.Screen
                        name={string.you}
                        component={YouScreen}
                        options={{ tabBarLabel: 'You', tabBarIcon: ({ color }) => (<Icon name='you' color={color} size={18} />) }}
                    />
                    <Tab.Screen
                        name={string.happy}
                        component={HappyScreen}
                        options={{ tabBarLabel: 'Happy', tabBarIcon: ({ color }) => (<Icon name='happy' color={color} size={18} />) }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
