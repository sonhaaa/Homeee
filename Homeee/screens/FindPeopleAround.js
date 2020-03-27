import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

import Pulse from 'react-native-pulse';

import { color } from '../assets/color/color';
import { string } from '../strings/en';

class FindPeopleAround extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 16,
            longitude: 107,
            latitudeDelta: 0.095,
            longitudeDelta: 0.05,
            currentProvince: '',
            homeTown: '',
            homeProvince: '',
            allUsersData: {},
            Uids: new Set(),
            usersAround: new Set(),
            isShowPulse: false,
            isShowFindButton: true,
            colorPalette: 'default',
            isDarkMode: false
        };
    };

    getUsername(userId) {
        return this.state.allUsersData[userId].userName;
    }

    filterUsers(param) {
        const uid = auth().currentUser.uid;
        var ref = database().ref("Users");
        ref.orderByChild(param)
            .equalTo(this.state.currentProvince)
            .on("child_added", snapshot => { snapshot.key !== uid ? this.setState({ Uids: this.state.Uids.add(snapshot.key) }) : null });
    }

    componentDidMount() {
        database().ref('/Users/')
            .on('value', snapshot => {
                this.setState({ allUsersData: snapshot.val() })
            })
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid).on('value', snapshot => this.setState({
            colorPalette: snapshot.val().colorPalette,
            isDarkMode: snapshot.val().isDarkMode
        }))
    }

    getUserPlacesInfo() {
        const userId = auth().currentUser.uid;
        database().ref('/Users/' + userId)
            .once('value')
            .then(snapshot => {
                const snapShotVal = snapshot.val();
                this.setState({
                    currentProvince: snapShotVal.currentProvince,
                    homeProvince: snapShotVal.homeProvince,
                    homeTown: snapShotVal.homeTown
                }),
                    this.filterUsers('currentProvince');
            })
    };

    renderUser = (uid) => {
        const ref = database().ref('Users/' + uid)
        ref.on('value', snapshot => { <Text> {snapshot.val().userName} </Text> })
    }

    findUsersAround = () => {
        const currentUserId = auth().currentUser.uid;
        this.setState({ isShowPulse: !this.state.isShowPulse })
        this.getUserPlacesInfo();
        this.state.Uids.forEach(userId => {
            if (userId !== currentUserId) {
                if (this.state.allUsersData[userId].homeTown === this.state.homeTown) {
                    this.state.usersAround.add(this.getUsername(userId))
                } else if (this.state.allUsersData[userId].homeProvince === this.state.homeProvince) {
                    this.state.usersAround.add(this.getUsername(userId))
                }
            }
        })
    }

    getLocation() {
        Geolocation.getCurrentPosition(info => {
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
        }, err => console.log(err.message), { timeout: 20000, maximumAge: 1000 });
    };

    onRegionChange(region) {
        this.setState({ region });
    };

    render() {
        const { latitude, longitude, latitudeDelta, longitudeDelta, isDarkMode, colorPalette } = this.state;
        const region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.095,
            longitudeDelta: 0.05,
        }
        return (
            <View style={[styles.container, { backgroundColor: isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor }]}>
                {/* {this.getLocation()} */}
                {/* <View style={styles.map}>
                    <MapView
                        style={{ flex: 3, width: 250, height: 300 }}
                        region={region}
                    >
                        <Marker
                            draggable
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: longitudeDelta,
                            }}
                            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                        />
                    </MapView>
                </View> */}
                {this.state.isShowPulse ? (
                    <Pulse color={color[colorPalette].level5} numPulses={5} diameter={400} speed={10} duration={1000} />
                ) : (null)}

                <TouchableOpacity style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                    backgroundColor: color[colorPalette].level3,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 50
                }}
                    onPress={this.findUsersAround}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: color[colorPalette].level2, justifyContent: "center", alignItems: 'center' }}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('../assets/imgs/find.png')}
                        />
                    </View>

                </TouchableOpacity>
                <View style={{
                    height: 300, width: '100%', justifyContent: "center", alignItems: "center", marginTop: 50
                }}>
                    <ScrollView>
                        {this.state.Uids.size > 0 ? Array.from(this.state.usersAround).map(item =>
                            (
                                <Text style={{ color: 'red' }}> {item} </Text>
                            )
                        ) : (
                                <Text style={{ fontFamily: 'sofialight', color: color[colorPalette].level3 }} >Seem like you are the one here</Text>
                            )}
                    </ScrollView>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    findButton: {
        height: 50,
        width: 290,
        backgroundColor: 'red',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    findText: {
        color: 'white'
    }
});

export default FindPeopleAround;
