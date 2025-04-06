import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import TabsGradient from "../../../components/gradients/TabsGradient";
import useAnnouncement from "../../../hooks/announcements/useAnnouncement";
import LoadingScreen from "../../../components/common/LoadingScreen";
import { colors } from "../../../styles/colors";
import { router } from "expo-router";

const AllAnnouncements = () => {
  const { announcements, loading, getAnnouncements, currentPage, totalPages } =
    useAnnouncement();

  useEffect(() => {
    getAnnouncements(1);
  }, []);

  const handleItemPress = (item) => {
    router.push({
      pathname: "./announcement",
      params: { announcementId: item.id },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      {item.picture_url && (
        <Image
          source={{ uri: item.picture_url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text numberOfLines={2} style={styles.content}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    getAnnouncements(1);
  };

  if (loading && !announcements.length) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.mainContainer}>
      <TabsGradient />
      <View style={styles.container}>
        {/* <Text style={styles.header}>All Announcements</Text> */}
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background || "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.primary || "#000",
  },
  card: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
});

export default AllAnnouncements;
