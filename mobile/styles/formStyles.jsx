import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const formStyles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  verticalMargin: {
    marginVertical: 5,
  },
  textInputLight: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.white,
    color: colors.black,
  },
  button: {
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },

  buttonSecondary: {
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
    backgroundColor: colors.secondary,
  },

  buttonLight: {
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
    backgroundColor: colors.secondary,
    marginVertical: 10,
  },

  buttonGrey: {
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
    backgroundColor: colors.ashGray,
    marginVertical: 10,
  },
  buttonTextLight: {
    color: "black",
    fontSize: 14,
  },

  closeButton: {
    backgroundColor: colors.greyGreen,
  },
});
