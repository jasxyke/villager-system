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
  { id: "1", name: "Fire Department", number: "101" },
  { id: "2", name: "Police Department", number: "100" },
  { id: "3", name: "Ambulance Service", number: "102" },
  { id: "4", name: "Emergency Hotline", number: "112" },
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
              <View key={contact.id} style={styles.contactItem}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contactName: {
    fontSize: 14,
    color: colors.black,
  },
  contactNumber: {
    fontSize: 14,
    color: colors.black,
  },
  footerText: {
    fontSize: 12,
    color: colors.black,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Contacts;
