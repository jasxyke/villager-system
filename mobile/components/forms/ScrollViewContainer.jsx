import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { colors } from "../../styles/colors";

const ScrollViewContainer = ({ data, loading }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isManualScroll, setIsManualScroll] = useState(false);

  useEffect(() => {
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
  }, [isManualScroll]);

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: index * Dimensions.get("window").width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / Dimensions.get("window").width);
    setIndex(newIndex);
  };

  const handleScrollBeginDrag = () => {
    setIsManualScroll(true);
  };

  const handleScrollEndDrag = () => {
    setIsManualScroll(false);
  };

  const renderItem = ({ item, index: itemIndex }) => {
    const opacity = scrollX.interpolate({
      inputRange: [
        (itemIndex - 1) * Dimensions.get("window").width,
        itemIndex * Dimensions.get("window").width,
        (itemIndex + 1) * Dimensions.get("window").width,
      ],
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={[styles.view, { opacity }]}>
        <Text numberOfLines={1} style={styles.titleText}>
          {item.title}
        </Text>
        {item.picture_url === null ? null : (
          <Image
            resizeMode="contain"
            source={{ uri: item.picture_url }}
            style={styles.image}
          />
        )}
        <Text numberOfLines={3} style={styles.text}>
          {item.content}
        </Text>
      </Animated.View>
    );
  };

  const Indicator = () => (
    <View style={styles.indicatorContainer}>
      {data.map((_, i) => {
        const scale = scrollX.interpolate({
          inputRange: [
            (i - 1) * Dimensions.get("window").width,
            i * Dimensions.get("window").width,
            (i + 1) * Dimensions.get("window").width,
          ],
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange: [
            (i - 1) * Dimensions.get("window").width,
            i * Dimensions.get("window").width,
            (i + 1) * Dimensions.get("window").width,
          ],
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i}
            style={[styles.dot, { transform: [{ scale }], opacity }]}
          />
        );
      })}
    </View>
  );

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
        snapToStart={true}
        snapToInterval={320}
        decelerationRate={0.9}
      />
      <Indicator />
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
    //width: Dimensions.get("window").width,
    width: 320,
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
