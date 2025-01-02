import { Stack } from "expo-router";
import React from "react";
import { colors } from "../../styles/colors";

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
      <Stack.Screen name="booking" options={{ title: "Book an Amenity" }} />
      <Stack.Screen name="car-stickers" options={{ title: "Car Stickers" }} />
      <Stack.Screen name="home-tab" options={{ headerShown: false }} />
      <Stack.Screen name="permits" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="stickers" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
