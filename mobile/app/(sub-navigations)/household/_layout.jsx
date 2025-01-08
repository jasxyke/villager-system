import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
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
      <Stack.Screen name="house-member" options={{ title: "Manage Member" }} />
    </Stack>
  );
};

export default _layout;
