import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import RBSheet from "react-native-raw-bottom-sheet";

import FindPeopleAround from './FindPeopleAround';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DiaryScreen from './DiaryScreen';

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
                <TouchableOpacity onPress={() => this.Scrollable.open()} style={styles.find}>
                    <Text>Find</Text>
                </TouchableOpacity>
                <RBSheet
                    ref={ref => {
                        this.Scrollable = ref;
                    }}
                    closeOnDragDown
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    height={550}
                    duration={350}
                >
                    <ScrollView>
                        <FindPeopleAround />
                    </ScrollView>
                </RBSheet>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DiaryScreen')} style={styles.find}>
                    <Text style={{ color: 'white' }} >Diary</Text>
                </TouchableOpacity>
            </View >
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HopeScreen' component={Hope} />
            <Stack.Screen name='FindPeopleAroundScreen' component={FindPeopleAround} />
            <Stack.Screen name='DiaryScreen' component={DiaryScreen} />
        </Stack.Navigator>
    )
}

export default HopeScreen;
