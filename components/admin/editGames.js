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
  Button,
  TextInput,
  Switch,
} from "react-native";
import { Calendar } from "react-native-calendars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import PropTypes from "prop-types";
import { FIRESTORE_DB } from "../../database/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

const RefreshIcon = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="refresh" size={25} color="black" />
    </Pressable>
  );
};
RefreshIcon.propTypes = {
  onPress: PropTypes.func, // Define the onPress prop
};

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

// EditModal
const EditModal = ({
  selectDate,
  editedData,
  setEditedData,
  handleUpdateItem,
  showEditModal,
  closeEditModal,
  itemID,
}) => {
  return (
    <Modal
      visible={showEditModal}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        // setShowEditModal(false);
        closeEditModal();
      }}
    >
      <View style={styles.editView}>
        <View
          style={{
            borderWidth: 3,
            borderColor: "#FEF202",
            width: 200,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {selectDate}
          </Text>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Time</Text>
            <TextInput
              // placeholder="Enter Time"
              value={editedData.time}
              onChangeText={text =>
                setEditedData({ ...editedData, time: text })
              }
            />
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>League</Text>
            <TextInput
              // placeholder="Enter League"
              value={editedData.league}
              onChangeText={text =>
                setEditedData({ ...editedData, league: text })
              }
            />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Home</Text>
            <TextInput
              // placeholder="Enter Home Team"
              value={editedData.home}
              onChangeText={text =>
                setEditedData({ ...editedData, home: text })
              }
            />
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Away</Text>
            <TextInput
              // placeholder="Enter Away Team"
              value={editedData.away}
              onChangeText={text =>
                setEditedData({ ...editedData, away: text })
              }
            />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Predictions</Text>
            <TextInput
              // placeholder="Enter Predictions"
              value={editedData.predictions}
              onChangeText={text =>
                setEditedData({ ...editedData, predictions: text })
              }
            />
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Odds</Text>
            <TextInput
              inputMode="decimal"
              // placeholder="Enter Odds"
              // value={odds ? odds.toString() : ""}
              value={editedData.odds}
              onChangeText={text => {
                const parsedValue = text.replace(/[^0-9.]/g, "");
                if (!isNaN(parsedValue)) {
                  // setOdds(parsedValue);
                  setEditedData({ ...editedData, odds: parsedValue });
                }
              }}
            />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Status</Text>
            <Picker
              selectedValue={
                editedData.isLost === true
                  ? "Lost"
                  : editedData.isLost === false
                  ? "Won"
                  : "N/A"
              }
              onValueChange={value => {
                if (value === "Lost") {
                  setEditedData({ ...editedData, isLost: true });
                } else if (value === "Won") {
                  setEditedData({ ...editedData, isLost: false });
                } else {
                  setEditedData({ ...editedData, isLost: null });
                }
              }}
            >
              <Picker.Item label="Won" value="Won" />
              <Picker.Item label="Lost" value="Lost" />
              <Picker.Item label="N/A" value="N/A" />
            </Picker>
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Score</Text>
            <TextInput
              // placeholder="Enter Score"
              value={editedData.score}
              onChangeText={text =>
                setEditedData({ ...editedData, score: text })
              }
            />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Category</Text>
            <Picker
              selectedValue={editedData.category}
              onValueChange={value =>
                setEditedData({ ...editedData, category: value })
              }
            >
              <Picker.Item label="Free" value="Free" />
              <Picker.Item label="Daily 3+" value="Daily 3+" />
              <Picker.Item label="Daily 5+" value="Daily 5+" />
              <Picker.Item label="Daily 10+" value="Daily 10+" />
              <Picker.Item label="Daily 25+" value="Daily 25+" />
              <Picker.Item label="Weekly 70+" value="Weekly 70+" />
              <Picker.Item label="Alternative VIP" value="Alternative VIP" />
            </Picker>
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Display</Text>
            <View style={styles.toggleContainer}>
              <Text>Hide</Text>
              <Switch
                value={editedData.isShow}
                onValueChange={value =>
                  setEditedData({ ...editedData, isShow: value })
                }
              />
              <Text>Show</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="#AF640D"
            title="Publish"
            onPress={() => {
              // console.log("Publish Updates initiated");
              handleUpdateItem(itemID);
            }}
          />
          <Pressable
            onPress={() => closeEditModal()}
            style={{
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="cancel" size={30} color="#000" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
EditModal.propTypes = {
  selectDate: PropTypes.string.isRequired,
  editedData: PropTypes.shape({
    time: PropTypes.string,
    league: PropTypes.string,
    home: PropTypes.string,
    away: PropTypes.string,
    predictions: PropTypes.string,
    odds: PropTypes.string,
    score: PropTypes.string,
    category: PropTypes.string,
    isShow: PropTypes.bool,
    isLost: PropTypes.bool,
  }).isRequired,
  setEditedData: PropTypes.func.isRequired,
  textInputRef: PropTypes.object,
  handleUpdateItem: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
  setShowEditModal: PropTypes.func.isRequired,
  itemID: PropTypes.string.isRequired,
};

export default function EditGames() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectDate, setSelectDate] = React.useState(
    "Select Date from Calendar",
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [fetchDataOnMount, setFetchDataOnMount] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [showFilterModal, setFilterModal] = React.useState(false);
  const [filter, setFilter] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  // const [isLost, setIsLost] = React.useState(null);
  const [editedData, setEditedData] = React.useState([]);

  React.useEffect(() => {
    // console.log("Fetchdata effect triggered!!!");
    const fetchData = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        collection(FIRESTORE_DB, "betiqprohub"),
      );
      const dataArr = [];
      //     console.log("Query Snapshot Size:", querySnapshot.size);
      querySnapshot.forEach(doc => {
        //       // doc.data() is never undefined for query doc snapshots
        // const data = doc.data();
        dataArr.push({ id: doc.id, data: doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });
      setData(dataArr);
      setIsLoading(false);
    };
    if (fetchDataOnMount) {
      fetchData();
      setFetchDataOnMount(false);
    }
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
    // Triggers to the useEffect()
  }, [fetchDataOnMount, refresh]);

  React.useEffect(() => {
    const fetchDataByQuery = async () => {
      setIsLoading(true);
      //Empty array
      const dataArr = [];
      const filterType = filter.type;
      // console.log("My filter: " + filterType + " Typeof: " + typeof filterType + " Value: " + filter.value + ", " + typeof filter.value);
      let q;
      if (filterType === "date") {
        q = query(
          collection(FIRESTORE_DB, "betiqprohub"),
          where("selectDate", "==", filter.value),
        );
        // console.log("Confirmation: " + (filter.value === "2023-11-09"));
      }
      if (filterType === "category") {
        q = query(
          collection(FIRESTORE_DB, "betiqprohub"),
          where("category", "==", filter.value),
        );
      }
      try {
        const querySnapshot2 = await getDocs(q);
        // console.log("Query Snapshot2 Size:", querySnapshot2.size);
        querySnapshot2.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("Do i get here?");
          dataArr.push({ id: doc.id, data: doc.data() });
          // console.log("My query data: " + "\n" + doc.id, " => ", doc.data());
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
        setFilter(null);
      }
    };

    if (
      filter !== "All" &&
      filter !== null &&
      filter !== "Select Date from Calendar"
    ) {
      fetchDataByQuery();
      // setFetchDataByQueryOnMount(false);
      // setFilter("Select Date from Calendar");
    } else {
      // console.log("Shite happened");
      // console.log("Filter: " + filter);
      setFilter(null);
      setDataUpdated(!dataUpdated);
    }
    // Triggers to the useEffect()
  }, [filter]);

  const handleDeleteItem = async itemId => {
    try {
      setIsLoading(true);
      // console.log("Delete initiated for ID:", itemId);
      // console.log("setDataUpdated1: " + dataUpdated);
      await deleteDoc(doc(FIRESTORE_DB, "betiqprohub", itemId));
      // console.log("Delete successful for ID:", itemId);
      // console.log("setDataUpdated2: " + dataUpdated);
      setIsLoading(false);
      setRefresh(true);
      Alert.alert("Item deletion successful :)");
    } catch (error) {
      setIsLoading(false);
      // console.log("Item deletion failed: " + error);
      Alert.alert("Item deletion failed :(" + error);
    }
  };

  const handleUpdateItem = async itemId => {
    try {
      setIsLoading(true);
      console.log("Data: " + itemId);
      // Prepare the data to update in Firestore
      const dataToUpdate = {
        away: editedData.away,
        category: editedData.category,
        home: editedData.home,
        isShow: editedData.isShow,
        league: editedData.league,
        odds: editedData.odds,
        predictions: editedData.predictions,
        score: editedData.score,
        selectDate: editedData.selectDate,
        status: {
          "N/A": editedData.isLost === null,
          lost: editedData.isLost === true,
          won: editedData.isLost === false,
        },
        time: editedData.time,
      };
      await updateDoc(
        doc(FIRESTORE_DB, "betiqprohub", itemId),
        dataToUpdate,
      ).catch(error => {
        console.log("Sth shit: " + error);
      });
      setIsLoading(false);
      setRefresh(true);
      Alert.alert("Item update successful :)");
    } catch (error) {
      setIsLoading(false);
      console.log("Item update failed: " + error);
      Alert.alert("Item update failed :(");
    }
  };

  const [editModalIndex, setEditModalIndex] = React.useState(null);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const openEditModal = (index, data) => {
    // console.log("EditedData: => " + editedData);
    // console.log("openEditModal, Index: " + index);
    // setIsLoading(true);
    setEditModalIndex(index);
    const selectedItem = data[index];
    setEditedData(selectedItem.data);
    // setIsLoading(false);
    // console.log("1" + showEditModal);
    setShowEditModal(true);
    setTimeout(() => {
      if (!showEditModal) {
        setShowEditModal(true);
      }
    }, 1000);
    // console.log(showEditModal);
  };
  const closeEditModal = () => {
    // setIsLoading(true);
    setEditModalIndex(null);
    setEditedData([]);
    // setIsLoading(false);
    // console.log("0" + showEditModal);
    setShowEditModal(false);
    setTimeout(() => {
      if (showEditModal) {
        setShowEditModal(false);
      }
    }, 1000);
    // console.log(showEditModal);
  };

  function DetailsView() {
    return (
      <View>
        {data.map((item, index) => (
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
                  // console.log("Edit initiated");
                  openEditModal(index, data);
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
                onPress={() => {
                  handleDeleteItem(item.id);
                  setDataUpdated(!dataUpdated);
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
            {/* EditView modal */}
            {editModalIndex === index && (
              <EditModal
                selectDate={selectDate}
                editedData={editedData}
                setEditedData={setEditedData}
                handleUpdateItem={handleUpdateItem}
                showModal={showModal}
                closeEditModal={closeEditModal}
                itemID={item.id}
                // setShowEditModal={setShowEditModal}
              />
            )}
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
    const getCategoryFromValue = value => {
      switch (value) {
        case "Select Your Filter ...":
          return "All";
        case "Select Date from Calendar":
          return "All";
        case selectDate:
          // console.log("Triggered");
          return { type: "date", value: selectDate };
        case "Daily 3+":
          return { type: "category", value: "Daily 3+" };
        case "Daily 5+":
          return { type: "category", value: "Daily 5+" };
        case "Daily 10+":
          return { type: "category", value: "Daily 10+" };
        case "Daily 25+":
          return { type: "category", value: "Daily 25+" };
        case "Weekly 70+":
          return { type: "category", value: "Weekly 70+" };
        case "Alternative VIP":
          return { type: "category", value: "Alternative VIP" };
        default:
          return "All";
      }
    };
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
            const newFilterValue = getCategoryFromValue(value);
            // console.log("Me filter value: " + newFilterValue);
            setFilter(newFilterValue);
            setFilterModal(false);
          }}
        >
          <Picker.Item
            label="Select Your Filter ..."
            value="Select Your Filter ..."
          />
          <Picker.Item label={selectDate} value={selectDate} />
          <Picker.Item label="Daily 3+" value="Daily 3+" />
          <Picker.Item label="Daily 5+" value="Daily 5+" />
          <Picker.Item label="Daily 10+" value="Daily 10+" />
          <Picker.Item label="Daily 25+" value="Daily 25+" />
          <Picker.Item label="Weekly 70+" value="Weekly 70+" />
          <Picker.Item label="Alternative VIP" value="Alternative VIP" />
          <Picker.Item label="All" value="All" />
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
            // console.log("Filter Menu initiated");
            setFilterModal(true);
          }}
        />
        <Modal
          visible={showFilterModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setFilterModal(false)}
        >
          <View
            style={{
              flex: 0.05,
              top: 163,
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "#DDD",
            }}
          >
            <FilterPicker />
          </View>
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
                  // console.log("selected day", day);
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
        <RefreshIcon
          onPress={() => {
            // console.log("Refresh Icon clicked");
            setRefresh(true);
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
    height: "7vh",
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
  editView: {
    // width: 500,
    top: 180,
    height: "auto",
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
});
