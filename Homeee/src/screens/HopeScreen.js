import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import FindPeopleAround from './FindPeopleAround';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Hope extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleFindButton = () => {
        this.props.navigation.navigate('FindPeopleAroundScreen')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.find} onPress={() => this.handleFindButton()}>
                    <Text>Find</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    find: {
        height: 25,
        width: 150,
        backgroundColor: 'pink',
        justifyContent: "center",
        alignItems: 'center'
    }
});

const Stack = createStackNavigator();

function HopeScreen() {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HopeScreen' component={Hope} />
            <Stack.Screen name='FindPeopleAroundScreen' component={FindPeopleAround} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default HopeScreen;
