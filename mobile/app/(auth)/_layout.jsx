import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, headerTitle: "Sign in" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, title: "Sign in" }}
      />
    </Stack>
  );
};

export default AuthLayout;
