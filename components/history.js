import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function TableView() {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableColumn1}>
        <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
          Time
        </Text>
      </View>
      <View style={styles.tableColumn2}>
        <Text style={{ fontWeight: "bold", color: "#8A91A4", fontSize: 16 }}>
          League
        </Text>
        <View style={styles.textLayout1}>
          <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
            Home
          </Text>
          <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
            Away
          </Text>
        </View>
        <View style={styles.textLayout1}>
          <Text style={styles.cl2_oddLabel}>ODD Label</Text>
          <Text style={styles.cl2_odd}>ODDs</Text>
        </View>
      </View>
      <View style={styles.tableColumn3}>
        <Text style={styles.cl3_odd}>Status</Text>
        <Text style={styles.cl3_odd}>Score</Text>
      </View>
    </View>
  );
}

function FreeTips() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTextRounded}>Today</Text>
        <Text style={styles.headerTextRounded}>Date</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Content Section</Text>
        <TableView />
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
    flexDirection: "row",
  },
  headerText: {
    fontSize: 20,
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
    backgroundColor: "black",
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    color: "white",
  },
  tableContainer: {
    flexDirection: "row",
    height: 100,
    padding: 5,
    marginBottom: 10,
  },
  tableColumn1: {
    backgroundColor: "red",
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
    backgroundColor: "green",
    flex: 0.6,
    borderWidth: 1,
    borderColor: "white",
    borderStartWidth: 0,
    borderEndWidth: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tableColumn3: {
    backgroundColor: "blue",
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
    fontWeight: "bold",
  },
  cl2_odd: {
    color: "#4C0400",
    backgroundColor: "#F88E10",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    fontWeight: "bold",
  },
  cl3_odd: {
    color: "#55C147",
    backgroundColor: "#2B2D27",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
  },
});
