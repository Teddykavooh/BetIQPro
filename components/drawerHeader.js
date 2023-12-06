import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import HeaderLogo from "./header";

export const DrawerHeader = props => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          //   backgroundColor: "#B72E81",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={styles.header}>
          <HeaderLogo />
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#FEF202",
    width: "90%",
    height: "20%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #000",
  },
});
