// components/login.js
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
import { signInWithEmailAndPassword } from "firebase/auth";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  userLogin = async () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      this.setState({
        isLoading: true,
      });
      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        this.state.email,
        this.state.password,
      )
        .then(res => {
          console.log(res);
          console.log("User logged-in successfully!");
          Alert.alert("User logged-in successfully! :)");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Dashboard");
        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
          Alert.alert("User logged-in Failed! :(");
        });
    }
  };
  render() {
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
            title="Signin"
            onPress={() => this.userLogin()}
          />
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Don&apos;t have account? Click here to signup
          </Text>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

// Add prop type validation for the navigation prop
Login.propTypes = {
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
