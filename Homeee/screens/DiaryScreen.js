import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

import Btn from 'react-native-micro-animated-button';

class DiaryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputNewDiary: '',
            diariesData: [],
            currentDay: '',
        };
    };

    async componentDidMount() {
        const userId = auth().currentUser.uid;
        database().ref('Users/' + userId + '/Diaries/').on("value", snapshot => {
            let data = snapshot.val() ? Object.keys(snapshot.val()) : [];
            let diaryItems = [...data];
            this.setState({
                diariesData: diaryItems,
            });
        });
    }

    getCurrentDay = () => {
        const day = new Date();
        return `${day.getDate()}|${day.getMonth() + 1}|${day.getFullYear()}`;
    }

    pushNewDiary = () => {
        const currentDay = this.getCurrentDay();
        const userId = auth().currentUser.uid;
        const content = this.state.inputNewDiary;
        const ref = database().ref('Users/' + userId + '/Diaries/' + currentDay);
        ref.push({
            content: content
        });
        this.setState({ inputNewDiary: '' })
    }

    createNewDiary = () => {
        this.state.inputNewDiary === "" ? alert('Dien day du pls') : (
            this.btn.success(),
            this.pushNewDiary(),
            this.btn.reset()
        )
    };

    render() {
        const { inputNewDiary, diariesData } = this.state;
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
                    <Btn
                        label="add"
                        onPress={this.createNewDiary}
                        ref={ref => (this.btn = ref)}
                        successIcon="check"
                    />
                </View>

                <ScrollView>
                    {diariesData.length > 0 ? (
                        diariesData.map(key => (<Text style={{ color: 'black' }}> {key} </Text>))
                    ) : (
                            <Text>No diary yet </Text>
                        )}
                </ScrollView>
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
