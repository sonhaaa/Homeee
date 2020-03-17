import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import FillInformation from './FillInformation';
import HomeScreen from './HomeScreen';

import PushNotificationConfig from '../utils/PushNotificationConfig';

import { color } from '../assets/color/color';
import { string } from '../strings/en';

import { Root, Popup } from 'popup-ui'
// import RNShineButton from 'react-native-shine-button'

class LoginRegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userData: {},
            processing: '',
            visible: false,
            isLogin: true,
            registerColor: 'red',
            loginColor: 'green',
            isDarkMode: false,
            backgroundColor: color.lightBackgroundColor
        };
    }

    changeMode = value => {
        this.setState({ isDarkMode: value });
    };

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
            onCreate: 'true',
        })
    }

    async storeEmail(userEmail) {
        try {
            await AsyncStorage.setItem('userEmail', userEmail)
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    async storePassword(userPasword) {
        try {
            await AsyncStorage.setItem('userPassword', userPasword)
        } catch (err) {
            console.log(err);
        }
    }

    async getToken() {
        try {
            let getEmail = await AsyncStorage.getItem('userEmail');
            let userPassword = await AsyncStorage.getItem('userPassword');
            let userEmail = JSON.parse(getEmail);
            this.setState({ email: userEmail, password: userPassword })
        } catch (err) {
            console.log('Error: ', err);
        }
    }

    componentDidMount() {
        this.getToken();
    }

    logIn(email, password) {
        if (this.state.email && this.state.password !== "") {
            auth().signInWithEmailAndPassword(email, password)
                .then(() =>
                    this.props.navigation.navigate('HomeScreen')
                )
                .catch(function () {
                    Alert.alert(
                        'Khong the Dang Nhap',
                        'My Alert Msg',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('cancel pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                });
        }
        else {
            alert('Pls dien day du')
            //this.handleShowToast()
        }
    }

    signUp(email, password) {
        if (this.state.password && this.state.email !== "") {
            auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    this.storeEmail(JSON.stringify(res.user.email)),
                        this.storePassword(this.state.password),
                        this.writeData(email, password),
                        this.props.navigation.navigate('FillInformationScreen')
                })
                .catch(function (err) {
                    // Handle Errors here.
                    Alert.alert(
                        'Khong the dang ki',
                        'My Alert Msg',
                        [
                            {
                                text: 'Cancel',
                                // onPress: () => this.setState({ processing: 'Check lai ...' }),
                                onPress: () => console.log('Ask me later pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                    console.log(err);

                })
        }
        else {
            alert('ple check lai nhe')

        }
    }

    handleNoti() {
        const config = PushNotificationConfig.configure();
        var up = this.state.count + 1;
        this.setState({ count: up })
        config.localNotificationSchedule({
            message: 'hello',
            color: "red",
            bigText: "My big text that will be shown when notification is expanded",
            subText: "This is a subText",
            ticker: "My Notification Ticker",
            date: new Date(Date.now() + 1000)
        });
    }

    handleChangeToRegister = () => {
        this.setState({ isLogin: false, registerColor: 'green', loginColor: 'red' });
    }

    handleChangeToLogin = () => {
        this.setState({ isLogin: true, loginColor: 'green', registerColor: 'red' })
    }

    render() {
        const { registerColor, loginColor, isLogin, isDarkMode } = this.state;
        return (
            <Root>
                <View style={[styles.container,
                { backgroundColor: isDarkMode ? (color.darkBackgroundColor) : (color.lightBackgroundColor) }]}>
                    <Text>{isDarkMode ? 'Switch is ON' : 'Switch is OFF'}</Text>
                    <Switch
                        style={{ marginTop: 30 }}
                        onValueChange={this.changeMode}
                        value={isDarkMode}
                    />
                    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                        <TouchableOpacity onPress={this.handleChangeToLogin}>
                            <Text style={{ color: loginColor }}>{string.login}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingLeft: 15 }} onPress={this.handleChangeToRegister}>
                            <Text style={{ color: registerColor }}>{string.register}</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder={string.email}
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder={string.password}
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                    />

                    <View>
                        <TouchableOpacity
                            onPress={() =>
                                Popup.show({
                                    type: 'Danger',
                                    title: 'Upload complete',
                                    button: false,
                                    textBody: 'Congrats! Your upload successfully done',
                                    buttontext: 'Ok',
                                    callback: () => Popup.hide()
                                })
                            }
                        >
                            <Text>Open Popup</Text>
                        </TouchableOpacity>
                    </View>


                    {/* <RNShineButton
                    shape={'heart'}
                    color={'#808080'}
                    fillColor={'#ff0000'}
                    size={100}
                /> */}
                    {isLogin ? (
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => this.logIn(this.state.email, this.state.password)}
                        >
                            <Text style={styles.submitButtonText}> {string.login} </Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => { this.signUp(this.state.email, this.state.password) }}
                            >
                                <Text style={styles.submitButtonText}> {string.register} </Text>
                            </TouchableOpacity>
                        )}
                </View></Root>
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
        // margin: 15,
        height: 40,
        borderColor: "black",
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: "black",
        padding: 10,
        // margin: 15,
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
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name='LoginRegisterScreen' component={LoginRegisterScreen} />
                <Stack.Screen name='FillInformationScreen' component={FillInformation} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default LoginRegister;