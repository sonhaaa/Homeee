import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Swipeout from 'react-native-swipeout';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


export default function PlanItem({ type, username, place, idPlanItem }) {

    const handleDeletePlanItem = () => {
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid + '/Plans/' + idPlanItem).remove()
    }

    const state = {
        swipeoutBtns: [
            {
                text: 'Delete',
                backgroundColor: 'red',
                onPress: handleDeletePlanItem
            }
        ]
    }

    return (
        <Swipeout right={state.swipeoutBtns} >
            <View style={{ width: 200, height: 50 }}>
                <Text>{username}</Text>
            </View>
        </Swipeout>
    )
}