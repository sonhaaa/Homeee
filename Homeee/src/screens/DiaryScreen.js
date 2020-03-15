import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

class DiaryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputNewDiary: '',
        };
    }

    getCurrentDay = () => {
        const day = new Date();
        return `${day.getDate()}|${day.getMonth() + 1}|${day.getFullYear()}`;
    }

    createNewDiary = () => {
        const currentDay = this.getCurrentDay();
        const userId = auth().currentUser.uid;
        const ref = database().ref('Users/' + userId + '/Diaries/' + currentDay);
        ref.update({
            content: this.state.inputNewDiary
        });
        this.setState({ inputNewDiary: '' })
    };

    render() {
        const { inputNewDiary } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.diary}>Diary</Text>
                <View style={styles.createNewDiaryField}>
                    <TextInput
                        style={styles.inputField}
                        placeholder='How your day'
                        multiline={true}
                        value={inputNewDiary}
                        onChangeText={newDiary => this.setState({ inputNewDiary: newDiary })}
                    />
                    <Button
                        title='add'
                        style={styles.addNewDiary}
                        onPress={this.createNewDiary}
                    />
                </View>

                <View style={styles.createdDiaries}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    diary: {
        fontSize: 20,
        flex: 1
    },
    createNewDiaryField: {
        flex: 2,
    },
    inputField: {
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 0.5,
        flex: 2,
        padding: 20
    },
    addNewDiary: {
        flex: 1
    },
    createdDiaries: {
        flex: 5,
        backgroundColor: 'yellow'
    }
});

export default DiaryScreen;
