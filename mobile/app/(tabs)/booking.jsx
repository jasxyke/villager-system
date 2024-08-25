import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DatePicker from "react-native-date-picker";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";
import useBookings from "../../hooks/bookings/useBookings";
import { AMENNITIES } from "../../data/DataStructures";
import { formatTime } from "../../utils/DataFormatter";
import BookingForm from "../../components/forms/BookingForm";

const Booking = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { fetchBookings, bookings } = useBookings();

  useEffect(() => {
    if (selectedAmenity) {
      fetchBookings(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        selectedAmenity
      );
    }
  }, [selectedAmenity]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      selectedAmenity
    );
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

  const handleStartTimeConfirm = (time) => {
    setStartTime(time);
    setShowStartTimePicker(false);
  };

  const handleEndTimeConfirm = (time) => {
    setEndTime(time);
    setShowEndTimePicker(false);
  };

  const checkForConflicts = () => {
    const start = new Date(
      `${selectedDate}T${startTime.toLocaleTimeString("en-GB", {
        hour12: false,
      })}`
    );
    const end = new Date(
      `${selectedDate}T${endTime.toLocaleTimeString("en-GB", {
        hour12: false,
      })}`
    );

    if (start >= end) {
      alert("End time must be after start time");
      return false;
    }

    for (const booking of bookings) {
      const bookingStart = new Date(
        `${booking.booking_date}T${booking.start_time}`
      );
      const bookingEnd = new Date(
        `${booking.booking_date}T${booking.end_time}`
      );

      if (start < bookingEnd && end > bookingStart) {
        alert("Time conflict with an existing booking");
        return false;
      }
    }

    return true;
  };

  // Function to reset booking states
  const resetBooking = () => {
    setSelectedAmenity(null);
    setSelectedDate(null);
    setReservedTimes([]);
    // setStartTime(new Date());
    // setEndTime(new Date());
  };

  const handleProceedToForm = () => {
    if (checkForConflicts()) {
      setShowForm(true);
    }
  };

  const handleBackToBooking = () => {
    resetBooking();
    setShowForm(false);
  };

  return (
    <View className="flex flex-1 w-full h-full">
      <TabsGradient />
      <AppHeader />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.contentContainer}
      >
        {!showForm ? (
          <View className="w-[90%]">
            <Calendar
              onDayPress={handleDateSelection}
              markedDates={markedDates}
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
                monthTextColor: colors.white,
                indicatorColor: colors.secondary,
              }}
            />

            <View style={styles.amenitiesContainer}>
              {AMENNITIES.map((amenity) => (
                <TouchableOpacity
                  key={amenity.id}
                  style={[
                    styles.amenityButton,
                    selectedAmenity === amenity.id && styles.selectedAmenity,
                  ]}
                  onPress={() => handleAmenitySelection(amenity.id)}
                >
                  <Text style={styles.amenityText}>{amenity.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedAmenity && selectedDate && (
              <View>
                <View className="p-4 bg-green rounded-md">
                  <Text style={styles.selectedDateText}>
                    {new Date(selectedDate).toDateString()}:
                  </Text>
                  <View>
                    {reservedTimes.length > 0 ? (
                      reservedTimes.map((item, index) => (
                        <Text key={index} style={styles.timeSlot}>
                          {item} - Reserved
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "45%" }}>
                      <Text style={{ color: colors.white }}>
                        Select Start Time:
                      </Text>
                      <TouchableOpacity
                        style={styles.timeButton}
                        onPress={() => setShowStartTimePicker(true)}
                      >
                        <Text style={styles.timeText}>
                          {startTime.toLocaleTimeString()}
                        </Text>
                      </TouchableOpacity>
                      <DatePicker
                        modal
                        open={showStartTimePicker}
                        date={startTime}
                        mode="time"
                        onConfirm={handleStartTimeConfirm}
                        onCancel={() => setShowStartTimePicker(false)}
                        backgroundColor={colors.white}
                      />
                    </View>
                    <View style={{ width: "45%" }}>
                      <Text style={{ color: colors.white }}>
                        Select End Time:
                      </Text>
                      <TouchableOpacity
                        style={styles.timeButton}
                        onPress={() => setShowEndTimePicker(true)}
                      >
                        <Text style={styles.timeText}>
                          {endTime.toLocaleTimeString()}
                        </Text>
                      </TouchableOpacity>
                      <DatePicker
                        modal
                        open={showEndTimePicker}
                        date={endTime}
                        mode="time"
                        onConfirm={handleEndTimeConfirm}
                        onCancel={() => setShowEndTimePicker(false)}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.proceedButton}
                    onPress={handleProceedToForm}
                  >
                    <Text style={styles.proceedButtonText}>
                      Proceed with Reservation
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <BookingForm
            selectedAmenity={selectedAmenity}
            selectedDate={selectedDate}
            startTime={startTime}
            endTime={endTime}
            onBack={handleBackToBooking}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    alignItems: "center",
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
  },
  amenityText: {
    fontSize: 18,
    color: "white",
  },
  selectedDateText: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  timeSlot: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "white",
    color: "white",
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  timeButton: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: "center",
  },
  timeText: {
    fontSize: 18,
    color: colors.primary,
  },
  proceedButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: "center",
  },
  proceedButtonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default Booking;
