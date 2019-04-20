import React, { Component } from "react";
import { StyleSheet, TextInput, Text, View, FlatList, ImageBackground } from "react-native";
import axios from 'axios';

const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=168cd3b806908239f3dae5d2a19ee51d";
const popularurl = "https://api.themoviedb.org/3/movie/popular?api_key=168cd3b806908239f3dae5d2a19ee51d&language=en-US&page=1";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchContent: '',
      popularmovies: []
    };

  }

  componentDidMount() {
    axios.get(popularurl).then(({ data }) => {
      this.setState({ popularmovies: data.results })
    }

    ).catch((error) => alert(error));

  }
  renderCard = (item) => {
    return (
      <View style={styles.card}>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        >
          <View style={{ flex: 1,justifyContent:'center',borderWidth:4,alignItems:'center'}}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 18,height:"100%" }}>{item.title}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={{
              borderWidth: 1, textAlign: 'left',
              padding: 5, fontSize: 16,
              width: "96%",
              backgroundColor: 'white',
              borderColor: '#9fa1a5',
              borderRadius: 3,

            }}
            onChangeText={text => this.setState({ searchContent: text })}
            value={this.state.searchContent}
            placeholder="Search"

          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginLeft:10,fontSize: 18, fontWeight: "800" }}>Popular Movies</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={this.state.popularmovies}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={(({ item }) => this.renderCard(item))}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "white",
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9e9e9e',
    elevation: 5
  },
  card: {
    height: 150,
    width: 150,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'black',
    color: 'black'
  }
});

