import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, Alert } from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import { District } from '../strings/data';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from './HomeScreen';

import HomeScreen from './HomeScreen';

class FillInformationSceen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDistrict: District,
            value: '',
            homeDistrict: '',
            userName: '',
            homeTown: '',
            currentDistrict: '',
            currentTown: ''
        }

    }

    handleSubmit() {
        const uid = auth().currentUser.uid;
        const ref = database().ref(`Users/${uid}`);
        ref.update({
            userName: this.state.userName,
            homeDistrict: this.state.homeDistrict,
            homeTown: this.state.homeTown,
            currentDistrict: this.state.currentDistrict,
            currentTown: this.state.currentTown,
        });
        this.props.navigation.navigate('HomeScreen')
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            //this.goBack(); // works best when the goBack is async
            BackHandler.exitApp()
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: 300, height: 30 }} >
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Username"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.userName}
                        onChangeText={(userName) => this.setState({ userName })}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Current District"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.currentDistrict}
                        onChangeText={(currentDistrict) => this.setState({ currentDistrict })}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Current Town"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.currentTown}
                        onChangeText={(currentTown) => this.setState({ currentTown })}
                    />
                    <Dropdown
                        label='Home District'
                        data={this.state.dataDistrict}
                        onChangeText={(homeDistrict) => {
                            this.setState({
                                homeDistrict
                            });
                        }}
                    />
                    <Text style={{ color: 'green', marginTop: 50 }}> {this.state.homeDistrict} </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Home Town"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.homeTown}
                        onChangeText={(homeTown) => this.setState({ homeTown })}
                    />
                    <TouchableOpacity style={styles.submit} onPress={() => this.handleSubmit()}>
                        <Text> submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    dropdown: {
        width: '80%',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "black",
        borderWidth: 1
    },
    submit: {
        height: 30,
        width: 200,
        backgroundColor: 'blue'
    }
});


const Stack = createStackNavigator();

function FillInformation() {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='FillInformationSceen' component={FillInformationSceen} i />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default FillInformation;