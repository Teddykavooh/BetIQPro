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
import { StatusBar as CustomStatusBar, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DrawerHeader } from "./components/drawerHeader";

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
          fontWeight: 700,
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
          fontWeight: 700,
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
    <>
      <CustomStatusBar
        animated={true}
        // Native to android
        backgroundColor="#B72E81"
        barStyle={"default"}
        showHideTransition={"slide"}
        hidden={false}
      />
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: "#000",
          drawerLabelStyle: { fontWeight: 700 },
        }}
        initialRouteName="Home"
        drawerContent={props => <DrawerHeader {...props} />}
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
            drawerIcon: () => (
              <AntDesign name="dashboard" size={30} color="black" />
            ),
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
            drawerIcon: () => (
              <FontAwesome name="home" size={30} color="black" />
            ),
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
            drawerIcon: () => (
              <AntDesign name="adduser" size={30} color="black" />
            ),
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
            drawerIcon: () => (
              <FontAwesome name="sign-in" size={30} color="black" />
            ),
          }}
        />
        {userRole === "admin" && (
          <>
            <Drawer.Screen
              name="Add Games"
              component={AddGamesD}
              options={{
                headerTitle: "Admin",
                headerTitleAlign: "center",
                drawerIcon: () => (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <MaterialIcons
                      name="admin-panel-settings"
                      size={30}
                      color="black"
                    />
                    <Entypo name="add-to-list" size={30} color="black" />
                  </View>
                ),
              }}
            />
            <Drawer.Screen
              name="Edit Games"
              component={EditGamesD}
              options={{
                headerTitle: "Admin",
                headerTitleAlign: "center",
                // drawerLabel: () => (
                //   <View
                //     style={{
                //       // backgroundColor: "pink",
                //       flexDirection: "row",
                //       alignItems: "center",
                //       justifyContent: "space-between",
                //       width: "115%",
                //     }}
                //   >
                //     <Text>MotoMoto</Text>
                //     <Entypo name="chevron-right" size={25} color="black" />
                //   </View>
                // ),
                drawerIcon: () => (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <MaterialIcons
                      name="admin-panel-settings"
                      size={30}
                      color="black"
                    />
                    <Entypo name="edit" size={30} color="black" />
                  </View>
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
