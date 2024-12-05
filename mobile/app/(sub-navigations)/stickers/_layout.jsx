import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { colors } from "../../../styles/colors";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="history" options={{ title: "Payment History" }} />
      <Stack.Screen name="requests" options={{ title: "Pending Requests" }} />
      <Stack.Screen name="current-stickers" options={{ title: "Stickers" }} />
      <Stack.Screen name="StickerDetailsView" options={{ title: "Stickers Details" }} />
    </Stack>
  );
};

export default _layout;
