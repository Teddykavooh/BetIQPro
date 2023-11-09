import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native-gesture-handler";
import { FIRESTORE_DB } from "../database/firebase";
import { collection, getDocs, doc } from "firebase/firestore";


function FreeTips() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "betiqpro"));
      const dataArr = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        const status = data.status;
        let trueKey = null;
        // Find the key where the value is true
        for (const key in status) {
          if (status[key] === true) {
            trueKey = key;
            break;
          }
        }
        dataArr.push({ id: doc.id, data: doc.data(), trueKey: trueKey });
        console.log(doc.id, " => ", doc.data());
      });
      setData(dataArr);
      setIsLoading(false);
    };
    fetchData();
    // Triggers to the useEffect()
  }, []);

  function TableView() {
    return (
      <View>
        {data.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
            <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
              {item.data.time}
            </Text>
          </View>
          <View style={styles.tableColumn2}>
            <Text style={{ fontWeight: "bold", color: "#8A91A4", fontSize: 16 }}>
              {item.data.league}
            </Text>
            <View style={styles.textLayout1}>
              <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
                {item.data.home}
              </Text>
              <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
                {item.data.away}
              </Text>
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
  const formattedDate = today.toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTextRounded}>Today</Text>
        <Text style={styles.headerTextRounded}>{formattedDate}</Text>
      </View>

      <View style={styles.content}>
        {/* <Text style={styles.contentText}>Content Section</Text> */}
        <ScrollView>
          <TableView />
        </ScrollView>
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "betiqpro"));
      const dataArr = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        const status = data.status;
        let trueKey = null;
        // Find the key where the value is true
        for (const key in status) {
          if (status[key] === true) {
            trueKey = key;
            break;
          }
        }
        // Filter VIP games
        if (!(data.category === "Daily 3+") && !(data.category === "Daily 5+")) {
          dataArr.push({ id: doc.id, data: doc.data(), trueKey: trueKey });
          // console.log(doc.id, " => ", doc.data());
        }
      });
      setData(dataArr);
      setIsLoading(false);
    };
    fetchData();
    // Triggers to the useEffect()
  }, []);

  function TableView() {
    return (
      <View>
        {data.map(item => (
          <View key={item.id} style={styles.tableContainer}>
            <View style={styles.tableColumn1}>
            <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
              {item.data.time}
            </Text>
          </View>
          <View style={styles.tableColumn2}>
            <Text style={{ fontWeight: "bold", color: "#8A91A4", fontSize: 16 }}>
              {item.data.league}
            </Text>
            <View style={styles.textLayout1}>
              <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
                {item.data.home}
              </Text>
              <Text style={{ fontWeight: "bold", color: "#B9BBC0", fontSize: 16 }}>
                {item.data.away}
              </Text>
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
  const formattedDate = today.toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTextRounded}>Today</Text>
        <Text style={styles.headerTextRounded}>{formattedDate}</Text>
      </View>

      <View style={styles.content}>
        {/* <Text style={styles.contentText}>Content Section</Text> */}
        <ScrollView>
          <TableView />
        </ScrollView>
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
    backgroundColor: "#141C31",
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
    backgroundColor: "#141C31",
    flex: 0.6,
    borderWidth: 1,
    borderColor: "white",
    borderStartWidth: 0,
    borderEndWidth: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tableColumn3: {
    backgroundColor: "#141C31",
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
    fontSize: 17,
  },
  cl2_odd: {
    color: "#4C0400",
    backgroundColor: "#F88E10",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 17,
  },
  cl3_odd: {
    color: "#55C147",
    backgroundColor: "#2B2D27",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    fontSize: 18,
  },
});
