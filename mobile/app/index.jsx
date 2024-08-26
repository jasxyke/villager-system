import { Link, Redirect, router, useRootNavigationState } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import MainBackgroundGradient from "../components/gradients/MainBackgroundGradient";
import AppLogo from "../components/common/AppLogo";
import { useEffect } from "react";
import { getItemAsync } from "expo-secure-store";
import { useAuthContext } from "../context/AuthContext";
export default function App() {
  const rootNavigationState = useRootNavigationState();
  const navigatorReady = rootNavigationState?.key != null;
  const { getUser } = useAuthContext();
  useEffect(() => {
    if (!navigatorReady) return;

    const checkIfCanLogin = async () => {
      const token = await getItemAsync("API_TOKEN");
      console.log(token);
      if (token !== null) {
        getUser();
        if (router.canGoBack()) {
          router.dismissAll();
        }
        router.replace("/home");
      }
    };
    checkIfCanLogin();
  }, [navigatorReady]);
  return (
    <SafeAreaView className="h-full" style={styles.container}>
      <MainBackgroundGradient />
      <AppLogo />
      {/* <Text className="text-4xl font-bold">VILLAGER</Text> */}
      <View className="w-full flex items-center gap-y-10">
        <Link
          push
          href="/sign-in"
          className="p-5 rounded-full text-center bg-primary font-pRegular text-lg"
          style={styles.navContainer}
        >
          <Text style={styles.link}>Login</Text>
        </Link>
        <Link
          push
          href="/booking"
          className="p-5 rounded-full text-center bg-greyGreen font-pRegular text-lg"
          style={styles.navContainer}
        >
          <Text style={styles.link}>Booking</Text>
        </Link>
      </View>
      <View></View>
      {/* <Link
        className="font-pRegular"
        push
        href="/home"
        style={{ color: "white" }}
      >
        Go to Home (Tabs)
      </Link> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 150,
    height: 150,
  },
  navContainer: {
    width: "50%",
    color: colors.greyGreen,
  },

  link: {
    color: colors.white,
  },
});
