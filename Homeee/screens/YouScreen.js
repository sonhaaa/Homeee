import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { string } from '../strings/en';

import { v4 as uuidv4 } from 'uuid';
import Modal from "react-native-modal";

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import ImageLayout from "react-native-image-layout";

import ProfileScreen from './ProfileScreen';

import { RNCamera } from 'react-native-camera';

class YouScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUsername: '',
            isModalVisible: false,
            uri: null,
        };
    }

    componentDidMount() {
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid).on('value', snapshot => this.setState({ currentUsername: snapshot.val().userName }))
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };


    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.setState({ uri: data.uri })
        }
    };


    render() {
        const { currentUsername } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 2 }}>
                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                        <Text style={styles.currentUsername}>{currentUsername}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.toggleModal}>
                            <Text>{string.profile}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text>{string.contact}</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                {/* <Image
                    source={{ uri: this.state.uri }}
                    height={80}
                    width={60}
                /> */}
                <View style={{ flex: 3 }}>
                    <ImageLayout
                        images={[
                            { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                            {
                                id: "blpccx4cn",
                                uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg"
                            },
                            {
                                uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg"
                            },
                            { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg" },
                            { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                            { uri: "https://images.pexels.com/photos/3363331/pexels-photo-3363331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
                        ]}
                        spacing={3}
                        imageContainerStyle={styles.imageStyle}
                    />
                </View>

                {/* <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View> */}

                <Modal
                    testID={'modal'}
                    isVisible={this.state.isModalVisible}
                    backdropColor="white"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    style={{ alignItems: 'center', justifyContent: "center" }}
                >
                    <View style={{ width: '85%', height: '85%' }}>
                        <ProfileScreen />
                        <TouchableOpacity onPress={this.toggleModal} style={styles.buttonClose}>
                            <Text> HIDE </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 250,
        backgroundColor: 'pink'
    },
    currentUsername: {
        fontFamily: 'Sofiabold',
        fontSize: 20
    },
    galeryContainer: {
        flex: 1,
    },
    imageStyle: {
        borderRadius: 20,
    },
    buttonClose: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'white',
        alignItems: "center",
        alignContent: 'center',
        height: 30
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
})

export default YouScreen;
