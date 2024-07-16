import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>VILLAGER APP TESTING EYYY</Text>
      <Image source={require("../assets/cool_villager.jpg")} />
      <StatusBar style="auto" />
      <Link push href="/login" style={{ color: "green" }}>
        Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
