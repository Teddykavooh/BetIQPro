import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Switch,
  Picker,
} from "react-native";

function DetailsView() {
  return (
    <View>
      <View style={styles.detail_view}>
        <View style={styles.d_v_cl1}>
          <Text style={styles.d_text}>League</Text>
          <Text style={styles.d_text}>Home</Text>
          <Text
            style={{
              color: "#FEF202",
              borderWidth: 1,
              borderColor: "#FEF202",
              padding: 3,
            }}
          >
            Predictions
          </Text>
        </View>
        <View style={styles.d_v_cl2}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Vs</Text>
        </View>
        <View style={styles.d_v_cl1}>
          <Text style={styles.d_text}>Time</Text>
          <Text style={styles.d_text}>Away</Text>
          <Text
            style={{
              color: "black",
              backgroundColor: "#FEF202",
              padding: 3,
              fontWeight: "bold",
            }}
          >
            Odds
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
          onPress={() => console.log("Publish")}
        ></Button>
      </View>
    </View>
  );
}

export default function AddGames() {
  const [isLost, setIsLost] = React.useState(false); // Initial value: false (Won)
  const [isShow, setIsShow] = React.useState(true); // Initial value: true (Show)
  const [category, setCategory] = React.useState("Daily 3"); // Initial value: "Daily 3"

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Games</Text>
        <Text style={styles.headerText}>Calender</Text>
      </View>

      <View style={styles.content}>
        <DetailsView />
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
            alignSelf: "center",
            margin: 10,
          }}
        >
          Date
        </Text>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Time</Text>
            <TextInput placeholder="Some text" />
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>League</Text>
            <TextInput placeholder="Some text" />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Home</Text>
            <TextInput placeholder="Some text or control" />
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Away</Text>
            <TextInput placeholder="Some text" />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Predictions</Text>
            <TextInput placeholder="Some text" />
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>ODDs</Text>
            <TextInput placeholder="Some text" />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Status</Text>
            <Picker
              selectedValue={isLost ? "Lost" : isLost === false ? "Won" : "N/A"}
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
            <TextInput placeholder="Some text" />
          </View>
        </View>
        <View style={styles.row_layout}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={value => setCategory(value)}
            >
              <Picker.Item label="Daily 3" value="Daily 3" />
              <Picker.Item label="Daily 5" value="Daily 5" />
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
    width: 150,
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
    width: 80,
    paddingLeft: 4,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
});
