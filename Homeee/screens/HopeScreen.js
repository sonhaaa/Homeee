import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { createStackNavigator } from "@react-navigation/stack";
import RBSheet from "react-native-raw-bottom-sheet";

import FindPeopleAround from './FindPeopleAround';
import DiaryScreen from './DiaryScreen';
import PlanScreen from './PlanScreen';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { color } from '../assets/color/color';
import { string } from '../strings/en';

class Hope extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            welcome: 'Hello',
            colorPalette: 'default',
            isDarkMode: false
        };
    }

    async componentDidMount() {
        const userId = auth().currentUser.uid;
        database().ref('Users/' + userId).on('value', snapshot => this.setState({
            username: snapshot.val().userName,
            colorPalette: snapshot.val().colorPalette,
            isDarkMode: snapshot.val().isDarkMode
        }))

        const date = new Date();
        const getHour = date.getHours();
        if (getHour >= 0 && getHour < 10) {
            this.setState({ welcome: string.goodMorning })
        } else if (getHour >= 10 && getHour < 14) {
            this.setState({ welcome: string.goodNoon })
        } else if (getHour >= 14 && getHour < 18) {
            this.setState({ welcome: string.goodAfternoon })
        } else if (getHour >= 18 && getHour < 22) {
            this.setState({ welcome: string.goodEvening })
        } else if (getHour >= 22 && getHour < 24) {
            this.setState({ welcome: string.goodNight })
        }
    }

    handleFindButton = () => {
        this.props.navigation.navigate('FindPeopleAroundScreen')
    }

    moveToDiaryScreen = () => {
        this.props.navigation.navigate('DiaryScreen')
    }

    moveToPlanScreen = () => {
        this.props.navigation.navigate('PlanScreen')
    }

    render() {
        const { username, welcome, isDarkMode, colorPalette } = this.state
        return (
            <View style={[styles.container, { backgroundColor: isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor }]}>
                <View style={{ margin: 25 }}>
                    <Text style={[styles.headerText, { color: isDarkMode ? color.darkTextColor : color.lightTextColor }]}>{welcome}</Text>
                    <Text style={[styles.username, { color: color[colorPalette].level4 }]}>{username}.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginLeft: 25, marginRight: 25, flex: 1 }}>

                    <View style={{ marginRight: 12, flex: 1 }}>
                        {/* find people */}
                        <TouchableOpacity onPress={this.moveToDiaryScreen} style={{ height: 240, backgroundColor: color[colorPalette].level3, borderRadius: 20, }}>
                            <Text style={{
                                marginLeft: 20,
                                marginTop: 20,
                                color: color.darkTextColor,
                                fontFamily: 'sofialight'
                            }} > {string.diary} </Text>
                            <Text style={{
                                marginLeft: 20,
                                fontSize: 12,
                                color: color[colorPalette].level1,
                                fontFamily: 'sofialight'
                            }} > {string.diaryDescription} </Text>
                            <View style={{ flexDirection: 'row-reverse', marginTop: 30 }}>
                                <Image
                                    style={{
                                        width: 95,
                                        height: 150,
                                    }}
                                    source={require('../assets/imgs/diary.png')}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginLeft: 13, flex: 1 }}>

                        <TouchableOpacity
                            onPress={() => this.Scrollable.open()}
                            style={{
                                height: 200,
                                backgroundColor: color[colorPalette].level2,
                                borderRadius: 20,
                            }}>
                            <Text
                                style={{
                                    margin: 20,
                                    color: color.darkTextColor,
                                    fontFamily: 'sofialight'
                                }}
                            >{string.findHomemate}</Text>
                            <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginLeft: 10 }}>
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    source={require('../assets/imgs/findfriend.png')}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.moveToPlanScreen} style={{ height: 120, width: '100%', backgroundColor: color[colorPalette].level4, marginTop: 25, borderRadius: 20 }}>
                            <Text style={{
                                marginLeft: 20,
                                marginTop: 20,
                                color: color.darkTextColor,
                                fontFamily: 'sofialight'
                            }} > {string.plan} </Text>
                            <Text style={{
                                marginLeft: 20,
                                fontSize: 12,
                                color: color[colorPalette].level1,
                                fontFamily: 'sofialight'
                            }} > {string.planDescription} </Text>
                        </TouchableOpacity>

                    </View>
                </View>


                <RBSheet
                    ref={ref => {
                        this.Scrollable = ref;
                    }}
                    closeOnDragDown
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor
                        }
                    }}
                    height={550}
                    duration={350}

                >
                    <ScrollView style={{ backgroundColor: isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor }}>
                        <FindPeopleAround />
                    </ScrollView>
                </RBSheet>


            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 17,
        fontFamily: 'sofialight'
    },
    username: {
        fontSize: 20,
        fontFamily: 'Sofiabold'
    },
    find: {
        height: 25,
        width: 150,
        backgroundColor: 'pink',
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'sofialight'
    }
});

const Stack = createStackNavigator();

function HopeScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HopeScreen' component={Hope} />
            <Stack.Screen name='FindPeopleAroundScreen' component={FindPeopleAround} />
            <Stack.Screen name='DiaryScreen' component={DiaryScreen} />
            <Stack.Screen name='PlanScreen' component={PlanScreen} />
        </Stack.Navigator>
    )
}

export default HopeScreen;
