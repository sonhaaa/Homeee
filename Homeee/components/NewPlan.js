import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { string } from '../strings/en';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function NewPlan({ type, username }) {
    const [value, setValue] = useState('');
    const addPlan = (title, action) => {
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid + '/Plans').push({
            title: title,
            action: action,
            isDone: false
        })
        setValue({ value: '' })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{string.createNewPlan}</Text>
            <View style={styles.title}>
                <TextInput
                    placeholder={string.addAction}
                    style={styles.addAction}
                    onChangeText={(value) => setValue(value)}
                    value={value}
                />
                {type === 'people' ? (
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.with}>{string.with} </Text>
                        <Text style={styles.username}>{username}</Text>
                    </View>
                ) : (
                        null
                    )}
            </View>
            <TouchableOpacity onPress={() => addPlan('with sonha', value)}>
                <Text>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    header: {
        fontFamily: 'sofialight',
        fontSize: 23,
        margin: 25
    },
    addAction: {
        width: 100,
        height: 35,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        fontFamily: 'sofialight',
        borderRadius: 18
    },
    title: {
        flexDirection: 'row',
        marginLeft: 25
    },
    with: {
        fontFamily: 'sofialight'
    },
    username: {
        fontFamily: 'Sofiabold',
        fontSize: 15
    }
});

