import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Switch,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types"; // Import prop-types;
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FIRESTORE_DB } from "../../database/firebase";
import { collection, addDoc } from "firebase/firestore";

const CalendarIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name="calendar" size={30} color="#000" />
    </TouchableOpacity>
  );
};

CalendarIcon.propTypes = {
  onPress: PropTypes.func, // Define the onPress prop
};

export default function AddGames() {
  const saveDataToFirestore = async () => {
    try {
      setIsLoading(true);
      const dataToAdd = {
        away,
        category,
        selectDate,
        isShow,
        home,
        league,
        predictions,
        odds,
        score,
        time,
        status: {
          "N/A": isLost === null, // Replace with the values from your component state
          lost: isLost === true, // Check if it's "Lost"
          won: isLost === false, // Check if it's "Won"
        },
      };

      await addDoc(collection(FIRESTORE_DB, "betiqprohub"), dataToAdd);
      // console.log("Data saved with ID: ", docRef.id);
      setIsLoading(false);
      Alert.alert("Game published successfully :)");
    } catch (error) {
      // console.error("Error saving data: ", error);
      Alert.alert("Game publishing failed :(");
      setIsLoading(false);
    }
  };

  function DetailsView() {
    return (
      <View>
        <View style={styles.detail_view}>
          <View style={styles.d_v_cl1}>
            <Text style={styles.d_text}>{league}</Text>
            <Text style={styles.d_text}>{home}</Text>
            <Text
              style={{
                color: "#FEF202",
                borderWidth: 1,
                borderColor: "#FEF202",
                padding: 3,
              }}
            >
              {predictions}
            </Text>
          </View>
          <View style={styles.d_v_cl2}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Vs</Text>
          </View>
          <View style={styles.d_v_cl1}>
            <Text style={styles.d_text}>{time}</Text>
            <Text style={styles.d_text}>{away}</Text>
            <Text
              style={{
                color: "black",
                backgroundColor: "#FEF202",
                padding: 3,
                fontWeight: "bold",
              }}
            >
              {odds}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            color="#AF640D"
            title="Publish"
            onPress={() => {
              // console.log("Publish initiated");
              saveDataToFirestore();
            }}
          ></Button>
        </View>
      </View>
    );
  }

  const [isLost, setIsLost] = React.useState(null); // Initial value: false (Won)
  const [isShow, setIsShow] = React.useState(true); // Initial value: true (Show)
  const [category, setCategory] = React.useState("Daily 3"); // Initial value: "Daily 3"
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [score, setScore] = React.useState("");
  const [selectDate, setSelectDate] = React.useState("");
  const [predictions, setPredictions] = React.useState("");
  const [home, setHome] = React.useState("");
  const [away, setAway] = React.useState("");
  const [odds, setOdds] = React.useState(0);
  const [time, setTime] = React.useState("");
  const [league, setLeague] = React.useState("");

  // const updateInputVal = (val, prop) => {
  //   // const state = this.state;
  //   this.setState({ [prop]: val });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Games</Text>
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
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  width: 100,
                }}
              >
                <MaterialIcons name="cancel" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <CalendarIcon
          onPress={() => {
            setShowModal(true);
            // console.log("Calendar pressed");
          }}
        />
      </View>
      {isLoading ? ( // Check isLoading state
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      ) : (
        <View style={styles.content}>
          <DetailsView />
          <View
            style={{
              margin: 10,
              borderColor: "yellow",
              borderRadius: 10,
              borderWidth: 2,
              width: 100,
              height: 35,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              {selectDate}
            </Text>
          </View>
          <View style={styles.row_layout}>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Time</Text>
              <TextInput
                placeholder="Enter Time"
                value={time}
                onChangeText={text => setTime(text)}
              />
            </View>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>League</Text>
              <TextInput
                placeholder="Enter League"
                value={league}
                onChangeText={text => setLeague(text)}
              />
            </View>
          </View>
          <View style={styles.row_layout}>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Home</Text>
              <TextInput
                placeholder="Enter Home Team"
                value={home}
                onChangeText={text => setHome(text)}
              />
            </View>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Away</Text>
              <TextInput
                placeholder="Enter Away Team"
                value={away}
                onChangeText={text => setAway(text)}
              />
            </View>
          </View>
          <View style={styles.row_layout}>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Predictions</Text>
              <TextInput
                placeholder="Enter Predictions"
                value={predictions}
                onChangeText={text => setPredictions(text)}
              />
            </View>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Odds</Text>
              <TextInput
                inputMode="decimal"
                placeholder="Enter Odds"
                value={odds ? odds.toString() : ""}
                onChangeText={text => {
                  const parsedValue = text.replace(/[^0-9.]/g, "");
                  if (!isNaN(parsedValue)) {
                    setOdds(parsedValue);
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
                  isLost === true ? "Lost" : isLost === false ? "Won" : "N/A"
                }
                onValueChange={value => {
                  if (value === "Lost") {
                    setIsLost(true);
                  } else if (value === "Won") {
                    setIsLost(false);
                  } else {
                    setIsLost(null);
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
                placeholder="Enter Score"
                value={score}
                onChangeText={text => setScore(text)}
              />
            </View>
          </View>
          <View style={styles.row_layout}>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Category</Text>
              <Picker
                selectedValue={category}
                onValueChange={value => setCategory(value)}
              >
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
                  value={isShow}
                  onValueChange={value => setIsShow(value)}
                />
                <Text>Show</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
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
    alignItems: "center",
    justifyContent: "space-between",
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
});
