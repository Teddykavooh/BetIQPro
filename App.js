// App.js
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import History from "./components/history";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import HeaderLogo from "./components/header";

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

function MyStack() {
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
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Welcome",
          headerLeft: null,
        }}
      />
      {/* <Stack.Screen
        name="History"
        component={History}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#FEF202",
          },
        }}
      /> */}
      <Stack.Screen
        name="History"
        component={History}
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

// Failed Drawer Navigation
// const drawerNavigator = () => {
//   return (
//     <Drawer.Navigator initialRouteName="Dashboard">
//       <Drawer.Screen name="Signup" component={Signup} />
//       <Drawer.Screen name="Login" component={Login} />
//       <Drawer.Screen name="Dashboard" component={Dashboard} />
//     </Drawer.Navigator>
//   );
// };

export default function App() {
  return (
    <NavigationContainer>
      {/* {drawerNavigator()} */}
      <MyStack />
    </NavigationContainer>
  );
}
