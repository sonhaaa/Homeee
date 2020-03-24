import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { string } from '../strings/en';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function NewPlan({ type, username, placeName }) {

    const [action, setValue, place] = useState('');

    const addPlan = (title, place) => {
        const uid = auth().currentUser.uid;

        database().ref('Users/' + uid + '/Plans').push({
            title: title,
            isDone: false,
            place: place
        })
        setValue({ action: '', place: '' })
    }

    const handleTypeOfNewPlan = (type) => {
        if (type === "people") {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        placeholder={string.addAction}
                        style={styles.addAction}
                        onChangeText={(action) => setValue(action)}
                        value={action}
                    />
                    <Text style={styles.with}>{string.with} </Text>
                    <Text style={styles.username}>{username}</Text>
                    <View>
                        <TouchableOpacity onPress={() => addPlan(`${action} ${string.with} ${username}`, `${placeName}`)}>
                            <Text>
                                Add
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        if (type === "place") {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <TextInput
                        placeholder={string.addAction}
                        style={styles.addAction}
                        onChangeText={(action) => setValue(action)}
                        value={action}
                    />
                    <Text style={styles.with}>{string.at} </Text>
                    <Text style={styles.username}>{placeName}</Text>
                    <View>
                        <TouchableOpacity onPress={() => addPlan(`${action} ${string.with} ${username}`, `${placeName}`)}>
                            <Text>
                                Add
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{string.createNewPlan}</Text>
            <View style={styles.title}>

                {handleTypeOfNewPlan(type)}
            </View>


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

