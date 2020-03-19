import React, { Component } from 'react';
import { View, Text } from 'react-native';

class YouScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Text> YouScreen </Text>
            </View>
        );
    }
}

export default YouScreen;
