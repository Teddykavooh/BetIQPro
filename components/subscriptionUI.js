import * as React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types"; // Import prop-types;

export default function SubscriptionUI({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon !!!</Text>
    </View>
  );
}

// Add prop type validation for the navigation prop
SubscriptionUI.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 5,
  },
  buttonV: {
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
