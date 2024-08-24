import React, { useEffect, useState } from "react";
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
import useBookings from "../../hooks/bookings/useBookings";
import { formatTime } from "../../utils/DataFormatter";
import DateTimePicker from "@react-native-community/datetimepicker";

const Booking = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeToReserve, setTimeToReserve] = useState("");
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  //const [markedDates, setMarketDates] = useState(null);

  const amenities = [
    { id: 1, name: "Basketball Court" },
    { id: 2, name: "Multi-Purpose Hall" },
  ];

  const { fetchBookings, bookings, loading } = useBookings();

  useEffect(() => {
    if (selectedAmenity) {
      fetchBookings(selectedYear, selectedMonth, selectedAmenity);
    }
  }, [selectedAmenity, selectedMonth]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh by waiting for 1 second
    fetchBookings(selectedYear, selectedMonth, selectedAmenity);
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

    const times = bookings
      .filter((booking) => booking.booking_date === day.dateString)
      .map((booking) => {
        const formattedStartTime = formatTime(booking.start_time);
        const formattedEndTime = formatTime(booking.end_time);
        return `${formattedStartTime} - ${formattedEndTime}`;
      });

    setReservedTimes(times);
  };

  const markedDates = bookings.reduce((acc, booking) => {
    const date = booking.booking_date;
    if (!acc[date]) {
      acc[date] = { marked: true, dotColor: "white" };
    }
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: colors.secondary,
      dotColor: colors.white,
    };
  }

  const handleStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowStartTimePicker(Platform.OS === "ios");
    setStartTime(currentDate);
  };

  const handleEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setShowEndTimePicker(Platform.OS === "ios");
    setEndTime(currentDate);
  };

  const checkForConflicts = () => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      alert("End time must be after start time");
      return false;
    }

    for (const booking of bookings) {
      const bookingStart = new Date(booking.start_time);
      const bookingEnd = new Date(booking.end_time);

      if (start < bookingEnd && end > bookingStart) {
        alert("Time conflict with an existing booking");
        return false;
      }
    }

    return true;
  };

  const handleReservation = () => {
    if (checkForConflicts()) {
      // Proceed with reservation
      console.log("Reservation confirmed");
    }
  };

  return (
    <View className="flex flex-1 w-full h-full">
      <TabsGradient />
      <AppHeader />
      <ScrollView
        // style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.contentContainer}
      >
        <View className="w-[90%]">
          <View className="">
            <Calendar
              onMonthChange={(date) => {
                console.log("month: " + date.month);
                console.log("year:" + date.year);

                setSelectedMonth(date);
                setSelectedYear(date.year);
              }}
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
                  key={amenity.id}
                  style={[
                    styles.amenityButton,
                    selectedAmenity === amenity.id && styles.selectedAmenity,
                  ]}
                  onPress={() => handleAmenitySelection(amenity.id)}
                >
                  <Text className="font-pRegular" style={styles.amenityText}>
                    {amenity.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedAmenity && selectedDate && (
              <View>
                <View className="p-4 bg-green rounded-md">
                  <Text
                    className="text-white font-pRegular"
                    style={styles.selectedDateText}
                  >
                    {new Date(selectedDate).toDateString()}:
                  </Text>
                  <View className>
                    {reservedTimes.length > 0 ? (
                      reservedTimes.map((item, index) => (
                        <Text key={index} style={styles.timeSlot}>
                          {item}
                        </Text>
                      ))
                    ) : (
                      <Text className="font-pRegular text-md text-white">
                        No reservations for this day.
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>
                    Reserve a Time for {new Date(selectedDate).toDateString()}
                  </Text>
                  <View className="flex flex-row justify-between">
                    <View className="w-[45%]">
                      <Button
                        title="Select Start Time"
                        onPress={() => setShowStartTimePicker(true)}
                      />
                      <Text>Start Time: {startTime.toLocaleTimeString()}</Text>
                      {showStartTimePicker && (
                        <DateTimePicker
                          value={startTime}
                          mode="time"
                          is24Hour={true}
                          display="default"
                          onChange={handleStartTimeChange}
                        />
                      )}
                    </View>
                    <View className="w-[45%]">
                      <Button
                        title="Select End Time"
                        onPress={() => setShowEndTimePicker(true)}
                      />
                      <Text>End Time: {endTime.toLocaleTimeString()}</Text>
                      {showEndTimePicker && (
                        <DateTimePicker
                          value={endTime}
                          mode="time"
                          is24Hour={true}
                          display="default"
                          onChange={handleEndTimeChange}
                        />
                      )}
                    </View>
                  </View>
                  <Button title="Book Now" onPress={handleReservation} />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    alignItems: "center",
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
    borderRadius: 10,
    backgroundColor: colors.green,
  },
  selectedAmenity: {
    backgroundColor: colors.greyGreen,
    color: "white",
  },
  amenityText: {
    fontSize: 18,
    color: "white",
  },
  selectedDateText: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  timeSlot: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "white",
    color: "white",
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.white,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    paddingVertical: 4,
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
