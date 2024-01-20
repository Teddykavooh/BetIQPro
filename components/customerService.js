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
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native-gesture-handler";
import { FIRESTORE_DB } from "../database/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types"; // Import prop-types;
import { Calendar } from "react-native-calendars";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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

function ContactUs() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
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
          <ScrollView>{/* <TableView /> */}</ScrollView>
        </View>
      )}
    </View>
  );
}

function ForgotPass() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
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
        <View style={styles.content}>
          {/* <Text style={styles.contentText}>Content Section</Text> */}
          <ScrollView>{/* <TableView /> */}</ScrollView>
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
});
