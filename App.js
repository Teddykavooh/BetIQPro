// App.js
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HeaderLogo from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import History from "./components/history";
import AddGames from "./components/admin/addGames";
import EditGames from "./components/admin/editGames";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
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
        options={{
          title: "Login",
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Welcome",
          headerLeft: null,
        }}
      /> */}
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: null,
          headerStyle: {
            height: 0, // Set the header height to 0 to effectively remove the title space
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminAddGames"
        component={AddGames}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
        }}
      />
      <Stack.Screen
        name="AdminEditGames"
        component={EditGames}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="History">
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerTitle: () => <HeaderLogo />, headerStyle: {
          backgroundColor: "#FEF202",
        }, headerTitleAlign: "center" }}
      />
      <Drawer.Screen
        name="User"
        component={UserStack}
        options={{ headerTitle: () => <HeaderLogo />, headerStyle: {
          backgroundColor: "#FEF202",
        }, headerTitleAlign: "center" }}
      />
      <Drawer.Screen
        name="Admin"
        component={[AdminStack, UserStack]}
        options={{ title: "Admin", headerTitleAlign: "center" }}
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
