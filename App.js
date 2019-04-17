import React, { Component } from "react";
import { StyleSheet,TextInput, Text, View ,FlatList,TouchableHighlight} from "react-native";
import axios from 'axios';

const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=168cd3b806908239f3dae5d2a19ee51d";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        searchContent : '',
        dataSource : []
      };
    
  }

  componentDidMount(){
      axios.get(url).then(({data})=>
      {
        this.setState({dataSource: data.genres})  
      }
      
      ).catch((error)=>alert(error));

  }
  list = ({item,index}) => <Text style = {styles.list}>{item} {index}</Text>


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={{ height: 40, borderColor: "gray", 
            borderWidth: 1 ,textAlign:'left',
            padding: 10,fontSize: 20,fontWeight: '300',
            width:"96%",
            backgroundColor:'white',
            borderColor:'#333',
            borderRadius: 3,
          
          }}
          onChangeText = {text => this.setState({searchContent: text})}
          value = {this.state.searchContent}
          placeholder = "Search"

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
    width:"100%",
    backgroundColor: "#ccc",
    alignItems: 'center',
    padding:14,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  }
});

// <FlatList
//           data={this.state.dataSource}
//           renderItem={this.list}
//         />