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
      <Stack.Screen name="history" options={{ title: "Permit Payments" }} />
      <Stack.Screen name="requests" options={{ title: "Permit Requests" }} />
      <Stack.Screen name="current-permits" options={{ title: "Clearances" }} />
      <Stack.Screen
        name="ClearanceDetailsView"
        options={{ title: "Clearance Details View" }}
      />
    </Stack>
  );
};

export default _layout;
