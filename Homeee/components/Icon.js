import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default function Icon({ name, color, size }) {

    const handle = () => {
        if (name === 'hope') {
            return (
                <View style={{ width: size + 10, height: size + 10, borderRadius: (size + 10) / 2, backgroundColor: color, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={require('../assets/imgs/flower.png')}
                        style={{ width: size, height: size }}
                    />
                </View>
            )
        } else if (name === 'you') {
            return (
                <View style={{ width: size + 10, height: size + 10, borderRadius: (size + 10) / 2, backgroundColor: color, justifyContent: "center", alignItems: "center" }}>

                    <Image
                        source={require('../assets/imgs/avatar.png')}
                        style={{ width: size, height: size }}
                    />
                </View>
            )
        } else if (name === 'happy') {
            return (
                <View style={{ width: size + 10, height: size + 10, borderRadius: (size + 10) / 2, backgroundColor: color, justifyContent: "center", alignItems: "center" }}>

                    <Image
                        source={require('../assets/imgs/smiling.png')}
                        style={{ width: size, height: size }}
                    />
                </View>
            )
        }
    }

    return (
        handle()
    );

}

