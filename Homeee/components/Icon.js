import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default function Icon({ name, color, size }) {

    const handle = () => {
        if (name === 'hope') {
            return (
                <Image
                    source={require('../assets/imgs/flower.png')}
                    style={{ width: size, height: size }}
                />)
        } else if (name === 'you') {
            return (
                <Image
                    source={require('../assets/imgs/avatar.png')}
                    style={{ width: size, height: size }}
                />)
        } else if (name === 'happy') {
            return (
                <Image
                    source={require('../assets/imgs/smiling.png')}
                    style={{ width: size, height: size }}
                />)
        }
    }

    return (
        handle()
    );

}

