import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { createStackNavigator } from "@react-navigation/stack";
import RBSheet from "react-native-raw-bottom-sheet";

import FindPeopleAround from './FindPeopleAround';
import DiaryScreen from './DiaryScreen';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { string } from '../strings/en';

class Hope extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }

    componentDidMount() {
        const userId = auth().currentUser.uid;
        database().ref('Users/' + userId).on('value', snapshot => this.setState({ username: snapshot.val().userName }))
    }

    handleFindButton = () => {
        this.props.navigation.navigate('FindPeopleAroundScreen')
    }

    render() {
        const { username } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <Text>{string.goodMorning}</Text>
                    <Text> {username} </Text>
                </View>
                <TouchableOpacity onPress={() => this.Scrollable.open()} style={styles.find}>
                    <Text>{string.findHomemate}</Text>
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
                    <Text style={{ color: 'white' }} > {string.diary} </Text>
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
