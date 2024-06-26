import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HeaderLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoIcon}
        source={require("../assets/logo_icon.png")}
      />
      <Text style={styles.logoText}>
        BET<Text style={styles.whiteText}>IQ</Text>PRO
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row", // Arrange the image and text horizontally
    alignItems: "center", // Center them vertically
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "#000",
  },
  logoIcon: {
    width: 30, // Adjust the width as needed
    height: 35, // Adjust the height as needed
  },
  logoText: {
    // Define any common styles for the logo text here.
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 30,
    // height: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  whiteText: {
    color: "white", // Set the color to white for the "IQ" letters.
  },
});

export default HeaderLogo;
