import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

function DetailsView() {
  return (
    <View>
      <View style={styles.detail_view}>
        <View style={styles.d_v_cl1}>
          <Text>League</Text>
          <Text>Home</Text>
          <Text style={{ color: "#FEF202", backgroundColor: "black" }}>
            Predictions
          </Text>
        </View>
        <View style={styles.d_v_cl2}>
          <Text>Vs</Text>
        </View>
        <View style={styles.d_v_cl1}>
          <Text>Time</Text>
          <Text>Away</Text>
          <Text style={{ color: "black", backgroundColor: "#FEF202" }}>
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
          style={{
            color: "black",
            backgroundColor: "#FEF202",
            borderRadius: 15,
          }}
        >
          Publish
        </Button>
      </View>
    </View>
  );
}

export default function editGames() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Games</Text>
        <Text style={styles.headerText}>Calender</Text>
      </View>

      <View style={styles.content}>
        <DetailsView />
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
  },
  contentText: {
    fontSize: 16,
    color: "white",
  },
  detail_view: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 13,
  },
  d_v_cl1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  d_v_cl2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#FEF202",
  },
});
