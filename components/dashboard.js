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
import { TextInput } from "react-native-gesture-handler";

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
      update: false,
      isResettingPassword: false,
    };
  }

  componentDidMount() {
    this.getUser(); // Fetch user details when component mounts
  }

  getUser = () => {
    const user = FIREBASE_AUTH.currentUser;
    // console.log("My user: " + user.displayName);
    if (user) {
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
    const { currentUser, isResettingPassword } = this.state;
    // Toggle the isResettingPassword state to display/hide the TextInput
    this.setState({ isResettingPassword: !isResettingPassword });
    // If currentUser exists, initiate password reset with the user's email
    if (currentUser && !isResettingPassword) {
      sendPasswordResetEmail(currentUser.email)
        .then(() => Alert.alert("Password reset email sent"))
        .catch(error => Alert.alert(error));
    }

    // render() {
    //   const { currentUser, isResettingPassword } = this.state;

    //   // Conditionally render TextInput based on isResettingPassword state
    //   if (isResettingPassword) {
    //     return (
    //       <View>
    //         <TextInput
    //           placeholder="Enter your email"
    //           value={this.state.email}
    //           onChangeText={(text) => this.setState({ email: text })}
    //           onSubmitEditing={() => {
    //             sendPasswordResetEmail(this.state.email)
    //               .then(() => {
    //                 Alert.alert("Password reset email sent");
    //                 this.setState({ isResettingPassword: false, email: '' });
    //               })
    //               .catch((error) => Alert.alert(error));
    //           }}
    //         />
    //       </View>
    //     );
    //   }
    // }
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
        };
        this.componentDidMount();
        Alert.alert(this.state.displayName + ", signed out");
        this.props.navigation.navigate("Login");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  // CalendarIcon = ({ onPress }) => {
  //   return (
  //     <TouchableOpacity onPress={onPress}>
  //       <FontAwesome name="calendar" size={30} color="#000" />
  //     </TouchableOpacity>
  //   );
  // };

  // CalendarIcon.propTypes = {
  //   onPress: PropTypes.func, // Define the onPress prop
  // };

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome !</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ update: true });
              // console.log("Calendar pressed");
            }}
          >
            <FontAwesome name="refresh" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Hello, </Text>
            <Text style={styles.textStyle2}>
              {this.state.displayName}
              <Entypo name="emoji-happy" size={30} color="black" />
            </Text>
          </View>
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
        </View>
      </View>
    );
  }
}

// Exporting the function getUserRole
export const getUserRole = () => {
  const dashboardInstance = new Dashboard(); // Create an instance of Dashboard
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
    fontWeight: "bold",
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
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
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
    width: "100%",
  },
  myImage: {
    width: 150,
    height: 300,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle2: {
    fontSize: 25,
    fontWeight: "bold",
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
    fontWeight: "bold",
    fontSize: 16,
  },
});
