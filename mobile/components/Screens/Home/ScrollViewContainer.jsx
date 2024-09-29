import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Animated,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { colors } from "../../../styles/colors";

const width = 320;

const ScrollViewContainer = ({ data = [], loading = false }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: index * width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [index]);

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
    setSelectedItem(item);
    setModalVisible(true);
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
        <Animated.View style={[styles.view, { opacity }]}>
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

  const Indicator = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <View style={styles.indicatorContainer}>
        {data.map((_, i) => {
          const scale = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
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
      />

      <Indicator />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedItem && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>
              {selectedItem.picture_url ? (
                <Image
                  resizeMode="contain"
                  source={{ uri: selectedItem.picture_url }}
                  style={styles.modalImage}
                />
              ) : null}
              <Text style={styles.modalText}>{selectedItem.content}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ScrollViewContainer;
