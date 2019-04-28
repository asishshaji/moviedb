import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Icon } from 'react-native-elements';

const Header = (props) => (
    <View style={styles.container}>
        <View style={{ marginLeft: 10 }}>
            <Icon
                name='user'
                type='font-awesome'
                color="#6b6e72"
            />
        </View>

        <Text style={{ fontWeight: '900', fontSize: 18 }}>DISCOVER</Text>
        <View style={{ marginRight: 10 }}>
            <Icon
                name='search'
                type='font-awesome'
                color="#6b6e72"
            />
        </View>

    </View>
)
export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',

    }
});