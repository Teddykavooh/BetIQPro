import { React, Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types"; // Import prop-types
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FreeTipsScreen from "./tabs/freetips";
import VIPTipsScreen from "./tabs/viptips";
import VipSuccessScreen from "./tabs/vipsuccess";

const Tab = createMaterialTopTabNavigator();
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
        <Tab.Navigator
          style={styles.tabsStyle}
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarLabelStyle: { fontSize: 12 },
            tabBarItemStyle: {
              borderBottomWidth: 2,
              borderBottomColor: "#F8900B",
            },
            tabBarIndicatorStyle: { backgroundColor: "#3740FE" },
            tabBarStyle: { backgroundColor: "#000" },
          }}
        >
          <Tab.Screen name="Free Tips" component={FreeTipsScreen} />
          <Tab.Screen name="VIP Tips" component={VIPTipsScreen} />
          <Tab.Screen name="VIP Success" component={VipSuccessScreen} />
        </Tab.Navigator>
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
  tabsStyle: {},
});
