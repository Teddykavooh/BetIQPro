import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
  Image,
  Modal,
  Button,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FIREBASE_AUTH } from "../database/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native-gesture-handler";
import { FIRESTORE_DB } from "../database/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types"; // Import prop-types;
import { Calendar } from "react-native-calendars";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import emailjs from "@emailjs/browser";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RefreshIcon = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={
        {
          // alignSelf: "flex-end"
        }
      }
    >
      <FontAwesome name="refresh" size={30} color="black" />
    </Pressable>
  );
};
RefreshIcon.propTypes = {
  onPress: PropTypes.func, // Define the onPress prop
};
const handlePress = () => {
  const telegramLink = "https://t.me/@hc440393";
  Linking.openURL(telegramLink);
};

function ContactUs() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [name, setName] = React.useState("Client");
  const [query, setQuery] = React.useState("");
  const [email, setEmail] = React.useState("");

  let templateParams = {
    from_name: { name },
    to_name: "BetIqPro Support",
    message: { query },
    reply_mail: { email },
  };

  const submitForm = () => {
    emailjs
      .sendForm(
        "service_ui0gigj",
        "template_dyr4cnd",
        templateParams,
        "tSat7N_1WjG4CjO9f",
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        },
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contact Us</Text>
        <View style={styles.refV}>
          <RefreshIcon onPress={() => setRefresh(true)} />
        </View>
      </View>
      {isLoading ? ( // Check isLoading state
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      ) : (
        <View style={styles.content}>
          {/* <Text style={styles.contentText}>Content Section</Text> */}
          <ScrollView
            contentContainerStyle={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={styles.formCont}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                onChangeText={text => setName(text)}
                value={name}
              />
              <Text style={styles.label}>Your E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter E-mail Address"
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <Text style={styles.label}>Your Query</Text>
              <TextInput
                style={styles.input}
                placeholder="Please provide your query"
                onChangeText={text => setQuery(text)}
                value={query}
                multiline
                numberOfLines={5}
              />
              <Button title="Send" color="#AF640D" onPress={submitForm} />
            </View>
            <TouchableOpacity style={styles.teleG} onPress={handlePress}>
              <FontAwesome name="telegram" color="dodgerblue" size={30} />
              <Text>Telegram Link</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function ForgotPass({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [displayName, setDisplayName] = React.useState("");
  const [uid, setUid] = React.useState("");
  const [userRole, setUserRole] = React.useState("user");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [isResettingPassword, setIsResettingPassword] = React.useState(false);

  React.useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    // console.log("My user: " + user);
    if (user !== null) {
      setDisplayName(user.displayName || "Display Name Not Set");
      setUid(user.uid);
      setCurrentUser(user);
      if (user.displayName === "Admin" && user.email === "betiqhub@gmail.com") {
        setUserRole("admin");
      } else {
        setUserRole("user");
      }
      exUserRole = userRole;
    }
  }, [refresh]);

  // Change password
  const changePassword = () => {
    setIsLoading(true);
    // console.log("chgpass pressed");
    // Toggle the isResettingPassword state to display/hide the TextInput
    setIsResettingPassword(!isResettingPassword);
    // If currentUser exists, initiate password reset with the user's email
    if (isResettingPassword && email !== "") {
      sendPasswordResetEmail(currentUser.email)
        .then(() => Alert.alert("Password reset email sent"))
        .catch(error => Alert.alert(error));
      setIsLoading(false);
    }
  };

  // Function to get the userRole value
  // const getUserRole = () => {
  //   return userRole;
  // };

  const signOut = () => {
    setIsLoading(true);
    FIREBASE_AUTH.signOut()
      .then(() => {
        setDisplayName("");
        setUid("");
        setUserRole("user");
        setCurrentUser(null);
        setEmail("");
        // setUpdate(null);
        setIsResettingPassword(false);
        setIsLoading(false);
        Alert.alert(displayName + ", signed out");
        // this.props.navigation.navigate("Login");
        navigation.navigate("Login");
      })
      .catch(error => Alert.alert(error.message));
    setIsLoading(false);
  };

  // Conditionally render TextInput based on isResettingPassword state
  let resetPasswordInput = null;
  if (isResettingPassword) {
    resetPasswordInput = (
      <View style={styles.chgPass}>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          onSubmitEditing={changePassword}
          style={styles.inputStyle}
        />
        <TouchableOpacity onPress={changePassword} style={styles.chgPassPress}>
          <Entypo name="forward" size={20} color="black" />
          <Text style={{ textAlign: "center" }}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            resetPasswordInput = null;
            setIsResettingPassword();
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
        <Text style={styles.headerText}>Forgot Password</Text>
        <View style={styles.refV}>
          <RefreshIcon onPress={() => setRefresh(true)} />
        </View>
      </View>
      {isLoading ? ( // Check isLoading state
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      ) : (
        <View style={styles.content_1}>
          {/* <Text style={styles.contentText}>Content Section</Text> */}
          <ScrollView
            style={styles.content_1}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.textView}>
              <Text style={styles.textStyle}>Hello, </Text>
              <Text style={styles.textStyle2}>
                {displayName}
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
                onPress={() => navigation.navigate("History")}
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
                  onPress={() => signOut()}
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
                onPress={() => changePassword()}
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
      )}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      //   initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#FFF",
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: "#000" },
      }}
    >
      <Tab.Screen
        name="Contact Us"
        component={ContactUs}
        options={{ tabBarLabel: "CONTACT US" }}
      />
      <Tab.Screen
        name="Forgot Password"
        component={ForgotPass}
        options={{ tabBarLabel: "FORGOT PASSWORD" }}
      />
    </Tab.Navigator>
  );
}

