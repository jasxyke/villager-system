import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const formStyles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.white,
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

  closeButton: {
    backgroundColor: colors.greyGreen,
  },
});
