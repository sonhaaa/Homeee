import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

import Pulse from 'react-native-pulse';

import { string } from '../strings/en';

class FindPeopleAround extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 16,
            longitude: 107,
            latitudeDelta: 0.095,
            longitudeDelta: 0.05,
            currentDistrict: '',
            homeTown: '',
            homeDistrict: '',
            allUsersData: {},
            Uids: new Set(),
            usersAround: new Set(),
            isShowPulse: false,
            isShowFindButton: true
        };
    };

    getUsername(userId) {
        return this.state.allUsersData[userId].userName;
    }

    filterUsers(param) {
        const uid = auth().currentUser.uid;
        var ref = database().ref("Users");
        ref.orderByChild(param)
            .equalTo(this.state.currentDistrict)
            .on("child_added", snapshot => { snapshot.key !== uid ? this.setState({ Uids: this.state.Uids.add(snapshot.key) }) : null });
    }

    componentDidMount() {
        database().ref('/Users/')
            .on('value', snapshot => {
                this.setState({ allUsersData: snapshot.val() })
            })
    }

    getUserPlacesInfo() {
        const userId = auth().currentUser.uid;
        database().ref('/Users/' + userId)
            .once('value')
            .then(snapshot => {
                const snapShotVal = snapshot.val();
                this.setState({
                    currentDistrict: snapShotVal.currentDistrict,
                    homeDistrict: snapShotVal.homeDistrict,
                    homeTown: snapShotVal.homeTown
                }),
                    this.filterUsers('currentDistrict');
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
                } else if (this.state.allUsersData[userId].homeDistrict === this.state.homeDistrict) {
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
        const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state;
        const region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.095,
            longitudeDelta: 0.05,
        }
        return (
            <View style={styles.container}>
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
                    <Pulse color='red' numPulses={3} diameter={400} speed={10} duration={1000} />
                ) : (null)}
                <TouchableOpacity style={styles.findButton} onPress={this.findUsersAround}>
                    <Text style={styles.findText}> {string.findHomemate} </Text>
                </TouchableOpacity>
                <View style={{ height: 300, width: 100 }}>
                    <ScrollView>
                        {this.state.Uids.size > 0 ? Array.from(this.state.usersAround).map(item =>
                            (
                                <Text style={{ color: 'red' }}> {item} </Text>
                            )
                        ) : (
                                <Text>Find Again</Text>
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
