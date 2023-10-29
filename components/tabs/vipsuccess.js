import { React } from "react";
import { StyleSheet, View, Text } from "react-native";

const VipSuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Tips Success Content Goes Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  textStyle: {
    fontSize: 15,
  },
});

export default VipSuccessScreen;
