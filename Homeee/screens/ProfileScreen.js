import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { Dropdown } from 'react-native-material-dropdown';

import { districtsData } from '../strings/data';
import { string } from '../strings/en';


export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            currentDistrict: '',
            currentTown: '',
            homeTown: '',
            homeDistrict: '',
            isEdit: false,
            dataDistrict: districtsData,
        };
    }

    changeToEdit = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }

    componentDidMount() {
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid).on('value', snapshot => {
            const snap = snapshot.val();
            this.setState({
                userName: snap.userName,
                currentDistrict: snap.currentDistrict,
                currentTown: snap.currentTown,
                homeTown: snap.homeTown,
                homeDistrict: snap.homeDistrict,
            })
        })
    };

    handleChange = () => {
        console.log('called');

        const uid = auth().currentUser.uid;
        const { currentDistrict, currentTown, userName } = this.state;
        database().ref('Users/' + uid).update({
            userName: userName,
            currentDistrict: currentDistrict,
            currentTown: currentTown,
        }).catch(err => console.log(err))
    }

    render() {
        const { userName, currentDistrict, currentTown, homeDistrict, homeTown, isEdit } = this.state;
        return (
            <View style={styles.container}>
                {isEdit ? (
                    <View>
                        <TextInput
                            style={styles.input}
                            value={userName}
                            onChangeText={(userName) => this.setState({ userName })}
                        />
                        <Dropdown
                            label={string.currentDistrict}
                            data={this.state.dataDistrict}
                            onChangeText={(currentDistrict) => {
                                this.setState({
                                    currentDistrict
                                });
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            value={currentTown}
                            onChangeText={(currentTown) => this.setState({ currentTown })}
                        />
                        <TouchableOpacity style={{ height: 50, width: 300, backgroundColor: 'white' }} onPress={this.handleChange}>
                            <Text> Change </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View>
                            <Text>{userName} </Text>
                            <Text>{homeDistrict} - {homeTown}</Text>
                            <Text>{currentDistrict} - {currentTown}</Text>
                            <TouchableOpacity style={{ height: 50, width: 300, backgroundColor: 'white' }} onPress={this.changeToEdit}>
                                <Text> Edit </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink'
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 0.5,
        borderColor: 'blue'
    },

});

