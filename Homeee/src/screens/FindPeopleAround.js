import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import database, { firebase } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

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
            allUsersData: {},
            name: []
        };
    };

    getUsername(userId) {
        firebase.database()
            .ref('/Users/' + userId).once('value')
            // .then(snapshot => console.log(snapshot.val().userName));
            .then(snapshot => console.log(snapshot.val().userName));
    }

    filterCurrentDistrict() {
        var ref = firebase.database().ref("Users");
        ref.orderByChild("currentDistrict")
            .equalTo(this.state.currentDistrict)
            .on("child_added", snapshot => this.getUsername(snapshot.key));
        console.log('filterHomeDistrict called');
    }

    getUserPlacesInfoFromRNF() {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/Users/' + userId)
            .once('value')
            .then(snapshot => {
                this.setState({ currentDistrict: snapshot.val().currentDistrict }),
                    this.filterCurrentDistrict()
            })

        console.log('getUserPlacesInfoFromRNF called')
    };

    // getLocation() {
    //     Geolocation.getCurrentPosition(info => {
    //         this.setState({
    //             latitude: info.coords.latitude,
    //             longitude: info.coords.longitude
    //         })
    //     }, err => console.log(err.message), { timeout: 20000, maximumAge: 1000 });
    // };

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
                <Text> latitude: {latitude} </Text>
                <Text> longitude: {longitude} </Text>
                <TouchableOpacity style={styles.findButton} onPress={() => this.getUserPlacesInfoFromRNF()}>
                    <Text style={styles.findText}> FIND </Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
