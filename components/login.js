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
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
import actionCodeSettings from "../database/emailLinkAuthConfigs";
// import { getUserRole } from "./dashboard";
import { useSelector, useDispatch } from "react-redux";
import { admin } from "../state/userRoleState";

export default class Login extends Component {
  dispatch = useDispatch();
  initialUserRole = useSelector(state => state.userRole.value);
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      user: "",
      userRole: this.initialUserRole,
      displayName: "",
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = async () => {
    try {
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
        );
        // console.log(res);
        // console.log("User logged-in successfully!");
        Alert.alert("User logged-in successfully! :)");
        this.setState({
          isLoading: false,
          email: "",
          password: "",
        });
        this.setUserRole();
        this.props.navigation.navigate("History");
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
      Alert.alert("User logged-in Failed! :(");
      // console.log("User logged-in Failed! :(" + error);
      this.setState({
        isLoading: false,
      });
    }
  };

  // Set User role on login
  setUserRole = () => {
    const loggedUser = FIREBASE_AUTH.currentUser;
    // console.log("My user: " + user);
    if (loggedUser !== null) {
      this.setState({
        displayName: loggedUser.displayName || "Display Name Not Set",
        // uid: user.uid,
        // currentUser: user,
      });
      if (
        loggedUser.displayName === "Admin" &&
        loggedUser.email === "betiqhub@gmail.com"
      ) {
        // this.setState({ userRole: "admin" });
        // setUserRole("admin");
        this.dispatch(admin(true));
        const newRole = useSelector(state => state.userRole.value);
        this.setState({
          userRole: newRole,
        });
      }
      // else {
      //   // this.setState({ userRole: "user" });
      //   // setUserRole("admin");
      //   this.dispatch(admin(false));
      // }
    }
  };

  // Add magick link sign-in
  emailLinkAuth = async () => {
    await sendSignInLinkToEmail(
      FIREBASE_AUTH,
      this.state.email,
      actionCodeSettings,
    )
      .then(() => {
        window.localStorage.setItem("emailForSignIn", this.state.email);
        Alert.alert("Link sent to your email!! :)");
        this.setState({
          isLoading: false,
          email: "",
          password: "",
        });
        this.props.navigation.navigate("History");
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Magic SignIn Error: " + errorCode + ": " + errorMessage);
        // console.log("Magic SignIn Error: " + errorCode + ": " + errorMessage);
      });
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
            color="#000"
            title="Signin"
            onPress={() => this.userLogin()}
          />
          {/* <Text style={styles.loginText} onPress={() => this.emailLinkAuth()}>
            Can&apos;t remember your password? Get a login link
          </Text> */}
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Don&apos;t have account? Click here to signup
          </Text>
          <Text>{this.setState.errorMessage}</Text>
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
    color: "#000",
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
