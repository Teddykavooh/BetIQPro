// App.js
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HeaderLogo from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
// import Dashboard from "./components/dashboard";
import History from "./components/history";
import AddGames from "./components/admin/addGames";
import EditGames from "./components/admin/editGames";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        name="Signup"
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
        name="Edit Games"
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
    <Drawer.Navigator screenOptions={{drawerActiveTintColor: "#000", fontWeight: "bold"}}>
      <Drawer.Screen
        name="Home"
        component={UserStack}
        options={{ headerTitle: () => <HeaderLogo />, headerStyle: {
          backgroundColor: "#FEF202",
        }, headerTitleAlign: "center" }}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignupD}
        options={{ headerTitle: () => <HeaderLogo />, headerStyle: {
          backgroundColor: "#FEF202",
        }, headerTitleAlign: "center" }}
      />
      <Drawer.Screen
        name="LogIn"
        component={LoginD}
        options={{ headerTitle: () => <HeaderLogo />, headerStyle: {
          backgroundColor: "#FEF202",
        }, headerTitleAlign: "center" }}
      />
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
