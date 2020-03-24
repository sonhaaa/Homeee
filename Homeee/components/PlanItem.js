import React from 'react';
import { View, Text } from 'react-native';

import Swipeout from 'react-native-swipeout';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


export default function PlanItem({ title, place, idPlanItem }) {


    const uid = auth().currentUser.uid;

    const handleDeletePlanItem = () => {
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
                <Text>{title}</Text>
                <Text>At {place}</Text>
            </View>
        </Swipeout>
    )
}