import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppHeader from "../../components/common/AppHeader";
import ScrollViewContainer from "../../components/Screens/Home/ScrollViewContainer";
import TabsGradient from "../../components/gradients/TabsGradient";
import { useAuthContext } from "../../context/AuthContext";
import LoadingEmptyAnnouncements from "../../components/Screens/Home/LoadingEmptyAnnouncements";
import useAnnouncement from "../../hooks/announcements/useAnnouncement";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useBills from "../../hooks/useBills";
import { usePushNotifications } from "../../hooks/useNotifications";
import { router } from "expo-router";
import { colors } from "../../styles/colors";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuthContext();
  const { announcements, loading, getAnnouncements, totalPages, currentPage } =
    useAnnouncement();
  const { error, refetch, totalBalance } = useBills();
  const { expoPushToken, setupNotifications } = usePushNotifications();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAnnouncements();
    if (user !== null) {
      refetch(user.resident.id);
    } else {
      console.log("user is null");
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (user) {
      refetch(user.resident.id);
      setupNotifications(user.id);
    }
  }, [user]);


  const handleViewAnnouncementPress = () => {
    // Add your navigation logic here
    router.push("../announcement-details"); // Example path
  };

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

        {/* Balance Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <FontAwesome6 name="peso-sign" size={40} color="white" />
            <Text style={styles.txtBalance}>
              {totalBalance || "Error generating the total balance"}
            </Text>
          </View>
          <Text style={styles.cardContentText}>Balance</Text>
        </View>

        {/* Announcements Section */}
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
          <ScrollViewContainer
            data={announcements}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            getAnnouncements={getAnnouncements}
          />
        )}

         {/* View Announcement Link */}
        <Pressable onPress={handleViewAnnouncementPress} style={styles.viewAnnouncementLink}>
                <Text style={styles.viewAnnouncementText}>View Announcement</Text>
                 <FontAwesome6 name="chevron-right" size={18} color="white" />
        </Pressable>
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
    alignItems: "flex-start",
    width: "80%",
  },
  content: {
    width: "100%",
    alignItems: "flex-start",
    paddingLeft: 20, // Optional: Adds padding to the left
  },
  greeting: {
    color: "white",
    fontSize: 24,
    width: "90%",
    marginBottom: 0,
    fontFamily: "Jaldi-Bold",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#1A2902",
    width: "90%", // The card will take full width
    height: 100,
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
    marginBottom: 20, // Space below the card for the link
  },
  cardContent: {
    flexDirection: "row", // Align icon and balance text horizontally
    justifyContent: "center",
    alignItems: "center",
  },
  cardContentText: {
    color: "white",
    fontSize: 16,
  },
  txtBalance: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewAnnouncementLink: {
    flexDirection: "row", // Align text and icon horizontally
    alignItems: "center",
    marginTop: 20, // Space below the link for announcements
  },
  viewAnnouncementText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default Home;
