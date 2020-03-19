import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 5 }}>
                    <MapView
                        style={{ flex: 1 }}
                        region={this.state.region}
                    //onRegionChange={this.onRegionChange}
                    >
                        <Marker draggable
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                        />
                    </MapView>
                </View>

                <Text style={{ flex: 1 }}>abc</Text>
            </View>
        );
    }
}
