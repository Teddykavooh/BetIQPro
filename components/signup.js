// components/signup.js
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { FIREBASE_AUTH } from "../database/firebase";
import PropTypes from "prop-types"; // Import prop-types
import { createUserWithEmailAndPassword } from "firebase/auth";

export default class Signup extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <Button title="Back" onPress={() => navigation.navigate("Dashboard")} />
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    // const state = this.state;
    this.setState({ [prop]: val });
  };
  registerUser = async () => {
    if (this.state.email === "" && this.state.password === "") {
      console.log("Enter details to signup!");
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });

      /**
       * Debug code
       * */
      try {
        const response = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          this.state.email,
          this.state.password,
        );
        console.log("Me response: " + JSON.stringify(response));
        console.log("User registered successfully!");
        Alert.alert("Successful user registration :)");
        this.setState({
          isLoading: false,
          displayName: "",
          email: "",
          password: "",
        });
        this.props.navigation.navigate("Login");
      } catch (error) {
        console.log("Me signup error: " + error);
        Alert.alert(
          this.state.displayName +
            ", Registration failed!!" +
            "\nError: " +
            error.message,
        );
      } finally {
        this.setState({ isLoading: false });
      }

      /*await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        this.state.email,
        this.state.password,
      )
        .then(res => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          console.log("User registered successfully!");
          Alert.alert("Successful user registration :)");
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch(error => {
          console.log("Registration error: " + this.state.errorMessage);
          Alert.alert("User registration failure! :(");
          this.setState({ isLoading: false, errorMessage: error.message });
        });*/
    }
  };
  render = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={this.state.displayName}
            onChangeText={val => this.updateInputVal(val, "displayName")}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={val => this.updateInputVal(val, "email")}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={val => this.updateInputVal(val, "password")}
            maxLength={15}
            secureTextEntry={true}
          />
          <Button
            color="#3740FE"
            title="Signup"
            onPress={() => this.registerUser()}
          />
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Already Registered? Click here to login
          </Text>
        </KeyboardAvoidingView>
      </View>
    );
  };
}

// Add prop type validation for the navigation prop
Signup.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
