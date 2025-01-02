import { Tabs } from "expo-router";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  BILLS,
  CAR,
  HOME,
  PERMITS,
  PROFILE,
  SERVICES,
} from "../../constants/icons";
import { colors } from "../../styles/colors";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={"items-center justify-center"}>
      <Image
        source={icon}
        tintColor={color}
        style={styles.iconStyle}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-semibold" : "font-normal"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
const MainLayout = () => {
  return (
    <>
      <StatusBar />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.white,
          tabBarStyle: { backgroundColor: colors.greyGreen },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={HOME}
                color={color}
                focused={focused}
                name={"Home"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bills"
          options={{
            title: "Bills",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={BILLS}
                color={color}
                focused={focused}
                name={"Bills"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: "Services",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={SERVICES}
                color={color}
                focused={focused}
                name={"services"}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="permits"
          options={{
            title: "Permits",
            headerShown: false,
            href: null,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={PERMITS}
                color={color}
                focused={focused}
                name={"Clearances"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="car-stickers"
          options={{
            title: "car-stickers",
            headerShown: false,
            href: null,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={CAR}
                color={color}
                focused={focused}
                name={"Car Stickers"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            title: "Booking",
            headerShown: true,
            href: null,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={CAR}
                color={color}
                focused={focused}
                name={"booking"}
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={PROFILE}
                color={color}
                focused={focused}
                name={"Profile"}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="car-stickers"
          options={{ href: null, headerShown: false }}
        /> */}
        {/* <Tabs.Screen
          name="permits"
          options={{ href: null, headerShown: false }}
        /> */}
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({});

export default MainLayout;
