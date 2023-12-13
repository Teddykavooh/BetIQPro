import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../database/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import PropTypes from "prop-types";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

// const { setUserRole } = useUserRole();
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "", // Initialize displayName state
      uid: "",
      errorMessage: "",
      userRole: "user",
      currentUser: null,
      email: "",
      update: null,
      isResettingPassword: false,
    };
  }

  componentDidMount() {
    this.getUser(); // Fetch user details when component mounts
  }

  // Example method that sets update to true
  triggerUpdate = () => {
    this.setState({ update: true }, () => {
      console.log("State updated:", this.state.update);
    });
  };

  getUser = () => {
    const user = FIREBASE_AUTH.currentUser;
    console.log("My user: " + user);
    if (user !== null) {
      this.setState({
        displayName: user.displayName || "Display Name Not Set",
        uid: user.uid,
        currentUser: user,
      });
      if (user.displayName === "Admin" && user.email === "betiqhub@gmail.com") {
        this.setState({ userRole: "admin" });
        this.forceUpdate();
        // setUserRole("admin");
      } else {
        this.setState({ userRole: "user" });
        // setUserRole("admin");
      }
    }
  };

  // Change password
  changePassword = () => {
    // console.log("chgpass pressed");
    const { currentUser, isResettingPassword, email } = this.state;
    // Toggle the isResettingPassword state to display/hide the TextInput
    this.setState({ isResettingPassword: !isResettingPassword });
    // If currentUser exists, initiate password reset with the user's email
    if (isResettingPassword && email !== "") {
      sendPasswordResetEmail(currentUser.email)
        .then(() => Alert.alert("Password reset email sent"))
        .catch(error => Alert.alert(error));
    }
  };

  // Function to get the userRole value
  getUserRole = () => {
    return this.state.userRole;
  };

  signOut = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        this.setState = {
          displayName: "", // Initialize displayName state
          uid: "",
          errorMessage: "",
          userRole: "user",
          currentUser: null,
          email: "",
          update: null,
          isResettingPassword: false,
        };
        Alert.alert(this.state.displayName + ", signed out");
        this.props.navigation.navigate("Login");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { currentUser, isResettingPassword } = this.state;
    // Conditionally render TextInput based on isResettingPassword state
    let resetPasswordInput = null;
    if (isResettingPassword) {
      resetPasswordInput = (
        <View style={styles.chgPass}>
          <TextInput
            placeholder="Enter your email"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            onSubmitEditing={this.changePassword}
            style={styles.inputStyle}
          />
          <TouchableOpacity
            onPress={this.changePassword}
            style={styles.chgPassPress}
          >
            <Entypo name="forward" size={20} color="black" />
            <Text style={{ textAlign: "center" }}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              resetPasswordInput = null;
              this.setState({ isResettingPassword: false });
            }}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <Entypo name="circle-with-cross" size={40} color="black" />
            <Text style={{ textAlign: "center" }}>Exit</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome !</Text>
          <TouchableOpacity
            onPress={() => {
              // console.log(this.state.update);
              this.triggerUpdate();
              // console.log(this.state.update);
            }}
          >
            <FontAwesome name="refresh" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.content}> */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Hello, </Text>
            <Text style={styles.textStyle2}>
              {this.state.displayName}
              <Entypo name="emoji-happy" size={30} color="black" />
            </Text>
          </View>
          {resetPasswordInput}
          <Image
            source={require("../assets/owl_ball_dark.png")} // Replace with the path to your image
            style={styles.myImage}
            resizeMode="contain"
          />
          <View style={styles.buttonContainer}>
            {/* Proceed Button */}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#FFF" : "#FEF202",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  borderWidth: 2,
                  borderColor: pressed ? "#000" : "#AF640D",
                  width: 130,
                  justifyContent: "center",
                },
              ]}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <FontAwesome name="home" size={30} color="black" />
              <Text style={styles.buttonLabel}>Proceed</Text>
            </Pressable>
            {currentUser && (
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#FFF" : "#FEF202",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    borderWidth: 2,
                    borderColor: pressed ? "#000" : "#AF640D",
                    width: 130,
                    justifyContent: "center",
                  },
                ]}
                onPress={() => this.signOut()}
              >
                <Entypo name="log-out" size={30} color="black" />
                <Text style={styles.buttonLabel}>Logout</Text>
              </Pressable>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#FFF" : "#FEF202",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  borderWidth: 2,
                  borderColor: pressed ? "#000" : "#AF640D",
                  // width: 130,
                  justifyContent: "center",
                },
              ]}
              onPress={() => this.changePassword()}
            >
              <MaterialCommunityIcons
                name="lock-reset"
                size={30}
                color="black"
              />
              <Text style={styles.buttonLabel}>Reset Password</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      // </View>
    );
  }
}

// Exporting the function getUserRole
export const getUserRole = () => {
  const dashboardInstance = new Dashboard(); // Create an instance of Dashboard
  dashboardInstance.getUser();
  return dashboardInstance.getUserRole(); // Call the getUserRole function of the instance
};

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerText: {
    fontSize: 30,
    // fontWeight: 700,
  },
  headerTextRounded: {
    backgroundColor: "#E7DFEC", // Background color
    borderRadius: 15, // Border radius
    fontSize: 17,
    color: "#554D5A",
    padding: 5,
    marginRight: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#DDD",
    // backgroundColor: "#000",
  },
  contentText: {
    fontSize: 16,
    color: "white",
  },
  textStyle: {
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // width: "100%",
    // backgroundColor: "purple",
  },
  myImage: {
    width: 100,
    height: 300,
    // alignSelf: "center",
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle2: {
    fontSize: 25,
    // fontWeight: 700,
    backgroundColor: "#FEF202",
    textAlign: "center",
    padding: 5,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonLabel: {
    color: "#000",
    marginLeft: 10,
    textAlign: "center",
    // fontWeight: 700,
    fontSize: 16,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  chgPass: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chgPassPress: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#FEF202",
    borderColor: "#000",
    borderRadius: 6,
    padding: 5,
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#000",
    borderBottomWidth: 1,
  },
});
