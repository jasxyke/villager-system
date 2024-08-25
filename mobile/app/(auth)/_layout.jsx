import React from "react";
import { Stack } from "expo-router";
import { colors } from "../../styles/colors";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, headerTitle: "Sign in" }}
      />
      <Stack.Screen
        name="booking"
        options={{
          headerShown: true,
          title: "Booking",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.green,
          },
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
