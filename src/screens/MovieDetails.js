import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from "react-native";
import { Icon } from 'react-native-elements';

class MovieDetails extends Component {

    static navigationOptions = {
        header: null,
    };




    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        return (
            <View style={styles.container}>
                <ImageBackground
                    style={{ width: '100%', height: 300 }}
                    imageStyle={{ resizeMode: 'cover', backgroundColor: 'black', opacity: 0.7 }}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 24, letterSpacing: 1 }}>{item.title}</Text>
                    </View>
                    <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Icon
                            raised
                            name='calendar'
                            type='evilicon'
                            color='black'

                        />
                        <Text style={{ color: 'black', textAlign: 'right', fontSize: 14, fontWeight: '700' }}>{item.release_date}</Text>
                    </View>

                </ImageBackground>


                <View style={[{ flex: 1 }]}>
                    <Text style={styles.overview}>{item.overview}</Text>
                </View>
            </View>
        );
    }
}
export default MovieDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    test: {
        borderWidth: 5,
        borderColor: 'red',
    },
    overview: {
        padding: 4,
        margin: 5,
        fontSize: 16,
        fontWeight: '300'
    }
});