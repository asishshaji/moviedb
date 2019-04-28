import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList
} from "react-native";
import { Button } from 'react-native-elements';
import axios from 'axios';
import CardView from '../components/CardView';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Transition } from 'react-navigation-fluid-transitions'

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
const genreList = [{
    "id": 28,
    "name": "Action"
},
{
    "id": 12,
    "name": "Adventure"
},
{
    "id": 16,
    "name": "Animation"
},
{
    "id": 35,
    "name": "Comedy"
},
{
    "id": 80,
    "name": "Crime"
},
{
    "id": 99,
    "name": "Documentary"
},
{
    "id": 18,
    "name": "Drama"
},
{
    "id": 10751,
    "name": "Family"
},
{
    "id": 14,
    "name": "Fantasy"
},
{
    "id": 36,
    "name": "History"
},
{
    "id": 27,
    "name": "Horror"
},
{
    "id": 10402,
    "name": "Music"
},
{
    "id": 9648,
    "name": "Mystery"
},
{
    "id": 10749,
    "name": "Romance"
},
{
    "id": 878,
    "name": "Science Fiction"
},
{
    "id": 10770,
    "name": "TV Movie"
},
{
    "id": 53,
    "name": "Thriller"
},
{
    "id": 10752,
    "name": "War"
},
{
    "id": 37,
    "name": "Western"
}];

const findGenre = (ids) => {
    var genres = [];
    for (var i = 0; i <= genreList.length - 1; i++) {
        for (var j = 0; j <= ids.length - 1; j++) {
            if (parseInt(genreList[i].id) === ids[j]) {
                genres.push(genreList[i].name);

            }
        }
    }

    return genres;
}


class MovieDetails extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            noOfItems: 5,
            load: false,
            dataloaded: false
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
        var load = null;
        if (!this.state.load && this.state.dataloaded) {
            load = <Button
                buttonStyle={{ width: 100, marginLeft: 5, borderRadius: 20, backgroundColor: "#bfbfbf", borderColor: "#aaa9a9", elevation: 5 }}
                title="Load more"
                onPress={() => this.setState({ noOfItems: this.state.movie.length, load: !this.state.load })}
            />
        }

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground
                    style={{ width: '100%', height: "100%" }}
                    imageStyle={{ resizeMode: 'cover', backgroundColor: 'black', opacity: 0.7, height: 170 }}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
                >



                    <View style={{
                        flex: 1, alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <View style={styles.cardView}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.imageholder}>
                                    <Transition shared="paper">
                                        <ImageBackground style={{ width: 100, height: 150, resizeMode: 'cover', position: 'absolute', top: -25, borderRadius: 10, left: 20 }}
                                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                            imageStyle={{ borderRadius: 4 }}
                                        >

                                        </ImageBackground>
                                    </Transition>
                                </View>
                                <View style={styles.detailholder}>
                                    <Text style={{ fontWeight: '900', fontSize: 20, color: '#5c5c5e', textAlign: 'left' }}>{item.title}</Text>
                                    <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
                                        <Rating
                                            type='star'
                                            ratingCount={5}
                                            imageSize={15}
                                            startingValue={item.vote_average / 2}
                                            showRating={false}
                                            readonly={true}

                                        />
                                    </View>
                                    <Text style={{ color: '#969696', marginTop: 5 }}>{item.vote_count} Ratings</Text>
                                    <Text style={{ color: "#969696", fontWeight: '400', marginTop: 3 }}>{findGenre(item.genre_ids).map(
                                        (itm, i) => {
                                            if (item.genre_ids != undefined) {
                                                if (i == item.genre_ids.length - 1) {
                                                    return itm
                                                }
                                                else {
                                                    return itm + " | "
                                                }
                                            }
                                        }

                                    )}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 50 }}>
                                <Text style={styles.overview}>{item.overview}</Text>
                            </View>
                            <View style={{ marginBottom: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', marginLeft: 0, marginRight: 0 }}>
                                <FlatList
                                    data={this.state.movie.splice(0, this.state.noOfItems)}
                                    horizontal={true}
                                    initialNumToRender={4}
                                    ItemSeparatorComponent={() => <View style={{ width: 6, height: "100%", backgroundColor: 'white' }} />}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={(({ item }) => <CardView item={null} fontSize={16} details={true} itemid={item.cast_id} poster_path={item.profile_path} title={item.name} />)}
                                />
                                <View style={{ alignItems: 'center' }}>
                                    {load}
                                </View>
                            </View>

                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}
export default MovieDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efefef",
    },
    test: {
        borderWidth: 5,
        borderColor: 'red',
    },
    overview: {
        padding: 4,
        margin: 5,
        fontSize: 14,
        fontWeight: "400",
        color: '#7a7a7a',
    },
    cardView: {
        backgroundColor: 'white',
        width: "93%",
        borderRadius: 5,

    }, imageholder: {
        flex: 1,
        position: 'relative',
        borderRadius: 3,
        borderColor: 'red'
    },
    detailholder: {
        flex: 2,
        marginLeft: 10,

    }
});