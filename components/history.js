import { React, Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types"; // Import prop-types

export default class History extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "History",
      uid: "",
      errorMessage: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Hello, {this.state.displayName}</Text>
        <View style={styles.buttonContainer}>
          <Button
            color="#3740FE"
            title="Proceed"
            onPress={() => this.props.navigation.navigate("History")}
          />
          <Button
            color="#3740FE"
            title="Logout"
            onPress={() => this.signOut()}
          />
        </View>
      </View>
    );
  }
}

// Add prop type validation for the navigation prop
History.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#000",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});
