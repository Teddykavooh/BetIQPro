import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  // KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import PropTypes from "prop-types"; // Import prop-types;
import { FIRESTORE_DB } from "../../database/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

const CalendarIcon = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="calendar" size={30} color="#000" />
    </Pressable>
  );
};

CalendarIcon.propTypes = {
  onPress: PropTypes.func, // Define the onPress prop
};

const FilterIcon = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <FontAwesome name="filter" size={30} color="#000" />
        <Text style={styles.headerText}>Filter</Text>
      </View>
    </Pressable>
  );
};

FilterIcon.propTypes = {
  onPress: PropTypes.func, // Define the onPress prop
};

export default function EditGames() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectDate, setSelectDate] = React.useState("Select Date from Calendar");
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [fetchDataOnMount, setFetchDataOnMount] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [showFilterModal, setFilterModal] = React.useState(false);
  const [filter, setFilter] = React.useState(null);
  const [fetchDataByQueryOnMount, setFetchDataByQueryOnMount] =
    React.useState(true);
  let dataArr = [];

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "betiqpro"));
      // const dataArr = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        dataArr.push({ id: doc.id, data: doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setData(dataArr);
      setIsLoading(false);
    };
    if (fetchDataOnMount) {
      fetchData();
      setFetchDataOnMount(false);
    }
    // Triggers to the useEffect()
  }, [dataUpdated, fetchDataOnMount]);

  React.useEffect(() => {
    const fetchDataByQuery = async () => {
      setIsLoading(true);
      //Empty array
      dataArr = [];
      const q = query(
        collection(FIRESTORE_DB, "betiqpro"),
        where("TzAXQoDXNIx2h2q7IT6Q", "==", "away"),
      );
      // const q = query(
      //   collection(FIRESTORE_DB, "betiqpro"),
      //   where("selectDate", "==", filter),
      // );
      const querySnapshot = await getDocs(q);
      // const dataArr = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        dataArr.push({ id: doc.id, data: doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });
      setData(dataArr);
      setIsLoading(false);
    };

    if (filter !== "All" && filter !== null) {
      fetchDataByQuery();
      setFetchDataByQueryOnMount(false);
    } else {
      setFilter(null);
      setFetchDataByQueryOnMount(false);
      // setFetchDataOnMount(true);
    }
    // Triggers to the useEffect()
  }, [filter, fetchDataByQueryOnMount]);

  const handleDeleteItem = async itemId => {
    try {
      setIsLoading(true);
      console.log("Delete initiated for ID:", itemId);
      console.log("setfetch1: " + fetchDataOnMount);
      console.log("setDataUpdated1: " + dataUpdated);
      await deleteDoc(doc(FIRESTORE_DB, "betiqpro", itemId));
      console.log("Delete successful for ID:", itemId);
      setDataUpdated(!dataUpdated);
      console.log("setDataUpdated2: " + dataUpdated);
      console.log("setfetch2: " + fetchDataOnMount);
      setIsLoading(false);
      Alert.alert("Item deletion successful :)");
    } catch (error) {
      setIsLoading(false);
      console.log("Item deletion failed: " + error);
      Alert.alert("Item deletion failed :(" + error);
    }
  };

  function DetailsView() {
    return (
      <View>
        {data.map(item => (
          <View key={item.id} style={styles.detail_view}>
            <View style={styles.d_v_cl1}>
              <Text style={styles.d_text}>{item.data.league}</Text>
              <Text style={styles.d_text}>{item.data.home}</Text>
              <Text
                style={{
                  color: "#FEF202",
                  borderWidth: 1,
                  borderColor: "#FEF202",
                  padding: 3,
                }}
              >
                {item.data.predictions}
              </Text>
            </View>
            <View style={styles.d_v_cl2}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Vs</Text>
            </View>
            <View style={styles.d_v_cl1}>
              <Text style={styles.d_text}>{item.data.time}</Text>
              <Text style={styles.d_text}>{item.data.away}</Text>
              <Text
                style={{
                  color: "black",
                  backgroundColor: "#FEF202",
                  padding: 3,
                  fontWeight: "bold",
                }}
              >
                {item.data.odds}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                // flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? "#FFD700" : "transparent",
                    borderWidth: 2,
                    borderColor: pressed ? null : "#AF640D",
                  },
                ]}
                onPress={() => {
                  console.log("Edit initiated");
                }}
              >
                {({ pressed }) => (
                  <View style={styles.buttonText}>
                    <Text
                      style={[
                        styles.text,
                        { color: pressed ? "black" : "white" },
                      ]}
                    >
                      Edit
                    </Text>
                    <AntDesign
                      name="edit"
                      size={20}
                      color={pressed ? "black" : "white"}
                    />
                  </View>
                )}
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? "#C73681" : "transparent",
                    borderWidth: 2,
                    borderColor: pressed ? null : "#D63E8B",
                  },
                ]}
                onPress={() => handleDeleteItem(item.id)}
              >
                {({ pressed }) => (
                  <View style={styles.buttonText}>
                    <Text
                      style={[
                        styles.text,
                        { color: pressed ? "black" : "white" },
                      ]}
                    >
                      Delete
                    </Text>
                    <AntDesign
                      name="delete"
                      size={20}
                      color={pressed ? "black" : "white"}
                    />
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    );
  }

  DetailsView.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
      }),
    ).isRequired,
  };

  function FilterPicker() {
    return (
      <View
        style={{
          // flex: 0.5,
          justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#DDD",
        }}
      >
        <Picker
          selectedValue={filter}
          onValueChange={value => {
            setFilter(value);
            setFilterModal(false);
          }}
        >
          <Picker.Item label={selectDate}></Picker.Item>
          <Picker.Item label="Daily 3" value="Daily 3" />
          <Picker.Item label="Daily 5" value="Daily 5" />
          <Picker.Item label="Daily 10+" value="Daily 10+" />
          <Picker.Item label="Daily 25+" value="Daily 25+" />
          <Picker.Item label="Weekly 70+" value="Weekly 70+" />
          <Picker.Item label="Alternative VIP" value="Alternative VIP" />
          <Picker.Item label="All"></Picker.Item>
        </Picker>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Games</Text>
        <FilterIcon
          onPress={() => {
            console.log("Filter Menu initiated");
            setFilterModal(true);
          }}
        />
        <Modal
          visible={showFilterModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setFilterModal(false)}
        >
          <FilterPicker />
        </Modal>
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
              {/* Content of the small view modal */}
              <Calendar
                onDayPress={day => {
                  console.log("selected day", day);
                  setSelectDate(day.dateString);
                  setShowModal(false);
                }}
                renderArrow={direction => {
                  if (direction == "left")
                    return (
                      <FontAwesome name="chevron-left" size={20} color="#000" />
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
            console.log("Calendar pressed");
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
      </View>
      {isLoading ? ( // Check isLoading state
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      ) : (
        <View style={styles.content}>
          <ScrollView>
            <DetailsView
              data={data}
              dataUpdated={dataUpdated}
              setDataUpdated={setDataUpdated}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 15,
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
    justifyContent: "center",
  },
  contentText: {
    fontSize: 16,
    color: "white",
  },
  detail_view: {
    display: "flex",
    flexDirection: "row",
    height: 100,
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 13,
    backgroundColor: "#141C31",
  },
  d_v_cl1: {
    flex: 0.4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  d_v_cl2: {
    flex: 0.2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  d_v_cl3: {
    flex: 0.4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  d_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  row_layout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    // alignItems: "center",
    borderColor: "#FFF",
    height: 50,
    width: 180,
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "center",
  },
  legend: {
    position: "absolute",
    top: -10,
    left: 10,
    fontWeight: "bold",
    backgroundColor: "#FFF",
    borderRadius: 5,
    width: 95,
    paddingLeft: 4,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
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
  button: {
    width: 75,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
