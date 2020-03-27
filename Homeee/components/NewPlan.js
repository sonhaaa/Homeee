import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { string } from '../strings/en';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function NewPlan({ type, username, placeName, color1, color2, color3 }) {

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
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder={string.addAction}
                        style={styles.addAction}
                        onChangeText={(action) => setValue(action)}
                        value={action}
                    />
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Text style={{
                            fontFamily: 'sofialight',
                            color: color1
                        }}>{string.with} </Text>
                        <Text style={{
                            fontFamily: 'Sofialight',
                            color: color3
                        }}>{username}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 50, marginBottom: 20 }} >
                        <TouchableOpacity onPress={() => addPlan(`${action} ${string.with} ${username}`, `${placeName}`)}>
                            <View style={{
                                width: 50,
                                height: 50,
                                backgroundColor: color2,
                                borderRadius: 25,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: color1,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontFamily: 'Sofiabold',
                                        color: 'white',
                                        fontSize: 30,
                                        marginBottom: 4
                                    }} >+</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        if (type === "place") {
            return (
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder={string.placeHolder}
                        style={styles.addAction}
                        onChangeText={(action) => setValue(action)}
                        value={action}
                    />

                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Text style={{ fontFamily: 'sofialight', color: color1 }}>{string.at} </Text>
                        <Text style={{ fontFamily: 'Sofialight', color: color3 }}>{placeName}</Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 50, marginBottom: 20 }} >
                        <TouchableOpacity onPress={() => addPlan(`${action}`, `${placeName}`)}>
                            <View style={{ width: 50, height: 50, backgroundColor: color2, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: 30, height: 30, backgroundColor: color1, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: 'Sofiabold', color: 'white', fontSize: 30, marginBottom: 4 }} >+</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        if (type === "normal") {
            return (
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder={string.addAction}
                        style={styles.addAction}
                        onChangeText={(action) => setValue(action)}
                        value={action}
                    />
                    <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 50, marginBottom: 20 }} >
                        <TouchableOpacity onPress={() => addPlan(`${action}`, `${placeName}`)}>
                            <View style={{ width: 50, height: 50, backgroundColor: color2, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: 30, height: 30, backgroundColor: color1, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: 'Sofiabold', color: 'white', fontSize: 30, marginBottom: 4 }} >+</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{
                fontFamily: 'Sofiabold',
                fontSize: 50,
                color: color3,
                margin: 20,
                marginTop: 10
            }}>+</Text>
            <View style={styles.title}>
                {handleTypeOfNewPlan(type)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
        width: '80%',
        height: 35,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        fontFamily: 'sofialight',
        borderRadius: 18,
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        flexDirection: 'row',
    },
    with: {
        fontFamily: 'sofialight',
    },
    username: {
        fontFamily: 'Sofiabold',
        fontSize: 15
    }
});

