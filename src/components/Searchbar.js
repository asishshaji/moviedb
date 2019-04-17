import React, { Component } from "react";
import { AppRegistry, TextInput } from "react-native";

export default class Searchbar extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "Useless Placeholder" };
	}

	render() {
		return (
			<View style={styles.searchContainer}>
				<TextInput
					style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
					onChangeText={text => this.setState({ text })}
					value={this.state.text}
					placeholder = "Search"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	searchContainer: {
		height: "20",
		backgroundColor: "red"
	}
});

