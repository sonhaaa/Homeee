import React, { Component } from 'react';
import { View, Text } from 'react-native';

// import Moment from 'moment';

// Moment.locales('en', {
//     months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
//     monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
//     monthsParseExact: true,
//     weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
//     weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
//     weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
//     weekdaysParseExact: true,
// });

class NewPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text>Henlo</Text>
            </View>
        );
    }
}

export default NewPlan;
