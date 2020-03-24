import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';

import { string } from '../strings/en';
import { color } from '../assets/color/color';

import Modal from "react-native-modal";
import NewPlan from '../components/NewPlan';
import PlanItem from '../components/PlanItem';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Ripple from 'react-native-material-ripple';

class PlanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            allPlanId: [],
            uid: '',
            title: '',
            planData: {},
            colorPalette: 'redPalette',
            isDarkMode: false
        };
    }

    async componentDidMount() {
        const uid = auth().currentUser.uid;
        this.setState({ uid: uid })
        database().ref('Users/' + uid + '/Plans/').on("value", snapshot => {
            let data = snapshot.val() ? Object.keys(snapshot.val()) : [];
            let planItem = [...data];
            this.setState({
                allPlanId: planItem.reverse(),
                planData: snapshot.val()
            });
        })
        database().ref('Users/' + uid).on('value', snapshot => this.setState({
            colorPalette: snapshot.val().colorPalette,
            isDarkMode: snapshot.val().isDarkMode
        }))
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        const { allPlanId, planData, isDarkMode, colorPalette } = this.state;
        return (
            <View style={[styles.container, { backgroundColor: isDarkMode ? color.darkBackgroundColor : color.lightBackgroundColor }]}>
                <Text style={[styles.header, { color: color[colorPalette].level5 }]}>{string.plan}</Text>
                <Ripple
                    style={{ backgroundColor: color[colorPalette].level4, width: 200, height: 50 }}
                    rippleColor={color[colorPalette].level2}
                    rippleOpacity={0.87}
                    rippleDuration={1200}
                    onPress={() => this.toggleModal()}
                >
                    <Text style={{ fontFamily: 'sofiabold', color: color.darkTextColor }} > Add </Text>
                </Ripple>
                {/* <Button title="add" onPress={} /> */}
                <Modal
                    testID={'modal'}
                    isVisible={this.state.isModalVisible}
                    backdropColor={color.backdropColor}
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    style={{ alignItems: 'center', justifyContent: "center" }}
                >
                    <View style={{ width: 250, height: 200 }}>
                        <NewPlan
                            type='people'
                            username='sonha'
                        />
                        <TouchableOpacity onPress={this.toggleModal} style={styles.buttonClose}>
                            <Text> {string.close} </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <ScrollView>
                    {allPlanId.length > 0 ? (
                        allPlanId.map(idPlan => (
                            <PlanItem idPlanItem={idPlan} title={planData[idPlan].title} place={planData[idPlan].place} />
                        ))
                    ) : (
                            <Text style={{ color: color[colorPalette].level2, fontFamily: 'sofialight' }} >No plan yet </Text>
                        )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontFamily: 'Sofiabold',
        fontSize: 30,
        margin: 20
    },
    inputContainer: {
        borderTopWidth: 1.5,
        borderTopColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    inputIcon: {
        fontSize: 24,
        color: "#666",
        marginHorizontal: 5
    },
    inputIconSend: {
        color: "#006BFF"
    },
    input: {
        flex: 1,
        height: 36,
        borderRadius: 36,
        paddingHorizontal: 10,
        backgroundColor: "#f1f1f1",
        marginHorizontal: 10
    },
    buttonClose: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'white',
        alignItems: "center",
        alignContent: 'center',
        height: 25
    }
});

export default PlanScreen;
