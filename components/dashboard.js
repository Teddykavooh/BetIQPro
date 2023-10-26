// components/dashboard.js
import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { FIREBASE_AUTH } from "../database/firebase";
import PropTypes from "prop-types"; // Import prop-types
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

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
    const locationHref = window.location.href; // Replace with the actual URL or deep link received

    if (isSignInWithEmailLink(FIREBASE_AUTH, locationHref)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      if (email) {
        // Handle the sign-in with email link
        signInWithEmailLink(FIREBASE_AUTH, email, locationHref)
          .then(result => {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            // You can access the new user via result.user
            // Additional user info profile may not be available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
            console.log("Me user: " + result.user);
            this.setState({ isSignInCompleted: true, email: email });
          })
          .catch(error => {
            // Handle the error
            this.setState({
              isSignInCompleted: true,
              isSignInWithEmailLink: false,
            });
            console.log("Sign-in error: " + error.code);
          });
      }
    }
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