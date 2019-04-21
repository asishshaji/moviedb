import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList
} from "react-native";
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';
import CardView from '../components/CardView';

// const item = {
//     "vote_count": 164,
//     "id": 456740,
//     "video": false,
//     "vote_average": 5.2,
//     "title": "Hellboy",
//     "popularity": 373.147,
//     "poster_path": "/nUXCJMnAiwCpNPZuJH2n6h5hGtF.jpg",
//     "original_language": "en",
//     "original_title": "Hellboy",
//     "genre_ids": [
//         28,
//         12,
//         14
//     ],
//     "backdrop_path": "/5BkSkNtfrnTuKOtTaZhl8avn4wU.jpg",
//     "adult": false,
//     "overview": "Hellboy comes to England, where he must defeat Nimue, Merlin's consort and the Blood Queen. But their battle will bring about the end of the world, a fate he desperately tries to turn away.",
//     "release_date": "2019-04-10"
// }


class MovieDetails extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            movie: []
        }

        // console.log(this.state.movie)
    }

    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.navigation.getParam('item').id}/credits?api_key=168cd3b806908239f3dae5d2a19ee51d`).then(({ data }) => {
            this.setState({ movie: data.cast })
            // console.log(data)
        }).catch((error) => alert(error));

    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        console.log(this.state.movie);

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
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10, marginLeft: 10 }}>
                        <AnimatedCircularProgress
                            size={45}
                            width={5}
                            duration={1500}
                            fill={item.vote_average * 10}
                            tintColor="white"
                            backgroundColor="#bcbcbc" >
                            {() => <Text style={{ color: "white", fontWeight: '600' }}>{item.vote_average * 10}%</Text>}
                        </AnimatedCircularProgress>
                        {/* <Icon
                            raised
                            name='calendar'
                            type='evilicon'
                            color='black'
                        />
                        <Text style={{ color: 'white', textAlign: 'right', fontSize: 18, fontWeight: '700' }}>{item.release_date}</Text> */}
                    </View>
                </ImageBackground>
                <View style={[{ flex: 1 }]}>

                    <Text style={styles.overview}>{item.overview}</Text>
                    <View style={{ marginTop: 15 }}>
                        <FlatList
                            data={this.state.movie}
                            horizontal={true}
                            initialNumToRender = {5}
                            ItemSeparatorComponent={() => <View style={{ width: 6, height: "100%", backgroundColor: 'white' }} />}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(({ item }) => <CardView item={null} fontSize={16} details={true} itemid={item.cast_id} poster_path={item.profile_path} title={item.name} />)}
                        />

                    </View>
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
        fontWeight: '300',
    }
});