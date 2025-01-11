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

const contactsData = [
  { id: "1", name: "Fire Department", number: "0951-604-7279" },
  { id: "2", name: "Police Department", number: "0998-598-5727 / 0999-195-5988" },
  { id: "3", name: "Ambulance Service", number: "0920 432 7079" },
  { id: "4", name: "Emergency Hotline", number: "911" },
];

const Contacts = ({ visible, onClose }) => {
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
          <Text style={styles.headerTitle}>Contacts & Emergency Hotlines</Text>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Emergency Hotlines Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EMERGENCY HOTLINES</Text>
            {contactsData.map((contact) => (
              <View key={contact.id} style={styles.contactWrapper}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <View style={styles.numberContainer}>
                  <Text style={styles.contactNumber}>{contact.number}</Text>
                </View>
              </View>
            ))}
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
  section: {
    marginTop: 30, // Added space between headerContainer and section
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 20,
  },
  contactWrapper: {
    marginBottom: 15,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
  },
  numberContainer: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contactNumber: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.white,
    textAlign: "center",
    marginTop: 20,
  },
});


export default Contacts;
