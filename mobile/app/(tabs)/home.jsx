import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppHeader from "../../components/common/AppHeader";
import ScrollViewContainer from "../../components/forms/ScrollViewContainer";
import TabsGradient from "../../components/gradients/TabsGradient";
import { useAuthContext } from "../../context/AuthContext";
import LoadingEmptyAnnouncements from "../../components/Screens/Home/LoadingEmptyAnnouncements";
import useAnnouncement from "../../hooks/announcements/useAnnouncement";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuthContext();
  const { announcements, loading, getAnnouncements } = useAnnouncement();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAnnouncements();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.greeting}>Hello, {user.firstname}!</Text>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardContent}>Bills</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardContent}>Bookings</Text>
          </View>
        </View>
        {announcements === null || loading ? (
          <LoadingEmptyAnnouncements
            loading={loading}
            announcements={announcements}
          />
        ) : announcements.length === 0 ? (
          <LoadingEmptyAnnouncements
            loading={loading}
            announcements={announcements}
          />
        ) : (
          <ScrollViewContainer data={announcements} />
        )}
      </ScrollView>
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
    width: "90%",
    marginBottom: 0,
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
