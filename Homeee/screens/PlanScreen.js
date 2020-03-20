import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';

import { string } from '../strings/en';
import Modal from "react-native-modal";
import NewPlan from '../components/NewPlan';
import PlanItem from '../components/PlanItem';


import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class PlanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            planData: [],
        };
    }

    async componentDidMount() {
        const uid = auth().currentUser.uid;
        database().ref('Users/' + uid + '/Plans/').on("value", snapshot => {
            let data = snapshot.val() ? Object.keys(snapshot.val()) : [];
            let planItem = [...data];
            this.setState({
                planData: planItem.reverse(),
            });
        })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        const { planData } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{string.plan}</Text>
                <Button title="add" onPress={this.toggleModal} />
                <Modal
                    testID={'modal'}
                    isVisible={this.state.isModalVisible}
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
                    <View style={{ width: 250, height: 200 }}>
                        <NewPlan
                            //type='people'
                            username='sonha'
                        />
                        <TouchableOpacity onPress={this.toggleModal} style={styles.buttonClose}>
                            <Text> HIDE </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <ScrollView>
                    {planData.length > 0 ? (
                        planData.map(key => (
                            <PlanItem type='people' username={key} idPlanItem={key} />
                        ))
                    ) : (
                            <Text>No plan yet </Text>
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
        alignContent: 'center'
    }
});

export default PlanScreen;
