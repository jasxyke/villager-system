import { Stack } from "expo-router";
import { colors } from "../../styles/colors";

export default function FormsLayout() {
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
      <Stack.Screen name="sticker-form" options={{ title: "Car Stickers" }} />
      <Stack.Screen name="permit-form" options={{ title: "House Permit" }} />
    </Stack>
  );
}
