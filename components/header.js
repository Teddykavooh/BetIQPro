import React from "react";
import { Text, StyleSheet } from "react-native";

const HeaderLogo = () => {
  return (
    <Text style={styles.logoText}>
      BET<span style={styles.whiteText}>IQ</span>PRO
    </Text>
  );
};

const styles = StyleSheet.create({
  logoText: {
    // Define any common styles for the logo text here.
    fontStyle: "italic",
    fontWeight: "bold",
  },
  whiteText: {
    color: "white", // Set the color to white for the "IQ" letters.
  },
});

export default HeaderLogo;
