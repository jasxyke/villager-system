import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FormScreen from "../../components/forms/FormScreen";
import { formStyles } from "../../styles/formStyles";
import { colors } from "../../styles/colors";
import { Link } from "expo-router";
import PasswordInput from "../../components/forms/PasswordInput";
import { useAuthContext } from "../../context/AuthContext";
import ErrorMessage from "../../components/forms/ErrorMessage";

const SignUp = () => {
  const { register, loading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleSuccess = (msg) => {};
  const handleError = (msg) => {
    setErrorMsg(msg);
  };
  const signUpUser = () => {
    register(
      lastName,
      firstName,
      middleName,
      email,
      password,
      passwordConfirm,
      contactNumber,
      handleSuccess,
      handleError
    );
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
      <FormScreen logoStyles={"mt-20"} headerText={"Let's get started!"}>
        <Text className="ml-2 text-white text-base">Last Name</Text>
        <TextInput
          className="mb-2"
          style={formStyles.textInput}
          value={lastName}
          onChangeText={setLastName}
        />
        <Text className="ml-2 text-white text-base">First Name</Text>
        <TextInput
          className="mb-2"
          style={formStyles.textInput}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text className="ml-2 text-white text-base">Middle Name</Text>
        <TextInput
          className="mb-2"
          style={formStyles.textInput}
          value={middleName}
          onChangeText={setMiddleName}
        />
        <Text className="ml-2 text-white text-base">Email</Text>
        <TextInput
          className="mb-2"
          style={formStyles.textInput}
          value={email}
          onChangeText={setEmail}
          inputMode="email"
        />
        <Text className="ml-2 text-white text-base">Password</Text>
        <PasswordInput password={password} onChangePass={setPassword} />
        <Text className="ml-2 mt-2 text-white text-base">Confirm Password</Text>
        <PasswordInput
          password={passwordConfirm}
          onChangePass={setPasswordConfirm}
        />
        <Text className="ml-2 mt-2 text-white text-base">Contact number</Text>
        <TextInput
          className="mb-2"
          style={formStyles.textInput}
          value={contactNumber}
          onChangeText={setContactNumber}
          inputMode="tel"
        />
        <ErrorMessage msg={errorMsg} />
        <TouchableHighlight
          onPress={signUpUser}
          className="rounded-full m-auto px-5 py-3 mt-5"
          style={styles.signUpButton}
          activeOpacity={0.6}
          underlayColor={loading === "" ? colors.greyGreen : "grey"}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={colors.white} />
          ) : (
            <Text className="text-white text-base">Sign up</Text>
          )}
        </TouchableHighlight>
        <Link
          href={"sign-in"}
          className="text-white underline text-center mt-3"
        >
          Have an account? Login
        </Link>
      </FormScreen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    width: "65%",
    backgroundColor: colors.greyGreen,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
export default SignUp;
