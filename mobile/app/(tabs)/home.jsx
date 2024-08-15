import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { useAuthContext } from "../../context/AuthContext";
import ScrollViewContainer from "../../components/forms/ScrollViewContainer";

import image1 from "../../assets/images/maynilad.jpg";
import image2 from "../../assets/images/hotline.png";

const data = [
  {
    id: "1",
    text: "Water Interruption from 4pm - 10pm at April 27, 2023",
    image: image1,
  },
  {
    id: "2",
    text: "Voting of officers will be held at multi-purpose hall on June 20, 2023",
  },
  {
    id: "3",
    text: "Fur Parents Listen Up! Free vaccination for your pets will be held at a multi-purpose hall on June 30, 2023",
  },
  { id: "4", text: "Emergency Hotline", image: image2 },
];

const Home = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <View style={styles.centered}>
        <TabsGradient />
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabsGradient />
      <AppHeader />
      <View style={styles.content}>
        <Text style={styles.greeting}>Hello, {user.firstname}!</Text>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardContent}>Bills</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardContent}>Bookings</Text>
          </View>
        </View>
        <ScrollViewContainer data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  greeting: {
    color: "white",
    fontSize: 24,
    width: "100%",
    marginBottom: 20,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    padding: 20,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#1A2902",
    width: "45%",
    height: 200,
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  cardContent: {
    color: "white",
    fontSize: 18,
  },
});

export default Home;
