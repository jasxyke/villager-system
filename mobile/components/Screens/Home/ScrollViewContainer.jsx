import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../styles/colors";
import { router } from "expo-router";

const width = 320;

const ScrollViewContainer = ({
  data = [],
  loading = false,
  currentPage,
  totalPages,
  getAnnouncements,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isManualScroll, setIsManualScroll] = useState(false);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("ScrollViewContainer received invalid data:", data);
      return;
    }

    const interval = setInterval(() => {
      if (!isManualScroll) {
        setIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % data.length;
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }
          return nextIndex;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isManualScroll, data]);

  const loadMoreAnnouncements = () => {
    setTimeout(() => {
      if (currentPage < totalPages && !loading) {
        getAnnouncements(currentPage + 1);
      } else if (currentPage === totalPages && !loading) {
        // reset to first page
        getAnnouncements(1);
      }
    }, 1000);
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setIndex(newIndex);
  };

  const handleScrollBeginDrag = () => {
    setIsManualScroll(true);
  };

  const handleScrollEndDrag = () => {
    setIsManualScroll(false);
  };

  const handleItemPress = (item) => {
    router.push({
      pathname: "../home-tab/announcement",
      params: { announcementId: item.id },
    });
  };

  const renderItem = ({ item, index: itemIndex }) => {
    const opacity = scrollX.interpolate({
      inputRange: [
        (itemIndex - 1) * width,
        itemIndex * width,
        (itemIndex + 1) * width,
      ],
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Animated.View style={[styles.view, { opacity, height: "100%" }]}>
          <Text numberOfLines={1} style={styles.titleText}>
            {item.title}
          </Text>
          {item.picture_url ? (
            <Image
              resizeMode="contain"
              source={{ uri: item.picture_url }}
              style={styles.image}
            />
          ) : null}
          <Text numberOfLines={3} style={styles.text}>
            {item.content}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.scrollContainer}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        snapToInterval={width}
        decelerationRate="fast"
        onEndReached={loadMoreAnnouncements}
        ListFooterComponent={loading && <ActivityIndicator size="small" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: "90%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  view: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: colors.primary,
    padding: 20,
  },
  image: {
    width: "80%",
    height: 150,
    marginBottom: 5,
    borderRadius: 10,
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1A2902",
    marginHorizontal: 5,
  },
});

export default ScrollViewContainer;
