import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <View className="flex justify-center items-center h-full">
        <TabsGradient />
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }
  return (
    <View className="flex-1 h-full">
      <TabsGradient />
      <AppHeader />
      <View className="w-full h-full items-center">
        <View className="items-center flex w-[85%]">
          <Text className="text-white text-2xl w-full">
            Hello, {user.firstname}!
          </Text>
          <View className="flex-row justify-between w-full mt-5">
            <View className="rounded-xl bg-primary w-[45%] h-[200px]"></View>
            <View className="rounded-xl bg-primary w-[45%] h-[200px]"></View>
          </View>
          <View className="mt-5 rounded-xl h-[250px] w-[100%] bg-primary"></View>
        </View>
      </View>
    </View>
  );
};

export default Home;
