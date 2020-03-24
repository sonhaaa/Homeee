import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './HomeScreen';

import Btn from 'react-native-micro-animated-button';
import { string } from '../strings/en';

import { color } from '../assets/color/color'

import Ripple from 'react-native-material-ripple';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class ChooseColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lv1: '#fff',
            lv2: '#fff',
            lv3: '#fff',
            lv4: '#fff',
            lv5: '#fff',
            colorChoose: '',
            isDarkMode: false,
        };
    }

    changeMode = value => {
        this.setState({ isDarkMode: value });
    };

    pushToFB() {
        const uid = auth().currentUser.uid
        database().ref('Users/' + uid)
            .update({
                colorPalette: this.state.colorChoose,
                isDarkMode: this.state.isDarkMode
            })
            .then(this.props.navigation.navigate('HomeScreen'))
    }

    handleSubmit = () => {
        this.state.colorChoose === '' ? (
            alert('choose color pls'),
            this.btn.reset()
        ) : (this.pushToFB())
    }

    handle = (colorName) => {
        const red = color.redPalette;
        const yellow = color.yellowPalette;
        const blue = color.bluePalette;
        const pink = color.pinkPalette;
        const green = color.greenPalette;
        const purple = color.purplePalette;
        switch (colorName) {
            case 'red':
                this.setState({
                    lv1: red.level1,
                    lv2: red.level2,
                    lv3: red.level3,
                    lv4: red.level4,
                    lv5: red.level5,
                    colorChoose: 'redPalette'
                })
                break;
            case 'yellow':
                this.setState({
                    lv1: yellow.level1,
                    lv2: yellow.level2,
                    lv3: yellow.level3,
                    lv4: yellow.level4,
                    lv5: yellow.level5,
                    colorChoose: 'yellowPalette'
                })
                break;
            case 'blue':
                this.setState({
                    lv1: blue.level1,
                    lv2: blue.level2,
                    lv3: blue.level3,
                    lv4: blue.level4,
                    lv5: blue.level5,
                    colorChoose: 'bluePalette'
                })
                break;
            case 'pink':
                this.setState({
                    lv1: pink.level1,
                    lv2: pink.level2,
                    lv3: pink.level3,
                    lv4: pink.level4,
                    lv5: pink.level5,
                    colorChoose: 'pinkPalette'
                })
                break;
            case 'green':
                this.setState({
                    lv1: green.level1,
                    lv2: green.level2,
                    lv3: green.level3,
                    lv4: green.level4,
                    lv5: green.level5,
                    colorChoose: 'greenPalette'
                })
                break;
            case 'purple':
                this.setState({
                    lv1: purple.level1,
                    lv2: purple.level2,
                    lv3: purple.level3,
                    lv4: purple.level4,
                    lv5: purple.level5,
                    colorChoose: 'purplePalette'
                })
                break;

            default:
                this.setState({
                    lv1: '#fff',
                    lv2: '#fff',
                    lv3: '#fff',
                    lv4: '#fff',
                    lv5: '#fff'
                })
                break;
        }
    }

    render() {
        const { lv1, lv2, lv3, lv4, lv5, isDarkMode } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor }}>
                <Text style={{ color: isDarkMode ? color.darkTextColor : color.lightTextColor }} >{string.chooseFavoriteColor}</Text>

                <Text style={{ fontFamily: 'sofialight' }} >{isDarkMode ? 'Switch is ON' : 'Switch is OFF'}</Text>
                <Switch
                    style={{ marginTop: 30 }}
                    onValueChange={this.changeMode}
                    value={isDarkMode}
                />

                <View>
                    <Ripple
                        style={[styles.options, { backgroundColor: color.redPalette.level5 }]}
                        rippleColor='white'
                        rippleOpacity={0.87}
                        rippleDuration={1200}
                        onPress={() => this.handle('red')}
                    />
                    <Ripple
                        style={[styles.options, { backgroundColor: color.yellowPalette.level5 }]}
                        rippleColor='white'
                        rippleOpacity={0.87}
                        rippleDuration={1200}
                        onPress={() => this.handle('yellow')}
                    />
                    <Ripple
                        style={[styles.options, { backgroundColor: color.pinkPalette.level5 }]}
                        rippleColor='white'
                        rippleOpacity={0.87}
                        rippleDuration={1200}
                        onPress={() => this.handle('pink')}
                    />
                    <Ripple
                        style={[styles.options, { backgroundColor: color.greenPalette.level5 }]}
                        rippleColor='white'
                        rippleOpacity={0.87}
                        rippleDuration={1200}
                        onPress={() => this.handle('green')}
                    />

                    <Ripple
                        style={[styles.options, { backgroundColor: color.purplePalette.level5 }]}
                        rippleColor='white'
                        rippleOpacity={0.87}
                        rippleDuration={1200}
                        onPress={() => this.handle('purple')}
                    />

                    <Ripple
                        style={[styles.options, { backgroundColor: color.bluePalette.level5 }]}
                        rippleColor='white'
                        rippleOpacity={0.87}
                        rippleDuration={1200}
                        onPress={() => this.handle('blue')}
                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: lv5, width: 50, height: 50, borderTopLeftRadius: 25, borderBottomLeftRadius: 25 }} />
                    <View style={{ backgroundColor: lv4, width: 50, height: 50 }} />
                    <View style={{ backgroundColor: lv3, width: 50, height: 50 }} />
                    <View style={{ backgroundColor: lv2, width: 50, height: 50 }} />
                    <View style={{ backgroundColor: lv1, width: 50, height: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25 }} />
                </View>

                <Btn
                    label={string.addMyInfomation}
                    onPress={() => this.handleSubmit()}
                    ref={ref => (this.btn = ref)}
                    successIcon="check"
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.lightBackgroundColor
    },
    options: {
        height: 20,
        width: 20,
        borderRadius: 10
    },
    red: {

    }
});

const Stack = createStackNavigator();

function ChooseColorScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ChooseColorScreen' component={ChooseColor} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} i />
        </Stack.Navigator>
    )
}

export default ChooseColorScreen;
