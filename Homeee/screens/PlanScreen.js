import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import { string } from '../strings/en';
import RBSheet from "react-native-raw-bottom-sheet";

import NewPlan from '../components/NewPlan';

class PlanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{string.plan}</Text>
                <TouchableOpacity onPress={() => this.Input.open()} style={styles.button}>
                    <Text style={styles.buttonTitle}>TEXT INPUT</Text>
                </TouchableOpacity>
                <RBSheet
                    ref={ref => {
                        this.Input = ref;
                    }}
                    height={60}
                    animationType="none"
                    duration={200}
                    customStyles={{
                        wrapper: { backgroundColor: "#fff" }
                    }}
                >
                    <View style={styles.inputContainer}>
                        {/* <MDIcon name="photo-camera" style={styles.inputIcon} />
                        <MDIcon name="tag-faces" style={styles.inputIcon} /> */}
                        <TextInput style={styles.input} autoFocus placeholder="Write a comment..." />

                    </View>
                </RBSheet>
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
        fontFamily: 'Sofiabold.ttf',
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
});

export default PlanScreen;
