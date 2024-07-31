import { View, Text, Image } from "react-native";
import MainBackgroundGradient from "../gradients/MainBackgroundGradient";
import AppLogo from "../common/AppLogo";
import { LOGO } from "../../constants/icons";

const FormScreen = ({ children }) => {
  return (
    // <View className="items-center justify-center h-full bg-greyGreen">
    //   <View className="rounded-xl bg-white py-10 px-7 w-[85%] flex ">
    //     <Text className="text-2xl font-bold mb-5">{headerText}</Text>
    //     {children}
    //   </View>
    // </View>
    <View className="items-center justify-center h-full">
      <MainBackgroundGradient />
      <AppLogo />
      <View className=" py-10 px-7 w-[75%] flex">{children}</View>
    </View>
  );
};

export default FormScreen;
