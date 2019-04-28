import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import { Transition } from 'react-navigation-fluid-transitions'
// 
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

const HomeCard = (props) => {

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => props.customprops.navigation.navigate(
            'MovieDetails', {
                item: props.item
            }
        )}>
            <View style={styles.container}>
                <View style={styles.imageholder}>
                    <Transition shared="paper">
                        <ImageBackground style={{ width: 100, height: 150, resizeMode: 'cover', position: 'absolute', top: -15, borderRadius: 10, left: 10 }}
                        source={{ uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}` }}
                        imageStyle={{ borderRadius: 4 }}
                    >
                        <View style={{ flex: 1 }}>

                            <View style={styles.starrating}>
                                <Text style={{ textAlign: 'center', fontWeight: '600' }}>{props.item.vote_average}</Text>
                            </View>

                        </View>
                    </ImageBackground>
                        </Transition>

            </View>
            <View style={styles.detailholder}>
                <Text style={{ fontWeight: '700', marginTop: 10, color: 'black' }}>{props.item.original_title}</Text>
                <Text style={{ color: "#969696", fontWeight: '400', marginTop: 5 }}>{findGenre(props.item.genre_ids).map(
                    (item, i) => {
                        if (i == props.item.genre_ids.length - 1) {
                            return item
                        }
                        else {
                            return item + " | "
                        }
                    }

                )}</Text>
                <Text style={{ color: "#969696", fontWeight: '400', marginTop: 2 }}>{props.item.release_date}</Text>
            </View>
            </View>
        </TouchableOpacity >
    )
}
export default HomeCard;

const styles = StyleSheet.create({
    container: {
        height: 150,
        marginLeft: 10,
        backgroundColor: 'white',
        marginRight: 10,
        marginTop: 20,
        borderRadius: 3,
        flexDirection: 'row',

    },
    starrating: {
        position: 'absolute',
        backgroundColor: 'white',
        height: 20,
        bottom: -5,
        left: 30,
        right: 30,
        width: 35,
        borderRadius: 9,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        elevation: 1
    }
    ,
    imageholder: {
        flex: 1,
        position: 'relative',
        borderRadius: 3,
    },
    detailholder: {
        flex: 2,
        padding: 5,

    }
});