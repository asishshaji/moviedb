import React, { Component } from "react";
import { StyleSheet, TextInput, Text, View, FlatList, ImageBackground, Keyboard } from "react-native";
import axios from 'axios';

const genreurl = "https://api.themoviedb.org/3/genre/movie/list?api_key=168cd3b806908239f3dae5d2a19ee51d";
const popularurl = "https://api.themoviedb.org/3/movie/popular?api_key=168cd3b806908239f3dae5d2a19ee51d&language=en-US&page=1";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchContent: '',
      popularMovies: [],
      isKeyboard: false,
      searchQuery: ''

    };

  }

  componentDidMount() {
    axios.get(popularurl).then(({ data }) => {
      this.setState({ popularMovies: data.results })
    }

    ).catch((error) => alert(error));
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  _keyboardDidShow = () => {

    this.setState({ isKeyboard: true });
  }

  _keyboardDidHide = () => {
    this.setState({ isKeyboard: false });

  }

  renderCard = (item, key) => {
    return (
      <View style={styles.card} key={item.id}>
        <ImageBackground
          style={{ width: '100%', height: '100%', }}
          imageStyle={{ resizeMode: 'cover',backgroundColor:'black',opacity:0.5 }}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 16 }}>{item.title}</Text>
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
        <View style={[styles.containerinside, this.state.isKeyboard ? styles.translucent : styles.transparent]}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "800", color: 'black' }}>Popular Movies</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <FlatList
              data={this.state.popularMovies}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(({ item }) => this.renderCard(item))}
            />

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "white",
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9e9e9e',
    elevation: 2
  },
  card: {
    height: 150,
    width: 150,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'black',
    color: 'black'
  },
  containerinside: {
    flex: 1
  },
  transparent: {
    backgroundColor: 'transparent',
    opacity: 1
  },
  translucent: {
    backgroundColor: 'black',
    opacity: 0.5
  }
});

