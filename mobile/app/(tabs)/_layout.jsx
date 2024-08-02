import { View, Text, Image, StyleSheet } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { HOME, BOOKING, PROFILE, BILLS, MARKET } from "../../constants/icons";
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
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.white,
          tabBarStyle: { backgroundColor: colors.greyGreen },
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
          name="market"
          options={{
            title: "Market",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={MARKET}
                color={color}
                focused={focused}
                name={"Market"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            title: "Booking",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                icon={BOOKING}
                color={color}
                focused={focused}
                name={"Booking"}
              />
            ),
          }}
        />
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
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({});

export default MainLayout;
