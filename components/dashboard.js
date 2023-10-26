// components/dashboard.js
import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { FIREBASE_AUTH } from "../database/firebase";
import PropTypes from "prop-types"; // Import prop-types

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      uid: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    // Get the currently authenticated user
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      this.setState({
        displayName: user.displayName || "Display Name Not Set",
        uid: user.uid,
      });
      // console.log(
      //   "Me data: " + "\nUsername: " + user.displayName + "\nuid: " + user.uid,
      // );
    }
  }

  signOut = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        console.log("Signed Out");
        Alert.alert("Logout successfull, See you soon!! :)");
        this.props.navigation.navigate("Login");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Hello, {this.state.displayName}</Text>
        <Button color="#3740FE" title="Logout" onPress={() => this.signOut()} />
      </View>
    );
  }
}

// Add prop type validation for the navigation prop
Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff"
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});