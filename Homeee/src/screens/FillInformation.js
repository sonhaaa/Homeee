import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import { District } from '../strings/data';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class FillInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: District,
            value: '',
            districtName: '',
            userName: '',
            townName: '',
        }

    }

    handleSubmit() {
        const uid = auth().currentUser.uid;
        const ref = database().ref(`Users/${uid}`);
        ref.update({
            Username: this.state.userName,
            District: this.state.districtName,
            Town: this.state.townName
        });
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 200 }}>
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
                    <Dropdown
                        label='District or City'
                        data={this.state.data}
                        onChangeText={(districtName) => {
                            this.setState({
                                districtName
                            });
                        }}
                    />
                    <Text style={{ color: 'green', marginTop: 50 }}> {this.state.districtName} </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Town name"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        value={this.state.townName}
                        onChangeText={(townName) => this.setState({ townName })}
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
