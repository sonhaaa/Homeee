import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, BackHandler } from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import { districtsData } from '../strings/data';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from "@react-navigation/stack";

import ChooseColorScreen from './ChooseColorScreen';

import { string } from '../strings/en';

import Btn from 'react-native-micro-animated-button';

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
                <View style={{ width: 300, height: 30 }} >
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder={string.userName}
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.userName}
                        onChangeText={(userName) => this.setState({ userName })}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder={string.currentProvince}
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.currentProvince}
                        onChangeText={(currentProvince) => this.setState({ currentProvince })}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder={string.currentTown}
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.currentTown}
                        onChangeText={(currentTown) => this.setState({ currentTown })}
                    />
                    <Dropdown
                        label={string.homeProvince}
                        data={this.state.dataProvince}
                        onChangeText={(homeProvince) => {
                            this.setState({
                                homeProvince
                            });
                        }}
                    />
                    <Text style={{ color: 'green', marginTop: 50 }}> {this.state.homeProvince} </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder={string.homeTown}
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.homeTown}
                        onChangeText={(homeTown) => this.setState({ homeTown })}
                    />
                    <Btn
                        label={string.addMyInfomation}
                        onPress={() => this.handleSubmit()}
                        ref={ref => (this.btn = ref)}
                        successIcon="check"
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
        backgroundColor: 'white',
    },
    dropdown: {
        width: '80%',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        fontFamily: 'sofialight'
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
            <Stack.Screen name='ChooseColorScreen' component={ChooseColorScreen} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default FillInformation;