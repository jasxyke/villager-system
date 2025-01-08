import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useHouseHold from "../../hooks/houses/useHousehold";
import { useAuthContext } from "../../context/AuthContext";
import { formatName, formatUserName } from "../../utils/DataFormatter";
import { router } from "expo-router";

const Household = () => {
  // Pass a default houseId or from props
  const { residents, loading, error, fetchHouseMembers } = useHouseHold();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      fetchHouseMembers(user.resident.house_id); // Fetch house members when the component mounts
    }
  }, []);

  const renderItem = ({ item }) => (
    <MemberItem
      id={item.id}
      name={`${formatUserName(item.user, false)}`}
      role={formatName(item.user.role_type)}
    />
  );

  return (
    <View style={styles.container}>
      <TabsGradient />
      <AppHeader />
      <View style={styles.mainContainer}>
        <Text style={styles.greeting} className="font-pJaldiBold">
          HouseHold Members
        </Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.white}
            style={styles.loadingIndicator}
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={residents}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

const MemberItem = ({ name, role, id }) => {
  const { user } = useAuthContext();
  const handleManage = () => {
    if (user.id === id) {
      router.navigate("profile");
    } else {
      router.push({
        pathname: "../household/house-member",
        params: { userId: id },
      });
    }
  };
  return (
    <View style={styles.listItem}>
      <View style={styles.memberDetails}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemRole}>{role}</Text>
      </View>
      <Pressable style={styles.itemButton} onPress={handleManage}>
        <Text className="font-pRegular text-white">Manage</Text>
        <MaterialIcons name="manage-accounts" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  mainContainer: {
    padding: 20,
  },
  greeting: {
    color: "white",
    fontSize: 24,
  },
  listContainer: {
    marginTop: 10,
    paddingBottom: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  memberDetails: {
    width: "70%",
  },
  itemButton: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  itemName: {
    color: colors.white,
    fontFamily: "Itim-Regular",
    fontSize: 18,
  },
  itemRole: {
    color: colors.ashGray,
    fontFamily: "Itim-Regular",
  },
});

export default Household;
