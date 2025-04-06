import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { useLocalSearchParams } from "expo-router";
import axiosClient from "../../../utils/axios";
import LoadingScreen from "../../../components/common/LoadingScreen";

const Announcement = () => {
  const { announcementId } = useLocalSearchParams();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    console.log(announcementId);

    if (announcementId) {
      axiosClient
        .get("/announcements/" + announcementId)
        .then((res) => {
          setAnnouncement(res.data.announcement);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [announcementId]);

  if (!announcement) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.mainContainer}>
      <TabsGradient />
      <View style={styles.container}>
        <Text style={styles.title}>{announcement.title}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
          className="mb-3"
        />
        {announcement.picture_url && (
          <Image
            source={{ uri: announcement.picture_url }}
            style={styles.image}
          />
        )}
        <Text style={styles.content}>{announcement.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  content: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default Announcement;
