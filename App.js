import React, { Component } from "react";
import { StyleSheet, TextInput, Text, View, FlatList, ImageBackground, Keyboard, TouchableOpacity } from "react-native";
import axios from 'axios';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MovieDetails from './src/screens/MovieDetails';

import Home from "./src/screens/Home";
import { FluidNavigator } from 'react-navigation-fluid-transitions';

import Header from './src/components/Header';

const AppNavigator = FluidNavigator(
  {
    MovieDetails: MovieDetails,
    Home: Home,
  },
  {
    initialRouteName: "Home", 
  }
);
export default createAppContainer(AppNavigator);


