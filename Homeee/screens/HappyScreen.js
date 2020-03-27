import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { string } from '../strings/en';
import { color } from '../assets/color/color';

import Modal from "react-native-modal";

import NewPlan from '../components/NewPlan';
import RecommendDetail from './RecommendDetail';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class HappyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddPlanModalVisible: false,
            isMoreModalVisible: false,
            placesId: new Set(),
            placesData: [""],
            colorPalette: 'default',
            isDarkMode: false
        };
    }

    componentDidMount() {
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid).on('value', snapshot => {


            this.setState({
                colorPalette: snapshot.val().colorPalette,
                isDarkMode: snapshot.val().isDarkMode
            })

            const currentProvince = snapshot.val().currentProvince;

            //filter place in same current province
            database().ref('placesData/')
                .orderByChild("province")
                .equalTo(currentProvince)
                .on('child_added', snap => {
                    this.state.placesData.unshift(snap.val())
                    this.setState({
                        placesId: this.state.placesId.add(snap.key),
                        // placesData: this.state.placesData.unshift(snap.val())
                    })

                    // console.log(snap.val())
                });
        })
    }
    handleAddPlan = () => {
        this.setState({ isAddPlanModalVisible: !this.state.isAddPlanModalVisible });
    };

    handleMore = () => {
        this.setState({ isMoreModalVisible: !this.state.isMoreModalVisible });
    };

    getRandom = () => {
        const { placesData } = this.state
        console.log(placesData[Math.floor(Math.random() * placesData.length)].views)
    }

    render() {
        const { isAddPlanModalVisible, isMoreModalVisible, placesData, isDarkMode, colorPalette } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.recommendItem}>

                    {/* {Array.from(this.state.placesId).map(key => (<Text> {key} </Text>))} */}

                    {console.log(placesData[Math.floor(Math.random() * placesData.length)].views)}
                    <Text style={styles.recommendHeader} >{string.recommend}</Text>
                    <Text style={styles.recommendName}>The Coffee House</Text>
                    <Text style={styles.recommendIntro}>... have the food that your country have</Text>
                    <Text style={styles.recommendDescription}>The Coffee House is a coffeshop that you can alksdfasdhga kdjfhgakdjfhgaskjhgjkg</Text>
                    <Text style={styles.recommendAddress}>Address: 346 Hai Chau District</Text>

                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.buttonAction} onPress={this.handleAddPlan}>
                            <Text>+ plan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonAction, { backgroundColor: 'yellow' }]} onPress={this.handleMore}>
                            <Text>more</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Modal
                    testID={'modal'}
                    isVisible={isAddPlanModalVisible}
                    backdropColor="#B4B3DB"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    style={{ alignItems: 'center', justifyContent: "center" }}
                >
                    <View style={{ height: '70%', width: '70%' }}>
                        <NewPlan
                            type='place'
                            placeName='The coffee house'
                            color1={color[colorPalette].level2}
                            color2={color[colorPalette].level3}
                            color3={color[colorPalette].level4}
                        />
                        <TouchableOpacity onPress={this.handleAddPlan} style={styles.buttonClose}>
                            <Text> HIDE </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    isVisible={isMoreModalVisible}
                    backdropColor="#B4B3DB"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    style={{ alignItems: 'center', justifyContent: "center" }}
                >
                    <View style={{ justifyContent: "center", width: '85%', height: '85%' }}>
                        <RecommendDetail />
                        <TouchableOpacity onPress={this.handleMore} style={styles.buttonClose}>
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
        backgroundColor: 'white'
    },
    recommendItem: {
        width: '100%',
        height: 150,
        borderRadius: 15,
        backgroundColor: 'pink',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 18,
        justifyContent: 'center'
    },
    recommendHeader: {
        fontFamily: 'Sofiabold',
        fontSize: 16,
        color: 'gray',
        marginLeft: 15
    },
    recommendName: {
        fontFamily: 'sofiabold',
        fontSize: 20,
        marginLeft: 15
    },
    recommendIntro: {
        fontFamily: 'sofialight',
        fontSize: 10,
        marginLeft: 15
    },
    recommendDescription: {
        fontFamily: 'sofialight',
        marginLeft: 15
    },
    recommendAddress: {
        fontFamily: 'sofialight',
        marginLeft: 15,
        fontSize: 12,
    },
    buttonGroup: {
        flexDirection: 'row-reverse',
    },
    buttonAction: {
        flex: 1,
        backgroundColor: 'red'
    },
    buttonClose: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'white',
        alignItems: "center",
        alignContent: 'center',
        height: '7%'
    }
});

export default HappyScreen;
