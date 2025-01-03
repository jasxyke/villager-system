import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useBookings from "../../hooks/bookings/useBookings";
import { colors } from "../../styles/colors";
import {
  formatTimeTwentyFour,
  formatTo12Hour,
  formatUserName,
} from "../../utils/DataFormatter";
import { useAmenities } from "../../context/AmenitiesContext";
import Checkbox from "expo-checkbox";
import { useAuthContext } from "../../context/AuthContext";

const BookingForm = ({
  selectedAmenity,
  selectedDate,
  startTime,
  endTime,
  onBack,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [bookingStatus, setBookingStatus] = useState("for_approval");
  const [isGuest, setIsGuest] = useState(false);

  const { user } = useAuthContext();
  const { submitBooking, loading, error, success } = useBookings();
  const { amenities } = useAmenities();

  useEffect(() => {
    if (user) {
      if (!isGuest) {
        setFullName(formatUserName(user));
        setEmail(user.email);
        setContactNumber(user.contact_number);
      } else {
        setFullName("");
        setEmail("");
        setContactNumber("");
      }
    }
  }, [user, isGuest]);

  const handleFormSubmit = async () => {
    const bookingDetails = {
      amenity_id: selectedAmenity,
      resident_id: user.resident.id,
      booking_date: selectedDate,
      start_time: formatTimeTwentyFour(startTime),
      end_time: formatTimeTwentyFour(endTime),
      is_guest: isGuest,
      full_name: fullName,
      email,
      contact_number: contactNumber,
      booking_status: bookingStatus,
    };

    const clearForm = () => {
      setFullName("");
      setEmail("");
      setContactNumber("");
      setIsGuest(false);
      setBookingStatus("for_approval");
    };

    const booking = await submitBooking(bookingDetails);

    if (booking) {
      console.log(booking);
      alert(booking);
      clearForm();
      onBack();
    }
    if (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Reservation</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Amenity</Text>
        <Text style={styles.value}>
          {amenities.map(
            (amenity) => amenity.id === selectedAmenity && amenity.name
          )}
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{selectedDate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Start Time</Text>
        <Text style={styles.value}>
          {formatTo12Hour(formatTimeTwentyFour(startTime))}
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>End Time</Text>
        <Text style={styles.value}>
          {formatTo12Hour(formatTimeTwentyFour(endTime))}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="grey"
        editable={isGuest}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="grey"
        editable={isGuest}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        placeholderTextColor="grey"
        keyboardType="phone-pad"
        editable={isGuest}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isGuest}
          onValueChange={setIsGuest}
          color={isGuest ? colors.secondary : colors.white} // Checkbox color when checked
        />
        <Text style={styles.checkboxLabel}>Guest</Text>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleFormSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? "Submitting..." : "Submit Reservation"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>{success}</Text>}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.green,
    width: "90%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.white,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: colors.white,
  },
  value: {
    fontSize: 18,
    color: colors.white,
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.greyGreen,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: colors.white,
    backgroundColor: colors.greyGreen,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 8,
  },
});

export default BookingForm;
