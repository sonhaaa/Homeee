import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
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

import { Root, Popup } from 'popup-ui';
import Reinput from 'reinput';
import Btn from 'react-native-micro-animated-button';

class LoginRegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userData: {},
            isLogin: true,
            registerColor: color.default.level1,
            loginColor: color.default.level5,
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
                .then(() => {
                    this.btn.success(),
                        this.props.navigation.navigate('HomeScreen')
                })
                .catch(function () {

                    Popup.show({
                        type: 'Danger',
                        title: 'Hey!!!',
                        button: false,
                        textBody: 'Cannot login! Please check again.',
                        buttontext: 'Ok',
                        callback: () => Popup.hide()
                    })


                });
        }
        else {
            Popup.show({
                type: 'Warning',
                title: 'Hey!!!',
                button: false,
                textBody: 'Let fill full information',
                buttontext: 'Ok',
                callback: () => Popup.hide()
            }),
                this.btn.reset()
        }
    }

    signUp(email, password) {
        if (this.state.password && this.state.email !== "") {
            auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    this.btn.success()
                    this.storeEmail(JSON.stringify(res.user.email)),
                        this.storePassword(this.state.password),
                        this.writeData(email, password),
                        this.props.navigation.navigate('FillInformationScreen')
                })
                .catch(err => {
                    Popup.show({
                        type: 'Danger',
                        title: 'Hey!!!',
                        button: false,
                        textBody: 'Cannot signup! Please check your email, and password must be > 6 characters.',
                        buttontext: 'Ok',
                        callback: () => Popup.hide()
                    }),
                        this.btn.reset()
                })
        }
        else {
            Popup.show({
                type: 'Warning',
                title: 'Hey!!!',
                button: false,
                textBody: 'Let fill full information',
                buttontext: 'Ok',
                callback: () => Popup.hide()
            }),
                this.btn.reset()
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
        this.setState({ isLogin: false, registerColor: color.default.level5, loginColor: color.default.level1 });
    }

    handleChangeToLogin = () => {
        this.setState({ isLogin: true, loginColor: color.default.level5, registerColor: color.default.level1 })
    }

    render() {
        const { registerColor, loginColor, isLogin } = this.state;
        return (
            <Root>
                <View style={[styles.container]}>

                    <View style={{ flexDirection: 'row', marginLeft: 60 }}>
                        <TouchableOpacity onPress={this.handleChangeToLogin}>
                            <Text style={[styles.loginText, { color: loginColor }]}>{string.login}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingLeft: 15 }}
                            onPress={this.handleChangeToRegister}
                        >
                            <Text style={[styles.registerText, { color: registerColor }]}>{string.register}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingLeft: 60, marginTop: 40, marginBottom: 20 }}>
                        <Reinput
                            style={styles.input}
                            label={string.email}
                            value={this.state.email}
                            onChangeText={this.handleEmail}
                        />
                        <Reinput
                            style={styles.input}
                            label={string.password}
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={this.handlePassword}
                        />
                    </View>
                    {isLogin ? (
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
                            <Btn

                                label={string.login}
                                onPress={() => this.logIn(this.state.email, this.state.password)}
                                ref={ref => (this.btn = ref)}
                                successIcon="check"
                                foregroundColor={color.default.level5}
                            />
                        </View>
                    ) : (
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
                                <Btn
                                    style={styles.submitButton}
                                    label={string.register}
                                    onPress={() => this.signUp(this.state.email, this.state.password)}
                                    ref={ref => (this.btn = ref)}
                                    successIcon="heart"
                                    foregroundColor={color.default.level5}
                                />
                            </View>
                        )}
                </View>
            </Root>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "center",
        backgroundColor: color.lightBackgroundColor
    },
    input: {
        fontFamily: 'sofialight',
        height: 40,
        marginTop: 15,
        width: 250
    },
    submitButton: {
        backgroundColor: 'transparent',
        padding: 10,
        fontFamily: 'Sofiabold',
        alignItems: "center",
        height: 40,
        width: 250,
        //color: color.darkBackgroundColor
    },
    loginText: {
        color: color.default.level5,
        fontFamily: 'Sofiabold',
        fontSize: 15
    },
    registerText: {
        color: 'red',
        fontFamily: 'Sofiabold',
        fontSize: 15
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