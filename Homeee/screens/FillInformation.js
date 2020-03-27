import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, BackHandler } from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import { districtsData } from '../strings/data';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from "@react-navigation/stack";

import ChooseColorScreen from './ChooseColorScreen';

import { color } from '../assets/color/color';
import { string } from '../strings/en';

import Btn from 'react-native-micro-animated-button';
import Reinput from 'reinput';

class FillInformationSceen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvince: districtsData,
            value: '',
            homeProvince: '',
            userName: '',
            homeTown: '',
            currentProvince: '',
            currentTown: ''
        }
    }

    handleSubmit() {

        const uid = auth().currentUser.uid;
        const ref = database().ref(`Users/${uid}`);
        ref.update({
            userName: this.state.userName,
            homeProvince: this.state.homeProvince,
            homeTown: this.state.homeTown,
            currentProvince: this.state.currentProvince,
            currentTown: this.state.currentTown,
        })
            .then(
                this.btn.success(),
                this.props.navigation.navigate('ChooseColorScreen')
            ).catch(err => { this.btn.error(), alert('Ko them duoc, thu lai sau' + err) });
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: '30%', justifyContent: 'center', alignItems: 'center', marginLeft: 70, marginRight: 70 }}>
                    <Reinput
                        style={styles.input}
                        label={string.userName}
                        value={this.state.userName}
                        onChangeText={(userName) => this.setState({ userName })}
                    />
                    <Reinput
                        style={styles.input}
                        label={string.currentProvince}
                        value={this.state.currentProvince}
                        onChangeText={(currentProvince) => this.setState({ currentProvince })}
                    />
                    <Reinput
                        style={styles.input}
                        label={string.currentProvince}
                        value={this.state.currentTown}
                        onChangeText={(currentTown) => this.setState({ currentTown })}
                    />
                    <Reinput
                        style={styles.input}
                        label={string.homeProvince}
                        value={this.state.homeProvince}
                        onChangeText={(homeProvince) => this.setState({ homeProvince })}
                    />
                    <Reinput
                        style={styles.input}
                        label={string.homeTown}
                        value={this.state.homeTown}
                        onChangeText={(homeTown) => this.setState({ homeTown })}
                    />

                    <Btn
                        style={styles.submitButton}
                        label={string.addMyInfomation}
                        onPress={() => this.handleSubmit()}
                        ref={ref => (this.btn = ref)}
                        successIcon="check"
                        foregroundColor={color.default.level5}
                    />

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
        backgroundColor: color.lightBackgroundColor,
    },
    dropdown: {
        width: '80%',
    },
    input: {
        marginTop: 20,
        height: 40,
        width: 210,
        fontFamily: 'sofialight',
        fontSize: 12
    },
    submitButton: {
        backgroundColor: 'transparent',
        padding: 10,
        fontFamily: 'Sofiabold',
        alignItems: "center",
        height: 40,
        width: 210,
        borderColor: color.default.level1,
        color: color.darkBackgroundColor,
        marginTop: 100
    },
});


const Stack = createStackNavigator();

function FillInformation() {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='FillInformationSceen' component={FillInformationSceen} i />
            <Stack.Screen name='ChooseColorScreen' component={ChooseColorScreen} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default FillInformation;