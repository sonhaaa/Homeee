import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import FillInformation from './FillInformation';

class LoginRegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        };
    }

    handleEmail = text => {
        this.setState({ email: text });

    };
    handlePassword = text => {
        this.setState({ password: text });
    };

    writeData(email, password) {
        const uid = auth().currentUser.uid;
        const ref = database().ref(`Users/${uid}`);
        ref.set({
            Email: email,
            Password: password,
            onCreate: 'true'
        })
    }

    logIn(email, password) {
        auth().signInWithEmailAndPassword(email, password)
            .then(() =>
                this.props.navigation.navigate('FillInformationScreen')
            )
            .catch(function (error) {
                alert('ko login');
                console.log('err', error);
            });
    }

    signUp(email, password) {
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.writeData(email, password),
                    this.props.navigation.navigate('FillInformationScreen')
            })
            .catch(function (error) {
                // Handle Errors here.
                console.log('err');
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    value={this.state.email}
                    onChangeText={this.handleEmail}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={this.handlePassword}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.logIn(this.state.email, this.state.password)}
                >
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.signUp(this.state.email, this.state.password)}
                >
                    <Text style={styles.submitButtonText}> SignUp </Text>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "black",
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: "black",
        padding: 10,
        margin: 15,
        alignItems: "center",
        height: 40
    },
    submitButtonText: {
        color: "white"
    }
});

const Stack = createStackNavigator();

function LoginRegister() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='LoginRegisterScreen' component={LoginRegisterScreen} />
                <Stack.Screen name='FillInformationScreen' component={FillInformation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default LoginRegister;