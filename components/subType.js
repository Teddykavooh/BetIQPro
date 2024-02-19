import * as React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types"; // Import prop-types;
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SubscriptionType({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonV}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SubUI")}
        >
          <Text style={styles.buttonText}>Weekly</Text>
          <FontAwesome name="chevron-right" size={25} color="black" />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SubUI")}
        >
          <Text style={styles.buttonText}>Monthly</Text>
          <FontAwesome name="chevron-right" size={25} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

// Add prop type validation for the navigation prop
SubscriptionType.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "black",
    padding: 5,
  },
  buttonV: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#DDD",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "6vh",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: 700,
  },
});
