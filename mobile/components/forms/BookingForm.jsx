import React, { useEffect, useState } from "react";
import {
  ScrollView,
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
  const [numberOfResidents, setNumberOfResidents] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");

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

  const clearForm = () => {
    setFullName("");
    setEmail("");
    setContactNumber("");
    setIsGuest(false);
    setNumberOfResidents("");
    setNumberOfGuests("");
    setBookingStatus("for_approval");
  };

  const handleFormSubmit = async () => {
    const selectedAmenityDetails = amenities.find(
      (amenity) => amenity.id === selectedAmenity
    );

    // Skip validation for numberOfGuests and numberOfResidents if amenity.is_per_group is true
    if (
      !selectedAmenityDetails?.is_per_group &&
      (numberOfGuests === "" || numberOfResidents === "")
    ) {
      alert("Please add the number of residents and outsiders");
      return;
    }

    if (isGuest) {
      if (fullName === "" || contactNumber === "" || email === "") {
        alert("Please fill in your contact details.");
        return;
      }
    }
    const bookingDetails = {
      amenity_id: selectedAmenity,
      resident_id: user.resident.id,
      booking_date: selectedDate,
      start_time: formatTimeTwentyFour(startTime),
      end_time: formatTimeTwentyFour(endTime),
      is_guest: isGuest,
      num_of_resident: numberOfResidents,
      num_of_guest: numberOfGuests,
      full_name: fullName,
      email,
      contact_number: contactNumber,
      booking_status: bookingStatus,
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
    <ScrollView contentContainerStyle={styles.container}>
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
      {!amenities.find((amenity) => amenity.id === selectedAmenity)
        ?.is_per_group ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Number of Residents"
            value={numberOfResidents.toString()}
            onChangeText={setNumberOfResidents}
            placeholderTextColor="grey"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Outsiders"
            value={numberOfGuests.toString()}
            onChangeText={setNumberOfGuests}
            placeholderTextColor="grey"
            keyboardType="numeric"
          />
        </>
      ) : (
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isGuest}
            onValueChange={setIsGuest}
            color={isGuest ? colors.secondary : colors.white} // Checkbox color when checked
          />
          <Text style={styles.checkboxLabel}>Guest</Text>
        </View>
      )}

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    backgroundColor: colors.green,
    width: "90%",
    height: "100%",
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
