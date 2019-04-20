import React, { Component } from "react";
import { StyleSheet, TextInput, Text, View, FlatList, ImageBackground, Keyboard, TouchableOpacity } from "react-native";
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MovieDetails from './src/screens/MovieDetails';

const genreurl = "https://api.themoviedb.org/3/genre/movie/list?api_key=168cd3b806908239f3dae5d2a19ee51d";
const popularurl = "https://api.themoviedb.org/3/movie/popular?api_key=168cd3b806908239f3dae5d2a19ee51d&language=en-US&page=1";

class App extends Component {

  static navigationOptions = {
    header: null,
  };

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
      <TouchableOpacity activeOpacity={0} onPress={() => this.props.navigation.navigate(
        'MovieDetails', {
          item: item
        }
      )}>
        <View style={styles.card} key={item.id}>
          <ImageBackground
            style={{ width: '100%', height: '100%', }}
            imageStyle={{ resizeMode: 'cover', backgroundColor: 'black', opacity: 0.7 }}
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 16 }}>{item.title}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search"
          round={true}
          containerStyle={{
            backgroundColor: "white",
            elevation: 2
          }}
          inputContainerStyle={{
            backgroundColor: 'white',

          }}

          onChangeText={text => this.setState({ searchContent: text })}
          value={this.state.searchContent}
        />

        <View style={[styles.containerinside, this.state.isKeyboard ? styles.translucent : styles.transparent]}>
          <View style={{ marginTop: 10, padding: 10 }}>
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "800", color: 'black' }}>Today's popular movies</Text>
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

const AppNavigator = createStackNavigator(
  {
    Home: App,
    MovieDetails: MovieDetails,
  },
  {
    initialRouteName: "Home"
  }
);
export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    backgroundColor: 'white'
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

