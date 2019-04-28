import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,

} from "react-native";
import axios from 'axios';

import HomeCard from '../components/HomeCard';

import { Button, Header } from 'react-native-elements';


const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=168cd3b806908239f3dae5d2a19ee51d&language=en-US&page=1";


class TestScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            popularMovies: [],
            noOfItems: 5,
            load: false,
            dataloaded: false
        };

    }
    componentDidMount() {
        axios.get(popularURL).then(({ data }) => {
            this.setState({ popularMovies: data.results, dataloaded: true })
        }

        ).catch((error) => alert(error));



    }

    render() {

        var load = null;
        if (!this.state.load && this.state.dataloaded) {
            load = <Button
                buttonStyle={{ width: 100, borderRadius: 20, backgroundColor: "#bfbfbf", borderColor: "#aaa9a9", elevation: 5 }}
                title="Load more"
                onPress={() => this.setState({ noOfItems: this.state.popularMovies.length, load: !this.state.load })}
            />
        }

        return (
            <ScrollView style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="light-content"
                    leftComponent={{ icon: 'person', color: '#b8b9ba',fontSize:20 }}
                    centerComponent={{ text: 'DISCOVER', style: { color: '#707070',fontSize:20 } }}
                    rightComponent={{ icon: 'search', color: '#b8b9ba' ,fontSize:20}}
                    containerStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        height:70
                    }}
                />
                <View style={{ marginTop: 10, padding: 10 }}>
                    <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "800", color: 'black' }}>Popular movies</Text>
                </View>
                <FlatList
                    data={this.state.popularMovies.slice(0, this.state.noOfItems)}
                    initialNumToRender={5}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(({ item }) => <HomeCard item={item} fontSize={20} customprops={this.props} itemid={item.id} poster_path={item.poster_path} title={item.title} />)}
                />
                <View style={{ alignItems: 'center', margin: 10 }}>
                    {load}
                </View>

            </ScrollView>
        );
    }
}
export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efefef",
    }
});




