import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import HeaderLogo from "../components/header";
import Login from "../components/login";
import Signup from "../components/signup";
import Dashboard from "../dashboard";
import History from "../components/history";
import AddGames from "../components/admin/addGames";
import EditGames from "../components/admin/editGames";
import { props } from "react";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

() => {
  if (!props || !props.navigation) return null;
};

const { navigation } = props;

// Custom drawer content to add a line between sections
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.separator} />
      <DrawerItem
        label="Admin"
        onPress={() => navigation.navigate("Admin")}
        labelStyle={styles.sectionLabel}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#3740FE",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#00CC00", // Change the color as needed
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{ title: "History" }}
      />
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#FEF202",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="AdminAddGames"
        component={AddGames}
        options={{ title: "Add Games" }}
      />
      <Stack.Screen
        name="AdminEditGames"
        component={EditGames}
        options={{ title: "Edit Games" }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Auth"
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{ title: "Auth" }}
      />
      <Drawer.Screen
        name="User"
        component={UserStack}
        options={{ title: "User" }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminStack}
        options={{ title: "Admin" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
