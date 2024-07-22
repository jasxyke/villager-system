import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { VILLAGER_ICON } from "../constants/icons";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={VILLAGER_ICON} style={styles.logo} />
      <Text className="text-4xl font-bold">VILLAGER</Text>
      <View className="w-full flex items-center gap-y-5">
        <Link
          push
          href="/sign-up"
          className="p-5 border text-center bg-greyGreen"
          style={styles.navContainer}
        >
          <Text style={styles.link}>Sign up</Text>
        </Link>

        <Link
          push
          href="/sign-in"
          className="p-5 border text-center bg-greyGreen"
          style={styles.navContainer}
        >
          <Text style={styles.link}>Sign in</Text>
        </Link>
      </View>

      <Link push href="/home" style={{ color: "green" }}>
        Go to Home (Tabs)
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 125,
    height: 125,
  },
  navContainer: {
    width: "75%",
    borderRadius: 20,
    color: colors.greyGreen,
  },

  link: {
    color: colors.white,
  },
});
