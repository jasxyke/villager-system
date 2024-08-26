import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import TabsGradient from "../../components/gradients/TabsGradient";
import { colors } from "../../styles/colors";
import AppHeader from "../../components/common/AppHeader";
import useBills from "../../hooks/useBills";
import { useAuthContext } from "../../context/AuthContext";
import LoadingScreen from "../../components/common/LoadingScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Bills = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuthContext();

  const { bills, loading, error, refetch, totalBalance } = useBills();

  useEffect(() => {
    if (user !== undefined) {
      refetch(user.resident.id);
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(user.resident.id);
    setRefreshing(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <TabsGradient />
      <AppHeader />
      <View
        className="h-full"
        // contentContainerStyle={styles.content}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <View className="flex flex-row justify-center w-full gap-x-2">
          <FontAwesome6 name="peso-sign" size={40} color="black" />
          <Text className="" style={styles.txtBalance}>
            {totalBalance || "Error generating the total balance"}
          </Text>
        </View>

        <Text style={styles.txtTitleBalance}>Balance</Text>
        {error && <Text>error</Text>}
        {/* <View style={styles.paymentContainer}>
        <View style={styles.paymentBox}>
          <View style={styles.paymentDetails}>
            <Text style={styles.txtNumber}>0912 345 6789</Text>
            <Text style={styles.txtModePayment}>Gcash</Text>
          </View>
          <TouchableOpacity style={styles.qrButton}>
            <Text style={styles.txtViewQR}>View QR</Text>
          </TouchableOpacity>
        </View>
      </View> */}
        <View className="flex items-center w-full mt-8 mb-5">
          <Text className="border-b-2 border-primary w-[85%] text-3xl text-white font-pJaldiBold">
            Monthly Bills
          </Text>
        </View>
        <View></View>
        <FlatList
          style={{ flex: 1, marginBottom: 110 }}
          className="w-[100%]"
          contentContainerStyle="flex flex-1 h-full"
          data={bills}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.billContainer}>
              <Text style={styles.billTitle}>
                Bill for{" "}
                {new Date(item.due_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </Text>
              <Text style={styles.billAmount}>
                Amount: PHP {parseFloat(item.amount).toFixed(2)}
              </Text>
              <Text style={styles.billDueDate}>
                Due Date: {new Date(item.due_date).toLocaleDateString()}
              </Text>
              <Text style={styles.billStatus}>
                Status:{" "}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
              <Text style={styles.billBalance}>
                Balance: PHP {parseFloat(item.balance).toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },

  billContainer: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    width: "85%",
    marginHorizontal: "auto",
    marginBottom: 15,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  billAmount: {
    fontSize: 14,
    marginVertical: 4,
    color: colors.white,
  },
  billDueDate: {
    fontSize: 14,
    marginVertical: 4,
    color: colors.white,
  },
  billStatus: {
    fontSize: 14,
    marginVertical: 4,
    color: colors.white,
  },
  billBalance: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 4,
    color: colors.white,
  },

  txtBalance: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },

  txtTitleBalance: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  paymentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
  },

  paymentBox: {
    width: 350,
    height: 125,
    backgroundColor: "#344C11",
    borderRadius: 20,
    opacity: 0.8,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentDetails: {
    flex: 1,
  },

  txtNumber: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  txtModePayment: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  qrButton: {
    width: 150,
    height: 60,
    backgroundColor: "#AEC09A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
    padding: 10,
  },

  txtViewQR: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Bills;
