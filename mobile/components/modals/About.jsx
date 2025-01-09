import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import TabsGradient from "../gradients/TabsGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../styles/colors";

const callUsData = ["1 (234) 567-891", "1 (234) 987-654"];
const locationData = "Block 6, Lot 99, Pamahay Village, San Jose, Rodriguez, Rizal";

const About = ({ visible, onClose }) => {
  return (
    <Modal animationType="slide" visible={visible} transparent={false}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.container}>
        <TabsGradient />

        {/* Back Button and Title */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Description */}
          <Text style={styles.description}>
          "Effortless community management at your fingertips."
          </Text>

          <Text style={styles.paragraph}>
          Pamahay Village Management System simplifies billing, 
          permits, and bookings for residential communities. 
          With a user-friendly interface and powerful features,
           it streamlines daily operations for administrators 
           while providing residents with convenient access
            to essential services.
          </Text>

          {/* Call Us Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CALL US</Text>
            {callUsData.map((number, index) => (
              <Text key={index} style={styles.sectionText}>
                {number}
              </Text>
            ))}
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LOCATION</Text>
            <Text style={styles.sectionText}>{locationData}</Text>
          </View>

          {/* Our Top Services Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>OUR TOP SERVICES</Text>
            <Text style={styles.sectionText}>• Clearance Request</Text>
            <Text style={styles.sectionText}>• Get a Car Sticker</Text>
            <Text style={styles.sectionText}>• Ammenities Booking</Text>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} All rights reserved.
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  contentContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 12,
    color: colors.black,
    textAlign: "center",
    marginTop: 20,
  },
});

export default About;
