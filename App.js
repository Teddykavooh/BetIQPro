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
import { getUserRole } from "./components/dashboard";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const userRole = getUserRole();

function SignupD() {
  return (
    <Stack.Navigator
      // initialRouteName="Signup"
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
        name="SignupD"
        component={Signup}
        options={{ title: "Signup" }}
      />
    </Stack.Navigator>
  );
}

function LoginD() {
  return (
    <Stack.Navigator
      // initialRouteName="Signup"
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
        name="LoginD"
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

function AddGamesD() {
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
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

function EditGamesD() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminEditGames"
        component={EditGames}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerActiveTintColor: "#000", fontWeight: "bold" }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Home"
        component={UserStack}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Signup"
        component={SignupD}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginD}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
          headerTitleAlign: "center",
        }}
      />
      {userRole === "admin" && (
        <>
          <Drawer.Screen
            name="Add Games"
            component={AddGamesD}
            options={{ headerTitle: "Admin", headerTitleAlign: "center" }}
          />
          <Drawer.Screen
            name="Edit Games"
            component={EditGamesD}
            options={{ headerTitle: "Admin", headerTitleAlign: "center" }}
          />
        </>
      )}
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