// Prop types validation
ForgotPass.propTypes = {
  navigation: PropTypes.object.isRequired, // Ensure that navigation is provided and is an object
};

// Exporting the function getUserRole
export let exUserRole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    backgroundColor: "white",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
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
    backgroundColor: "black",
    padding: 5,
  },
  contentText: {
    fontSize: 16,
    color: "white",
  },
  tableContainer: {
    flexDirection: "row",
    height: 100,
    padding: 5,
    // marginBottom: 10,
  },
  tableColumn1: {
    backgroundColor: "#141C31",
    flex: 0.2,
    borderWidth: 1,
    borderColor: "white",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tableColumn2: {
    backgroundColor: "#141C31",
    flex: 0.6,
    borderWidth: 1,
    borderColor: "white",
    borderStartWidth: 0,
    borderEndWidth: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tableColumn3: {
    backgroundColor: "#141C31",
    flex: 0.2,
    borderWidth: 1,
    borderColor: "white",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textLayout1: {
    flexDirection: "row",
    gap: 45,
  },
  textLayout2: {
    flexDirection: "column",
  },
  cl2_oddLabel: {
    color: "black",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    fontWeight: "700",
    fontSize: 15,
    minWidth: 50,
    textAlign: "center",
  },
  cl2_odd: {
    color: "#4C0400",
    backgroundColor: "#F88E10",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    fontWeight: "700",
    fontSize: 15,
    minWidth: 25,
    textAlign: "center",
  },
  cl3_odd: {
    color: "#55C147",
    backgroundColor: "#2B2D27",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    fontSize: 16,
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
  dateView: {
    flexDirection: "row",
  },
  headerIcon: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
  },
  categoryHeader: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    backgroundColor: "#DDD",
    borderRadius: 10,
  },
  categoryView: {
    // gap: 20,
    // backgroundColor: "pink",
  },
  hLogo: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#FFF",
  },
  hLabel: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  dateV: {
    flex: 0.45,
    // backgroundColor: "pink",
  },
  calV: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  refV: {
    flex: 0.45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: "pink",
  },
  textFormat1: {
    fontWeight: "700",
    color: "#B9BBC0",
    fontSize: 16,
  },
  textFormat2: {
    fontWeight: "700",
    color: "#8A91A4",
    fontSize: 16,
  },
  labelFormat: {
    fontWeight: "700",
    fontSize: 20,
  },
  // Contact form
  formCont: {
    backgroundColor: "#DDD",
    padding: 10,
    width: "100%",
    maxWidth: 400,
    borderRadius: 7,
    borderColor: "gold",
    borderWidth: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },

  input: {
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderColor: "#da5ca0",
    borderWidth: 1,
  },
  teleG: {
    backgroundColor: "#DDD",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  // Forgot password
  content_1: {
    flex: 1,
    backgroundColor: "#DDD",
    // backgroundColor: "#000",
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
    fontWeight: "700",
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
    fontWeight: "700",
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
