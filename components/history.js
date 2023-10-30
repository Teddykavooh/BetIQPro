import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function FreeTips() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header Section</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Content Section</Text>
      </View>
    </View>
  );
}

function VipTips() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header Section</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Content Section</Text>
      </View>
    </View>
  );
}

function VipSuccess() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header Section</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Content Section</Text>
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#FFF",
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: "#000" },
      }}
    >
      <Tab.Screen
        name="FreeBets"
        component={FreeTips}
        options={{ tabBarLabel: "FREE BETS" }}
      />
      <Tab.Screen
        name="VIPTips"
        component={VipTips}
        options={{ tabBarLabel: "VIP TIPS" }}
      />
      <Tab.Screen
        name="VIPSuccess"
        component={VipSuccess}
        options={{ tabBarLabel: "VIP SUCCESS" }}
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
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    color: "white",
  },
});
