...
import { getUserRole } from "./components/dashboard";

const userRole = getUserRole();

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
          fontWeight: "bold",
          // drawerLabelStyle: { color: "white" },
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
        {userRole === "user" && (
          <>
            <Drawer.Screen
              name="Add Games"
              component={AddGamesD}
              options={{
                headerTitle: "Admin",
                headerTitleAlign: "center",
                drawerIcon: () => (
                  <View style={{ flexDirection: "row", gap: "2vw" }}>
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
                  <View style={{ flexDirection: "row", gap: "2vw" }}>
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

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "", // Initialize displayName state
      uid: "",
      errorMessage: "",
      userRole: "user",
      currentUser: null,
      email: "",
      update: null,
      isResettingPassword: false,
    };
  }
  getUser = () => {
    const user = FIREBASE_AUTH.currentUser;
    // console.log("My user: " + user.displayName);
    if (user) {
      this.setState({
        displayName: user.displayName || "Display Name Not Set",
        uid: user.uid,
        currentUser: user,
      });
      if (user.displayName === "Sth" && user.email === "sth@sth.com") {
        this.setState({ userRole: "admin" });
        this.forceUpdate();
        // setUserRole("admin");
      } else {
        this.setState({ userRole: "user" });
        // setUserRole("admin");
      }
    }
  };

  componentDidMount() {
    this.getUser(); // Fetch user details when component mounts
  }

  // Function to get the userRole value
  getUserRole = () => {
    return this.state.userRole;
  };
}

// Exporting the function getUserRole
export const getUserRole = () => {
  const dashboardInstance = new Dashboard(); // Create an instance of Dashboard
  dashboardInstance.getUser();
  return dashboardInstance.getUserRole(); // Call the getUserRole function of the instance
};

