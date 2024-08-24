import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";

const reservationsData = {
  "Multi-Purpose Hall": {
    "2024-08-25": ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"],
    "2024-08-26": ["9:00 AM - 10:00 AM", "1:00 PM - 2:00 PM"],
  },
  "Basketball Court": {
    "2024-08-25": ["11:00 AM - 12:00 PM", "3:00 PM - 4:00 PM"],
    "2024-08-26": ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"],
  },
};

const Booking = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeToReserve, setTimeToReserve] = useState("");
  const [reservations, setReservations] = useState(reservationsData);

  const amenities = ["Multi-Purpose Hall", "Basketball Court"];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh by waiting for 1 second
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAmenitySelection = (amenity) => {
    setSelectedAmenity(amenity);
    setReservedTimes([]);
    setSelectedDate(null);
  };

  const handleDateSelection = (day) => {
    setSelectedDate(day.dateString);
    const times = reservations[selectedAmenity]?.[day.dateString] || [];
    setReservedTimes(times);
  };

  const handleReserveTime = () => {
    if (selectedAmenity && selectedDate && timeToReserve) {
      setReservations((prev) => ({
        ...prev,
        [selectedAmenity]: {
          ...prev[selectedAmenity],
          [selectedDate]: [
            ...(prev[selectedAmenity]?.[selectedDate] || []),
            timeToReserve,
          ],
        },
      }));
      setTimeToReserve("");
      handleDateSelection({ dateString: selectedDate }); // Refresh reserved times
    }
  };

  const markedDates = Object.keys(reservations[selectedAmenity] || {}).reduce(
    (acc, date) => {
      acc[date] = { marked: true, dotColor: "white" };
      return acc;
    },
    {}
  );

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: colors.secondary,
      dotColor: colors.primary,
    };
  }

  return (
    <ScrollView
      // style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.contentContainer}
    >
      <TabsGradient />
      <AppHeader />
      <View className="flex flex-1 items-center">
        <View className="w-[90%]">
          <Calendar
            onDayPress={handleDateSelection}
            markedDates={markedDates}
            className="rounded-md"
            theme={{
              backgroundColor: colors.green,
              calendarBackground: colors.green,
              textSectionTitleColor: colors.white,
              selectedDayBackgroundColor: colors.white,
              selectedDayTextColor: colors.white,
              todayTextColor: colors.secondary,
              dayTextColor: colors.white,
              textDisabledColor: "grey",
              dotColor: "white",
              selectedDotColor: colors.white,
              arrowColor: colors.white,
              disabledArrowColor: "grey",
              monthTextColor: colors.white,
              indicatorColor: colors.secondary,
            }}
          />

          <View style={styles.amenitiesContainer}>
            {amenities.map((amenity) => (
              <TouchableOpacity
                key={amenity}
                style={[
                  styles.amenityButton,
                  selectedAmenity === amenity && styles.selectedAmenity,
                ]}
                onPress={() => handleAmenitySelection(amenity)}
              >
                <Text style={styles.amenityText}>{amenity}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedAmenity && selectedDate && (
            <>
              <Text style={styles.selectedDateText}>
                Reserved Times for {selectedDate}:
              </Text>
              {reservedTimes.length > 0 ? (
                <FlatList
                  data={reservedTimes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Text style={styles.timeSlot}>{item}</Text>
                  )}
                />
              ) : (
                <Text>No reservations for this day.</Text>
              )}

              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Reserve a Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter time (e.g., 3:00 PM - 4:00 PM)"
                  value={timeToReserve}
                  onChangeText={setTimeToReserve}
                />
                <Button title="Reserve" onPress={handleReserveTime} />
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  amenitiesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 20,
  },
  amenityButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedAmenity: {
    backgroundColor: "lightblue",
  },
  amenityText: {
    fontSize: 18,
  },
  selectedDateText: {
    fontSize: 18,
    marginVertical: 10,
  },
  timeSlot: {
    padding: 10,
    borderBottomWidth: 1,
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Booking;
