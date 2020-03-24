import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { string } from "../strings/en";

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class RecommendDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        return (
            <View style={styles.container}>
                {console.log(this.state.placesData)}
                <Text>{string.recommend}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    }
});

export default RecommendDetail;
