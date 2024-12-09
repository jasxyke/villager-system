import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import { SettingsProvider } from "../context/SettingsContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Itim-Regular": require("../assets/fonts/Itim-Regular.ttf"),
    "Jaldi-Bold": require("../assets/fonts/Jaldi-Bold.ttf"),
    "Jaldi-Regular": require("../assets/fonts/Jaldi-Regular.ttf"),
    "JejuGothic-Regular": require("../assets/fonts/JejuGothic-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <SettingsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
