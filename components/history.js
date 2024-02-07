import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
  Image,
  // Modal,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native-gesture-handler";
import { FIRESTORE_DB } from "../database/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types"; // Import prop-types;
// import { Calendar } from "react-native-calendars";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const CalendarIcon = ({ onPress }) => {
//   return (
//     <Pressable onPress={onPress} style={{ alignSelf: "center" }}>
//       <FontAwesome name="calendar" size={30} color="#000" />
//     </Pressable>
//   );
// };

// CalendarIcon.propTypes = {
//   onPress: PropTypes.func, // Define the onPress prop
// };

const RefreshIcon = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignSelf: "flex-end",
      }}
    >
      <FontAwesome name="refresh" size={30} color="black" />
    </Pressable>
  );
};
RefreshIcon.propTypes = {
  onPress: PropTypes.func, // Define the onPress prop
};

function FreeTips() {
  const BetsHistory = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);
    // const [showModal, setShowModal] = React.useState(false);
    const [selectDate, setSelectDate] = React.useState(
      "Select Date from Calendar",
    );

    React.useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "betiqprohub"),
        );
        const dataArr = [];
        try {
          if (querySnapshot.size !== 0) {
            querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              const data = doc.data();
              const status = data.status;
              // Find the key where the N/A value is false and later is true
              for (const key in status) {
                if (key !== "N/A") {
                  if (
                    status[key] === true &&
                    data.category === "Free" &&
                    data.isShow === true
                  ) {
                    // console.log(doc.id, " => ", doc.data());
                    dataArr.push({
                      id: doc.id,
                      data: doc.data(),
                      trueKey: key,
                    });
                    break;
                  }
                }
              }
            });
            setData(dataArr);
          } else {
            // console.log("Nothing to query or Check your internet");
            Alert.alert(
              "Nothing to query or" + "\n" + "Check your internet :(",
            );
          }
        } catch (error) {
          // console.log("Fetch failed");
          Alert.alert("Fetching data failed :(");
        }
        setIsLoading(false);
      };
      fetchData();
      if (refresh === true) {
        setRefresh(false);
      }
      // Triggers to the useEffect()
    }, [refresh]);

    React.useEffect(() => {
      const fetchDataByQuery = async () => {
        setIsLoading(true);
        const dataArr = [];
        let q;
        q = query(
          collection(FIRESTORE_DB, "betiqprohub"),
          where("selectDate", "==", selectDate),
        );
        try {
          const querySnapshot2 = await getDocs(q);
          // console.log("Query Snapshot2 Size:", querySnapshot2.size);
          querySnapshot2.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const status = data.status;
            // Find the key where the N/A value is false and later is true
            for (const key in status) {
              if (key !== "N/A") {
                if (
                  status[key] === true &&
                  data.category === "Free" &&
                  data.isShow === true
                ) {
                  // console.log(doc.id, " => ", doc.data());
                  dataArr.push({ id: doc.id, data: doc.data(), trueKey: key });
                  break;
                }
              }
            }
          });
          setData(dataArr);
          setIsLoading(false);
          Alert.alert("Query successful :)");
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
          setIsLoading(false);
          Alert.alert("Error fetching data by query :(");
          // setFilter(null);
        }
      };

      if (selectDate !== "Select Date from Calendar") {
        fetchDataByQuery();
      } else {
        // console.log("Shite happened");
        // console.log("Filter: " + filter);
        setSelectDate("Select Date from Calendar");
        // setDataUpdated(!dataUpdated);
      }
      // Triggers to the useEffect()
    }, [selectDate]);

    function TableView() {
      return (
        <View>
          {data.map(item => (
            <View key={item.id} style={styles.tableContainer}>
              <View style={styles.tableColumn1}>
                <Ionicons name="time-outline" size={17} color="#FFF" />
                <Text style={styles.textFormat1}>{item.data.time}</Text>
              </View>
              <View style={styles.tableColumn2}>
                <Text style={styles.textFormat2}>{item.data.league}</Text>
                <View style={styles.textLayout1}>
                  <Text style={styles.textFormat1}>{item.data.home}</Text>
                  <Text style={styles.textFormat1}>{item.data.away}</Text>
                </View>
                <View style={styles.textLayout1}>
                  <Text style={styles.cl2_oddLabel}>
                    {item.data.predictions}
                  </Text>
                  <Text style={styles.cl2_odd}>{item.data.odds}</Text>
                </View>
              </View>
              <View style={styles.tableColumn3}>
                <Text style={styles.cl3_odd}>{item.trueKey}</Text>
                <Text style={styles.cl3_odd}>{item.data.score}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.dateV}>
            <Pressable
              onPress={() => {
                // console.log("Text date: " + formattedDate);
                // console.log("Text raw date: " + today);
                setSelectDate(formattedDate);
              }}
              style={{ alignSelf: "flex-start" }}
            >
              <Text style={styles.headerTextRounded}>
                Today: {formattedDate}
              </Text>
            </Pressable>
          </View>
          {/* <View style={styles.calV}>
          <Modal
            visible={showModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 350,
                  height: 200,
                }}
              >
                <View>Content of the small view modal</View>
                <Calendar
                  onDayPress={day => {
                    // console.log("selected day", day);
                    setSelectDate(day.dateString);
                    setShowModal(false);
                  }}
                  renderArrow={direction => {
                    if (direction == "left")
                      return (
                        <FontAwesome
                          name="chevron-left"
                          size={20}
                          color="#000"
                        />
                      );
                    if (direction == "right")
                      return (
                        <FontAwesome
                          name="chevron-right"
                          size={20}
                          color="#000"
                        />
                      );
                  }}
                />
                <Pressable
                  onPress={() => setShowModal(false)}
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: 100,
                  }}
                >
                  <MaterialIcons name="cancel" size={30} color="#000" />
                </Pressable>
              </View>
            </View>
          </Modal>
          <CalendarIcon
            onPress={() => {
              // Prevent reload on calender click
              // setDataUpdated(false);
              setShowModal(true);
              // console.log("Calendar pressed");
              // Debugger
              // console.log("Me status_update: " + dataUpdated);
              // console.log("Me status_fetch: " + fetchDataOnMount);
              // console.log("......Updating.......");
              // setDataUpdated(true);
              // console.log("Me status_update: " + dataUpdated);
              // setFetchDataOnMount(true);
              // console.log("Me status_fetch: " + fetchDataOnMount);
            }}
          />
        </View> */}
          <View style={styles.refV}>
            <RefreshIcon onPress={() => setRefresh(true)} />
          </View>
        </View>
        {isLoading ? ( // Check isLoading state
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
          </View>
        ) : (
          <View style={styles.content}>
            {/* <Text style={styles.contentText}>Content Section</Text> */}
            <ScrollView style={styles.tableViewParent}>
              <TableView />
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const Bets = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);
    // const [showModal, setShowModal] = React.useState(false);
    const [selectDate, setSelectDate] = React.useState(
      "Select Date from Calendar",
    );

    React.useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "betiqprohub"),
        );
        const dataArr = [];
        try {
          if (querySnapshot.size !== 0) {
            querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              const data = doc.data();
              const status = data.status;
              //Find key=N/A
              for (const key in status) {
                if (
                  key === "N/A" &&
                  data.category === "Free" &&
                  data.isShow === true
                ) {
                  dataArr.push({ id: doc.id, data: doc.data(), trueKey: key });
                  // console.log(doc.id, " => ", doc.data());
                  break;
                }
              }
            });
            setData(dataArr);
          } else {
            // console.log("Nothing to query or Check your internet");
            Alert.alert(
              "Nothing to query or" + "\n" + "Check your internet :(",
            );
          }
        } catch (error) {
          // console.log("Fetch failed");
          Alert.alert("Fetching data failed :(");
        }
        setIsLoading(false);
      };
      fetchData();
      if (refresh === true) {
        setRefresh(false);
      }
      // Triggers to the useEffect()
    }, [refresh]);

    React.useEffect(() => {
      const fetchDataByQuery = async () => {
        setIsLoading(true);
        //Empty array
        const dataArr = [];
        let q;
        q = query(
          collection(FIRESTORE_DB, "betiqprohub"),
          where("selectDate", "==", selectDate),
        );
        try {
          const querySnapshot2 = await getDocs(q);
          // console.log("Query Snapshot2 Size:", querySnapshot2.size);
          querySnapshot2.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log("Do i get here?");
            const data = doc.data();
            const status = data.status;
            for (const key in status) {
              if (
                key === "N/A" &&
                data.category !== "Free" &&
                data.isShow === true
              ) {
                dataArr.push({ id: doc.id, data: doc.data(), trueKey: key });
                // console.log(doc.id, " => ", doc.data());
                break;
              }
            }
          });
          setData(dataArr);
          // console.log("My dataArr: " + dataArr);
          setIsLoading(false);
          Alert.alert("Query successful :)");
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
          setIsLoading(false);
          Alert.alert("Error fetching data by query :(");
          // setFilter(null);
        }
      };

      if (selectDate !== "Select Date from Calendar") {
        fetchDataByQuery();
      } else {
        // console.log("Shite happened");
        // console.log("Filter: " + filter);
        setSelectDate("Select Date from Calendar");
        // setDataUpdated(!dataUpdated);
      }
      // Triggers to the useEffect()
    }, [selectDate]);

    function TableView() {
      return (
        <View>
          {data.map(item => (
            <View key={item.id} style={styles.tableContainer}>
              <View style={styles.tableColumn1}>
                <Ionicons name="time-outline" size={20} color="#FFF" />
                <Text style={styles.textFormat1}>{item.data.time}</Text>
              </View>
              <View style={styles.tableColumn2}>
                <Text style={styles.textFormat2}>{item.data.league}</Text>
                <View style={styles.textLayout1}>
                  <Text style={styles.textFormat1}>{item.data.home}</Text>
                  <Text style={styles.textFormat1}>{item.data.away}</Text>
                </View>
                <View style={styles.textLayout1}>
                  <Text style={styles.cl2_oddLabel}>
                    {item.data.predictions}
                  </Text>
                  <Text style={styles.cl2_odd}>{item.data.odds}</Text>
                </View>
              </View>
              <View style={styles.tableColumn3}>
                <Text style={styles.cl3_odd}>{item.trueKey}</Text>
                <Text style={styles.cl3_odd}>{item.data.score}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.dateV}>
            <Pressable
              onPress={() => {
                // console.log("Text date: " + formattedDate);
                // console.log("Text raw date: " + today);
                setSelectDate(formattedDate);
              }}
              style={{ alignSelf: "flex-start" }}
            >
              <Text style={styles.headerTextRounded}>
                Today: {formattedDate}
              </Text>
            </Pressable>
          </View>
          {/* <View style={styles.calV}>
            <Modal
              visible={showModal}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setShowModal(false)}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 350,
                    height: 200,
                  }}
                >
                  <View>Content of the small view modal</View>
                  <Calendar
                    onDayPress={day => {
                      // console.log("selected day", day);
                      setSelectDate(day.dateString);
                      setShowModal(false);
                    }}
                    renderArrow={direction => {
                      if (direction == "left")
                        return (
                          <FontAwesome
                            name="chevron-left"
                            size={20}
                            color="#000"
                          />
                        );
                      if (direction == "right")
                        return (
                          <FontAwesome
                            name="chevron-right"
                            size={20}
                            color="#000"
                          />
                        );
                    }}
                  />
                  <Pressable
                    onPress={() => setShowModal(false)}
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      width: 100,
                    }}
                  >
                    <MaterialIcons name="cancel" size={30} color="#000" />
                  </Pressable>
                </View>
              </View>
            </Modal>
            <CalendarIcon
              onPress={() => {
                // Prevent reload on calender click
                // setDataUpdated(false);
                setShowModal(true);
                // console.log("Calendar pressed");
                // Debugger
                // console.log("Me status_update: " + dataUpdated);
                // console.log("Me status_fetch: " + fetchDataOnMount);
                // console.log("......Updating.......");
                // setDataUpdated(true);
                // console.log("Me status_update: " + dataUpdated);
                // setFetchDataOnMount(true);
                // console.log("Me status_fetch: " + fetchDataOnMount);
              }}
            />
          </View> */}
          <View style={styles.refV}>
            <RefreshIcon onPress={() => setRefresh(true)} />
          </View>
        </View>
        {isLoading ? ( // Check isLoading state
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
          </View>
        ) : (
          <View style={styles.content}>
            {/* <Text style={styles.contentText}>Content Section</Text> */}
            <ScrollView style={styles.tableViewParent}>
              <TableView />
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  // Get today's date
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Bets"
        component={Bets}
        options={{
          tabBarLabel: "BETS",
          // tabBarOptions: {
          //   showIcon: true,
          // },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bets History"
        component={BetsHistory}
        options={{
          tabBarLabel: "BET HISTORY",
          // tabBarOptions: {
          //   showIcon: true,
          // },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function VipTips() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data_3, setData_3] = React.useState([]);
  const [data_5, setData_5] = React.useState([]);
  const [data_10, setData_10] = React.useState([]);
  const [data_25, setData_25] = React.useState([]);
  const [data_70, setData_70] = React.useState([]);
  const [data_Alt, setData_Alt] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  // const [showModal, setShowModal] = React.useState(false);
  const [selectDate, setSelectDate] = React.useState(
    "Select Date from Calendar",
  );
  // const [dataUpdated, setDataUpdated] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        collection(FIRESTORE_DB, "betiqprohub"),
      );
      const dataArr_3 = [];
      const dataArr_5 = [];
      const dataArr_10 = [];
      const dataArr_25 = [];
      const dataArr_70 = [];
      const dataArr_Alt = [];

      // console.log("Query Snapshot Size:", querySnapshot.size);
      try {
        if (querySnapshot.size !== 0) {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const status = data.status;
            //Find key=N/A
            for (const key in status) {
              if (
                key === "N/A" &&
                data.category !== "Free" &&
                data.isShow === true
              ) {
                switch (data.category) {
                  case "Daily 3+":
                    dataArr_3.push({
                      id: doc.id,
                      data: doc.data(),
                      trueKey: key,
                    });
                    // console.log(doc.id, " => ", doc.data());
                    break;
                  case "Daily 5+":
                    dataArr_5.push({
                      id: doc.id,
                      data: doc.data(),
                      trueKey: key,
                    });
                    // console.log(doc.id, " => ", doc.data());
                    break;
                  case "Daily 10+":
                    dataArr_10.push({
                      id: doc.id,
                      data: doc.data(),
                      trueKey: key,
                    });
                    // console.log(doc.id, " => ", doc.data());
                    break;

                  case "Daily 25+":
                    dataArr_25.push({
                      id: doc.id,
                      data: doc.data(),
                      trueKey: key,
                    });
                    // console.log(doc.id, " => ", doc.data());
                    break;

                  case "Weekly 70+":
                    dataArr_70.push({
                      id: doc.id,
                      data: doc.data(),
                      trueKey: key,
                    });
                    // console.log(doc.id, " => ", doc.data());
                    break;

                  case "Alternative VIP":
                    dataArr_Alt.push({
                      id: doc.id,
                      data: doc.data(),
                      trueKey: key,
                    });
                    // console.log(doc.id, " => ", doc.data());
                    break;
                  default:
                    // Handle other cases if necessary Restrict to admin
                    // Alert.alert("Non-Existing Category :(");
                    break;
                }
                break;
              }
            }
          });
          setData_3(dataArr_3);
          setData_5(dataArr_5);
          setData_10(dataArr_10);
          setData_25(dataArr_25);
          setData_70(dataArr_70);
          setData_Alt(dataArr_Alt);
        } else {
          // console.log("Nothing to query or Check your internet");
          Alert.alert("Nothing to query or" + "\n" + "Check your internet :(");
        }
      } catch (error) {
        // console.log("Fetch failed");
        Alert.alert("Fetching data failed :(");
      }
      setIsLoading(false);
    };
    fetchData();
    if (refresh === true) {
      setRefresh(false);
    }
    // Triggers to the useEffect()
  }, [refresh]);

  React.useEffect(() => {
    const fetchDataByQuery = async () => {
      setIsLoading(true);
      //Empty array
      // const dataArr = [];
      const dataArr_3 = [];
      const dataArr_5 = [];
      const dataArr_10 = [];
      const dataArr_25 = [];
      const dataArr_70 = [];
      const dataArr_Alt = [];
      let q;
      q = query(
        collection(FIRESTORE_DB, "betiqprohub"),
        where("selectDate", "==", selectDate),
      );
      try {
        const querySnapshot2 = await getDocs(q);
        // console.log("Query Snapshot2 Size:", querySnapshot2.size);
        querySnapshot2.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("Do i get here?");
          const data = doc.data();
          const status = data.status;
          for (const key in status) {
            if (
              key === "N/A" &&
              data.category !== "Free" &&
              data.isShow === true
            ) {
              switch (data.category) {
                case "Daily 3+":
                  dataArr_3.push({
                    id: doc.id,
                    data: doc.data(),
                    trueKey: key,
                  });
                  // console.log(doc.id, " => ", doc.data());
                  break;
                case "Daily 5+":
                  dataArr_5.push({
                    id: doc.id,
                    data: doc.data(),
                    trueKey: key,
                  });
                  // console.log(doc.id, " => ", doc.data());
                  break;
                case "Daily 10+":
                  dataArr_10.push({
                    id: doc.id,
                    data: doc.data(),
                    trueKey: key,
                  });
                  // console.log(doc.id, " => ", doc.data());
                  break;

                case "Daily 25+":
                  dataArr_25.push({
                    id: doc.id,
                    data: doc.data(),
                    trueKey: key,
                  });
                  // console.log(doc.id, " => ", doc.data());
                  break;

                case "Weekly 70+":
                  dataArr_70.push({
                    id: doc.id,
                    data: doc.data(),
                    trueKey: key,
                  });
                  // console.log(doc.id, " => ", doc.data());
                  break;

                case "Alternative VIP":
                  dataArr_Alt.push({
                    id: doc.id,
                    data: doc.data(),
                    trueKey: key,
                  });
                  // console.log(doc.id, " => ", doc.data());
                  break;
                default:
                  // Handle other cases if necessary Restrict to Admin
                  // Alert.alert("Non-Existing Category :(");
                  break;
              }
              break;
            }
          }
        });
        // setData(dataArr);
        setData_3(dataArr_3);
        setData_5(dataArr_5);
        setData_10(dataArr_10);
        setData_25(dataArr_25);
        setData_70(dataArr_70);
        setData_Alt(dataArr_Alt);
        // console.log("My dataArr: " + dataArr);
        setIsLoading(false);
        Alert.alert("Query successful :)");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
        setIsLoading(false);
        Alert.alert("Error fetching data by query :(");
        // setFilter(null);
      }
    };

    if (selectDate !== "Select Date from Calendar") {
      fetchDataByQuery();
    } else {
      // console.log("Shite happened");
      // console.log("Filter: " + filter);
      setSelectDate("Select Date from Calendar");
      // setDataUpdated(!dataUpdated);
    }
    // Triggers to the useEffect()
  }, [selectDate]);

  function TableView_3() {
    return (
      <View>
        {data_3.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
              <Ionicons name="time-outline" size={17} color="#FFF" />
              <Text style={styles.textFormat1}>{item.data.time}</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text style={styles.textFormat2}>{item.data.league}</Text>
              <View style={styles.textLayout1}>
                <Text style={styles.textFormat1}>{item.data.home}</Text>
                <Text style={styles.textFormat1}>{item.data.away}</Text>
              </View>
              <View style={styles.textLayout1}>
                <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
                <Text style={styles.cl2_odd}>{item.data.odds}</Text>
              </View>
            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.cl3_odd}>{item.trueKey}</Text>
              <Text style={styles.cl3_odd}>{item.data.score}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
  function TableView_5() {
    return (
      <View>
        {data_5.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
              <Ionicons name="time-outline" size={17} color="#FFF" />
              <Text style={styles.textFormat1}>{item.data.time}</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text style={styles.textFormat2}>{item.data.league}</Text>
              <View style={styles.textLayout1}>
                <Text style={styles.textFormat1}>{item.data.home}</Text>
                <Text style={styles.textFormat1}>{item.data.away}</Text>
              </View>
              <View style={styles.textLayout1}>
                <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
                <Text style={styles.cl2_odd}>{item.data.odds}</Text>
              </View>
            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.cl3_odd}>{item.trueKey}</Text>
              <Text style={styles.cl3_odd}>{item.data.score}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
  function TableView_10() {
    return (
      <View>
        {data_10.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
              <Ionicons name="time-outline" size={17} color="#FFF" />
              <Text style={styles.textFormat1}>{item.data.time}</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text style={styles.textFormat2}>{item.data.league}</Text>
              <View style={styles.textLayout1}>
                <Text style={styles.textFormat1}>{item.data.home}</Text>
                <Text style={styles.textFormat1}>{item.data.away}</Text>
              </View>
              <View style={styles.textLayout1}>
                <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
                <Text style={styles.cl2_odd}>{item.data.odds}</Text>
              </View>
            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.cl3_odd}>{item.trueKey}</Text>
              <Text style={styles.cl3_odd}>{item.data.score}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
  function TableView_25() {
    return (
      <View>
        {data_25.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
              <Ionicons name="time-outline" size={17} color="#FFF" />
              <Text style={styles.textFormat1}>{item.data.time}</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text style={styles.textFormat2}>{item.data.league}</Text>
              <View style={styles.textLayout1}>
                <Text style={styles.textFormat1}>{item.data.home}</Text>
                <Text style={styles.textFormat1}>{item.data.away}</Text>
              </View>
              <View style={styles.textLayout1}>
                <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
                <Text style={styles.cl2_odd}>{item.data.odds}</Text>
              </View>
            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.cl3_odd}>{item.trueKey}</Text>
              <Text style={styles.cl3_odd}>{item.data.score}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
  function TableView_70() {
    return (
      <View>
        {data_70.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
              <Ionicons name="time-outline" size={17} color="#FFF" />
              <Text style={styles.textFormat1}>{item.data.time}</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text style={styles.textFormat2}>{item.data.league}</Text>
              <View style={styles.textLayout1}>
                <Text style={styles.textFormat1}>{item.data.home}</Text>
                <Text style={styles.textFormat1}>{item.data.away}</Text>
              </View>
              <View style={styles.textLayout1}>
                <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
                <Text style={styles.cl2_odd}>{item.data.odds}</Text>
              </View>
            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.cl3_odd}>{item.trueKey}</Text>
              <Text style={styles.cl3_odd}>{item.data.score}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
  function TableView_Alt() {
    return (
      <View>
        {data_Alt.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
              <Ionicons name="time-outline" size={17} color="#FFF" />
              <Text style={styles.textFormat1}>{item.data.time}</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text style={styles.textFormat2}>{item.data.league}</Text>
              <View style={styles.textLayout1}>
                <Text style={styles.textFormat1}>{item.data.home}</Text>
                <Text style={styles.textFormat1}>{item.data.away}</Text>
              </View>
              <View style={styles.textLayout1}>
                <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
                <Text style={styles.cl2_odd}>{item.data.odds}</Text>
              </View>
            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.cl3_odd}>{item.trueKey}</Text>
              <Text style={styles.cl3_odd}>{item.data.score}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  const HeaderVIP = ({ meLabel }) => {
    return (
      <View style={styles.categoryHeader}>
        <View style={styles.hLogo}>
          <Image
            style={styles.headerIcon}
            source={require("../assets/VIPLight.png")}
          />
        </View>
        <View style={styles.hLabel}>
          <Text style={styles.labelFormat}>{meLabel}</Text>
        </View>
      </View>
    );
  };
  HeaderVIP.propTypes = {
    meLabel: PropTypes.string.isRequired,
  };

  const HeaderVIPDark = ({ meLabel }) => {
    return (
      <View style={styles.categoryHeader}>
        <View style={styles.hLogo}>
          <Image
            style={styles.headerIcon}
            source={require("../assets/VIPDark.png")}
          />
        </View>
        <View style={styles.hLabel}>
          <Text style={styles.labelFormat}>{meLabel}</Text>
        </View>
      </View>
    );
  };
  HeaderVIPDark.propTypes = {
    meLabel: PropTypes.string.isRequired,
  };

  // Get today's date
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateV}>
          <Pressable
            onPress={() => {
              // console.log("Text date: " + formattedDate);
              // console.log("Text raw date: " + today);
              setSelectDate(formattedDate);
            }}
            style={{ alignSelf: "flex-start" }}
          >
            <Text style={styles.headerTextRounded}>Today: {formattedDate}</Text>
          </Pressable>
        </View>
        {/* <View style={styles.calV}>
          <Modal
            visible={showModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 350,
                  height: 200,
                }}
              >
                <View>Content of the small view modal</View>
                <Calendar
                  onDayPress={day => {
                    // console.log("selected day", day);
                    setSelectDate(day.dateString);
                    setShowModal(false);
                  }}
                  renderArrow={direction => {
                    if (direction == "left")
                      return (
                        <FontAwesome
                          name="chevron-left"
                          size={20}
                          color="#000"
                        />
                      );
                    if (direction == "right")
                      return (
                        <FontAwesome
                          name="chevron-right"
                          size={20}
                          color="#000"
                        />
                      );
                  }}
                />
                <Pressable
                  onPress={() => setShowModal(false)}
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: 100,
                  }}
                >
                  <MaterialIcons name="cancel" size={30} color="#000" />
                </Pressable>
              </View>
            </View>
          </Modal>
          <CalendarIcon
            onPress={() => {
              // Prevent reload on calender click
              // setDataUpdated(false);
              setShowModal(true);
              // console.log("Calendar pressed");
              // Debugger
              // console.log("Me status_update: " + dataUpdated);
              // console.log("Me status_fetch: " + fetchDataOnMount);
              // console.log("......Updating.......");
              // setDataUpdated(true);
              // console.log("Me status_update: " + dataUpdated);
              // setFetchDataOnMount(true);
              // console.log("Me status_fetch: " + fetchDataOnMount);
            }}
          />
        </View> */}
        <View style={styles.refV}>
          <RefreshIcon onPress={() => setRefresh(true)} />
        </View>
      </View>
      {isLoading ? ( // Check isLoading state
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      ) : (
        <View style={styles.content}>
          {/* <Text style={styles.contentText}>Content Section</Text> */}
          <ScrollView
            contentContainerStyle={{
              gap: 10,
            }}
            style={styles.tableViewParent}
          >
            <View style={styles.categoryView}>
              <HeaderVIP meLabel="Daily 3+" />
              <TableView_3 />
            </View>
            <View style={styles.categoryView}>
              <HeaderVIPDark meLabel="Daily 5+" />
              <TableView_5 />
            </View>
            <View style={styles.categoryView}>
              <HeaderVIP meLabel="Daily 10+" />
              <TableView_10 />
            </View>
            <View style={styles.categoryView}>
              <HeaderVIPDark meLabel="Daily 25+" />
              <TableView_25 />
            </View>
            <View style={styles.categoryView}>
              <HeaderVIP meLabel="Weekly 70+" />
              <TableView_70 />
            </View>
            <View style={styles.categoryView}>
              <HeaderVIPDark meLabel="Alternative VIP" />
              <TableView_Alt />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function VipSuccess() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  // const [showModal, setShowModal] = React.useState(false);
  const [selectDate, setSelectDate] = React.useState(
    "Select Date from Calendar",
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        collection(FIRESTORE_DB, "betiqprohub"),
      );
      const dataArr = [];
      try {
        if (querySnapshot.size !== 0) {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const status = data.status;
            // Find the won key where the value is true
            for (const key in status) {
              if (key === "won") {
                if (
                  status[key] === true &&
                  data.isShow === true &&
                  data.category !== "free"
                ) {
                  // console.log(doc.id, " => ", doc.data());
                  dataArr.push({ id: doc.id, data: doc.data(), trueKey: key });
                  break;
                }
              }
            }
          });
          setData(dataArr);
        } else {
          // console.log("Nothing to query or Check your internet");
          Alert.alert("Nothing to query or" + "\n" + "Check your internet :(");
        }
      } catch (error) {
        // console.log("Fetch failed");
        Alert.alert("Fetching data failed :(");
      }
      setIsLoading(false);
    };
    fetchData();
    if (refresh === true) {
      setRefresh(false);
    }
    // Triggers to the useEffect()
  }, [refresh]);

  React.useEffect(() => {
    const fetchDataByQuery = async () => {
      setIsLoading(true);
      //Empty array
      const dataArr = [];
      let q;
      q = query(
        collection(FIRESTORE_DB, "betiqprohub"),
        where("selectDate", "==", selectDate),
      );
      try {
        const querySnapshot2 = await getDocs(q);
        // console.log("Query Snapshot2 Size:", querySnapshot2.size);
        querySnapshot2.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("Do i get here?");
          const data = doc.data();
          const status = data.status;
          for (const key in status) {
            if (key === "won") {
              if (
                status[key] === true &&
                data.isShow === true &&
                data.category !== "free"
              ) {
                // console.log(doc.id, " => ", doc.data());
                dataArr.push({ id: doc.id, data: doc.data(), trueKey: key });
                break;
              }
            }
          }
        });
        setData(dataArr);
        // console.log("My dataArr: " + dataArr);
        setIsLoading(false);
        Alert.alert("Query successful :)");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
        setIsLoading(false);
        Alert.alert("Error fetching data by query :(");
        // setFilter(null);
      }
    };

    if (selectDate !== "Select Date from Calendar") {
      fetchDataByQuery();
    } else {
      // console.log("Shite happened");
      // console.log("Filter: " + filter);
      setSelectDate("Select Date from Calendar");
      // setDataUpdated(!dataUpdated);
    }
    // Triggers to the useEffect()
  }, [selectDate]);

  function TableView() {
    return (
      <View>
        {data.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
              <Ionicons name="time-outline" size={17} color="#FFF" />
              <Text style={styles.textFormat1}>{item.data.time}</Text>
            </View>
            <View style={styles.tableColumn2}>
              <Text style={styles.textFormat2}>{item.data.league}</Text>
              <View style={styles.textLayout1}>
                <Text style={styles.textFormat1}>{item.data.home}</Text>
                <Text style={styles.textFormat1}>{item.data.away}</Text>
              </View>
              <View style={styles.textLayout1}>
                <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
                <Text style={styles.cl2_odd}>{item.data.odds}</Text>
              </View>
            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.cl3_odd}>{item.trueKey}</Text>
              <Text style={styles.cl3_odd}>{item.data.score}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  // Get today's date
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateV}>
          <Pressable
            onPress={() => {
              // console.log("Text date: " + formattedDate);
              // console.log("Text raw date: " + today);
              setSelectDate(formattedDate);
            }}
            style={{ alignSelf: "flex-start" }}
          >
            <Text style={styles.headerTextRounded}>Today: {formattedDate}</Text>
          </Pressable>
        </View>
        {/* <View style={styles.calV}>
          <Modal
            visible={showModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 350,
                  height: 200,
                }}
              >
                <View>Content of the small view modal</View>
                <Calendar
                  onDayPress={day => {
                    // console.log("selected day", day);
                    setSelectDate(day.dateString);
                    setShowModal(false);
                  }}
                  renderArrow={direction => {
                    if (direction == "left")
                      return (
                        <FontAwesome
                          name="chevron-left"
                          size={20}
                          color="#000"
                        />
                      );
                    if (direction == "right")
                      return (
                        <FontAwesome
                          name="chevron-right"
                          size={20}
                          color="#000"
                        />
                      );
                  }}
                />
                <Pressable
                  onPress={() => setShowModal(false)}
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: 100,
                  }}
                >
                  <MaterialIcons name="cancel" size={30} color="#000" />
                </Pressable>
              </View>
            </View>
          </Modal>
          <CalendarIcon
            onPress={() => {
              // Prevent reload on calender click
              // setDataUpdated(false);
              setShowModal(true);
              // console.log("Calendar pressed");
              // Debugger
              // console.log("Me status_update: " + dataUpdated);
              // console.log("Me status_fetch: " + fetchDataOnMount);
              // console.log("......Updating.......");
              // setDataUpdated(true);
              // console.log("Me status_update: " + dataUpdated);
              // setFetchDataOnMount(true);
              // console.log("Me status_fetch: " + fetchDataOnMount);
            }}
          />
        </View> */}
        <View style={styles.refV}>
          <RefreshIcon onPress={() => setRefresh(true)} />
        </View>
      </View>
      {isLoading ? ( // Check isLoading state
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      ) : (
        <View style={styles.content}>
          {/* <Text style={styles.contentText}>Content Section</Text> */}
          <ScrollView style={styles.tableViewParent}>
            <TableView />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// function FreeHistory() {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [data, setData] = React.useState([]);
//   const [refresh, setRefresh] = React.useState(false);

//   // const [showModal, setShowModal] = React.useState(false);
//   const [selectDate, setSelectDate] = React.useState(
//     "Select Date from Calendar",
//   );

//   React.useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const querySnapshot = await getDocs(
//         collection(FIRESTORE_DB, "betiqprohub"),
//       );
//       const dataArr = [];
//       try {
//         if (querySnapshot.size !== 0) {
//           querySnapshot.forEach(doc => {
//             // doc.data() is never undefined for query doc snapshots
//             const data = doc.data();
//             const status = data.status;
//             // Find the key where the N/A value is false and later is true
//             for (const key in status) {
//               if (key !== "N/A") {
//                 if (
//                   status[key] === true &&
//                   data.category === "Free" &&
//                   data.isShow === true
//                 ) {
//                   // console.log(doc.id, " => ", doc.data());
//                   dataArr.push({ id: doc.id, data: doc.data(), trueKey: key });
//                   break;
//                 }
//               }
//             }
//           });
//           setData(dataArr);
//         } else {
//           // console.log("Nothing to query or Check your internet");
//           Alert.alert("Nothing to query or" + "\n" + "Check your internet :(");
//         }
//       } catch (error) {
//         // console.log("Fetch failed");
//         Alert.alert("Fetching data failed :(");
//       }
//       setIsLoading(false);
//     };
//     fetchData();
//     if (refresh === true) {
//       setRefresh(false);
//     }
//     // Triggers to the useEffect()
//   }, [refresh]);

//   React.useEffect(() => {
//     const fetchDataByQuery = async () => {
//       setIsLoading(true);
//       const dataArr = [];
//       let q;
//       q = query(
//         collection(FIRESTORE_DB, "betiqprohub"),
//         where("selectDate", "==", selectDate),
//       );
//       try {
//         const querySnapshot2 = await getDocs(q);
//         // console.log("Query Snapshot2 Size:", querySnapshot2.size);
//         querySnapshot2.forEach(doc => {
//           // doc.data() is never undefined for query doc snapshots
//           const data = doc.data();
//           const status = data.status;
//           // Find the key where the N/A value is false and later is true
//           for (const key in status) {
//             if (key !== "N/A") {
//               if (
//                 status[key] === true &&
//                 data.category === "Free" &&
//                 data.isShow === true
//               ) {
//                 // console.log(doc.id, " => ", doc.data());
//                 dataArr.push({ id: doc.id, data: doc.data(), trueKey: key });
//                 break;
//               }
//             }
//           }
//         });
//         setData(dataArr);
//         setIsLoading(false);
//         Alert.alert("Query successful :)");
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle the error as needed
//         setIsLoading(false);
//         Alert.alert("Error fetching data by query :(");
//         // setFilter(null);
//       }
//     };

//     if (selectDate !== "Select Date from Calendar") {
//       fetchDataByQuery();
//     } else {
//       // console.log("Shite happened");
//       // console.log("Filter: " + filter);
//       setSelectDate("Select Date from Calendar");
//       // setDataUpdated(!dataUpdated);
//     }
//     // Triggers to the useEffect()
//   }, [selectDate]);

//   function TableView() {
//     return (
//       <View>
//         {data.map(item => (
//           <View key={item.id} style={styles.tableContainer}>
//             <View style={styles.tableColumn1}>
//               <Ionicons name="time-outline" size={17} color="#FFF" />
//               <Text style={styles.textFormat1}>{item.data.time}</Text>
//             </View>
//             <View style={styles.tableColumn2}>
//               <Text style={styles.textFormat2}>{item.data.league}</Text>
//               <View style={styles.textLayout1}>
//                 <Text style={styles.textFormat1}>{item.data.home}</Text>
//                 <Text style={styles.textFormat1}>{item.data.away}</Text>
//               </View>
//               <View style={styles.textLayout1}>
//                 <Text style={styles.cl2_oddLabel}>{item.data.predictions}</Text>
//                 <Text style={styles.cl2_odd}>{item.data.odds}</Text>
//               </View>
//             </View>
//             <View style={styles.tableColumn3}>
//               <Text style={styles.cl3_odd}>{item.trueKey}</Text>
//               <Text style={styles.cl3_odd}>{item.data.score}</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     );
//   }

//   const BetsHistory = () => {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <View style={styles.dateV}>
//             <Pressable
//               onPress={() => {
//                 // console.log("Text date: " + formattedDate);
//                 // console.log("Text raw date: " + today);
//                 setSelectDate(formattedDate);
//               }}
//               style={{ alignSelf: "flex-start" }}
//             >
//               <Text style={styles.headerTextRounded}>
//                 Today: {formattedDate}
//               </Text>
//             </Pressable>
//           </View>
//           {/* <View style={styles.calV}>
//           <Modal
//             visible={showModal}
//             animationType="fade"
//             transparent={true}
//             onRequestClose={() => setShowModal(false)}
//           >
//             <View
//               style={{
//                 flex: 0.5,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <View
//                 style={{
//                   width: 350,
//                   height: 200,
//                 }}
//               >
//                 <View>Content of the small view modal</View>
//                 <Calendar
//                   onDayPress={day => {
//                     // console.log("selected day", day);
//                     setSelectDate(day.dateString);
//                     setShowModal(false);
//                   }}
//                   renderArrow={direction => {
//                     if (direction == "left")
//                       return (
//                         <FontAwesome
//                           name="chevron-left"
//                           size={20}
//                           color="#000"
//                         />
//                       );
//                     if (direction == "right")
//                       return (
//                         <FontAwesome
//                           name="chevron-right"
//                           size={20}
//                           color="#000"
//                         />
//                       );
//                   }}
//                 />
//                 <Pressable
//                   onPress={() => setShowModal(false)}
//                   style={{
//                     alignSelf: "center",
//                     alignItems: "center",
//                     backgroundColor: "white",
//                     width: 100,
//                   }}
//                 >
//                   <MaterialIcons name="cancel" size={30} color="#000" />
//                 </Pressable>
//               </View>
//             </View>
//           </Modal>
//           <CalendarIcon
//             onPress={() => {
//               // Prevent reload on calender click
//               // setDataUpdated(false);
//               setShowModal(true);
//               // console.log("Calendar pressed");
//               // Debugger
//               // console.log("Me status_update: " + dataUpdated);
//               // console.log("Me status_fetch: " + fetchDataOnMount);
//               // console.log("......Updating.......");
//               // setDataUpdated(true);
//               // console.log("Me status_update: " + dataUpdated);
//               // setFetchDataOnMount(true);
//               // console.log("Me status_fetch: " + fetchDataOnMount);
//             }}
//           />
//         </View> */}
//           <View style={styles.refV}>
//             <RefreshIcon onPress={() => setRefresh(true)} />
//           </View>
//         </View>
//         {isLoading ? ( // Check isLoading state
//           <View style={styles.preloader}>
//             <ActivityIndicator size="large" color="#9E9E9E" />
//           </View>
//         ) : (
//           <View style={styles.content}>
//             {/* <Text style={styles.contentText}>Content Section</Text> */}
//             <ScrollView>
//               <TableView />
//             </ScrollView>
//           </View>
//         )}
//       </View>
//     );
//   };

//   const Bets = () => {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <View style={styles.dateV}>
//             <Pressable
//               onPress={() => {
//                 // console.log("Text date: " + formattedDate);
//                 // console.log("Text raw date: " + today);
//                 setSelectDate(formattedDate);
//               }}
//               style={{ alignSelf: "flex-start" }}
//             >
//               <Text style={styles.headerTextRounded}>
//                 Today: {formattedDate}
//               </Text>
//             </Pressable>
//           </View>
//           {/* <View style={styles.calV}>
//             <Modal
//               visible={showModal}
//               animationType="fade"
//               transparent={true}
//               onRequestClose={() => setShowModal(false)}
//             >
//               <View
//                 style={{
//                   flex: 0.5,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <View
//                   style={{
//                     width: 350,
//                     height: 200,
//                   }}
//                 >
//                   <View>Content of the small view modal</View>
//                   <Calendar
//                     onDayPress={day => {
//                       // console.log("selected day", day);
//                       setSelectDate(day.dateString);
//                       setShowModal(false);
//                     }}
//                     renderArrow={direction => {
//                       if (direction == "left")
//                         return (
//                           <FontAwesome
//                             name="chevron-left"
//                             size={20}
//                             color="#000"
//                           />
//                         );
//                       if (direction == "right")
//                         return (
//                           <FontAwesome
//                             name="chevron-right"
//                             size={20}
//                             color="#000"
//                           />
//                         );
//                     }}
//                   />
//                   <Pressable
//                     onPress={() => setShowModal(false)}
//                     style={{
//                       alignSelf: "center",
//                       alignItems: "center",
//                       backgroundColor: "white",
//                       width: 100,
//                     }}
//                   >
//                     <MaterialIcons name="cancel" size={30} color="#000" />
//                   </Pressable>
//                 </View>
//               </View>
//             </Modal>
//             <CalendarIcon
//               onPress={() => {
//                 // Prevent reload on calender click
//                 // setDataUpdated(false);
//                 setShowModal(true);
//                 // console.log("Calendar pressed");
//                 // Debugger
//                 // console.log("Me status_update: " + dataUpdated);
//                 // console.log("Me status_fetch: " + fetchDataOnMount);
//                 // console.log("......Updating.......");
//                 // setDataUpdated(true);
//                 // console.log("Me status_update: " + dataUpdated);
//                 // setFetchDataOnMount(true);
//                 // console.log("Me status_fetch: " + fetchDataOnMount);
//               }}
//             />
//           </View> */}
//           <View style={styles.refV}>
//             <RefreshIcon onPress={() => setRefresh(true)} />
//           </View>
//         </View>
//         {isLoading ? ( // Check isLoading state
//           <View style={styles.preloader}>
//             <ActivityIndicator size="large" color="#9E9E9E" />
//           </View>
//         ) : (
//           <View style={styles.content}>
//             {/* <Text style={styles.contentText}>Content Section</Text> */}
//             <ScrollView>
//               <TableView />
//             </ScrollView>
//           </View>
//         )}
//       </View>
//     );
//   };

//   // Get today's date
//   const today = new Date();
//   const formattedDate = today.toISOString().split("T")[0];
//   const Tab = createBottomTabNavigator();

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Bets" component={Bets} />
//       <Tab.Screen name="Bets History" component={BetsHistory} />
//     </Tab.Navigator>
//   );
// }

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="FreeTips"
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
      {/* <Tab.Screen
        name="FreeSuccess"
        component={FreeHistory}
        options={{ tabBarLabel: "FREE BETS HISTORY" }}
      /> */}
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
    padding: 5,
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerTextRounded: {
    backgroundColor: "#E7DFEC", // Background color
    borderRadius: 15, // Border radius
    fontSize: 17,
    color: "#554D5A",
    padding: 5,
    // marginRight: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "black",
    padding: 5,
    alignItems: "center",
  },
  contentText: {
    fontSize: 16,
    color: "white",
  },
  tableViewParent: {
    width: "90%",
    maxWidth: 400,
  },
  tableContainer: {
    flexDirection: "row",
    height: 90,
    padding: 5,
    // marginBottom: 10,
  },
  tableColumn1: {
    backgroundColor: "#141C31",
    flex: 0.25,
    borderWidth: 1,
    borderColor: "white",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tableColumn2: {
    backgroundColor: "#141C31",
    flex: 0.5,
    borderWidth: 1,
    borderColor: "white",
    borderStartWidth: 0,
    borderEndWidth: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tableColumn3: {
    backgroundColor: "#141C31",
    flex: 0.25,
    borderWidth: 1,
    borderColor: "white",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textLayout1: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
    // gap: 45,
    // backgroundColor: "pink",
  },
  textLayout2: {
    flexDirection: "column",
  },
  cl2_oddLabel: {
    color: "black",
    backgroundColor: "#FFFFFF",
    // borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    fontWeight: "700",
    fontSize: 12,
    minWidth: 50,
    textAlign: "center",
  },
  cl2_odd: {
    color: "#4C0400",
    backgroundColor: "#F88E10",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    fontWeight: "700",
    fontSize: 12,
    minWidth: 25,
    textAlign: "center",
  },
  cl3_odd: {
    color: "#55C147",
    backgroundColor: "#2B2D27",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    fontSize: 14,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dateView: {
    flexDirection: "row",
  },
  headerIcon: {
    width: 30, // Adjust the width as needed
    height: 30, // Adjust the height as needed
  },
  categoryHeader: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    backgroundColor: "#DDD",
    borderRadius: 10,
  },
  categoryView: {
    // gap: 20,
    // backgroundColor: "pink",
  },
  hLogo: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#FFF",
  },
  hLabel: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  dateV: {
    flex: 0.5,
    // backgroundColor: "pink",
  },
  // calV: {
  //   flex: 0.1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  refV: {
    flex: 0.5,
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  textFormat1: {
    fontWeight: "700",
    color: "#B9BBC0",
    fontSize: 13,
  },
  textFormat2: {
    fontWeight: "700",
    color: "#8A91A4",
    fontSize: 14,
  },
  labelFormat: {
    fontWeight: "700",
    fontSize: 16,
  },
});
