import React from 'react';
import { View, Text } from 'react-native';

import Swipeout from 'react-native-swipeout';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { color } from '../assets/color/color';


export default function PlanItem({ title, place, idPlanItem, colorLevel1, colorLevel2, colorLevel3 }) {


    const uid = auth().currentUser.uid;

    const handleDeletePlanItem = () => {
        database().ref('Users/' + uid + '/Plans/' + idPlanItem).remove()
    }

    const state = {
        swipeoutBtns: [
            {
                text: '☒',
                backgroundColor: colorLevel2,
                onPress: handleDeletePlanItem,
            }
        ]
    }

    return (
        <Swipeout right={state.swipeoutBtns}
            style={{
                backgroundColor: 'transparent',
                fontFamily: 'sofialight',
                marginTop: 5
            }}>
            <View style={{
                width: '100%',
                height: 70,
                flexDirection: 'row'
            }}>
                <View style={{
                    height: 70,
                    width: 70,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: colorLevel2
                    }} />
                </View>
                <View style={{
                    justifyContent: "center",
                    backgroundColor: color.lightDarkColor,
                    flex: 1,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    paddingLeft: 20
                }}>
                    <Text style={{
                        fontFamily: 'sofialight',
                        color: colorLevel1,
                        fontSize: 17
                    }} >{title}</Text>

                    {place !== 'undefined' ? (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'sofialight', color: colorLevel3 }}>At </Text>
                            <Text style={{ fontFamily: 'sofialight', color: colorLevel1 }}>{place}</Text>
                        </View>
                    ) : (null)}
                </View>
            </View>
        </Swipeout>
    )
}