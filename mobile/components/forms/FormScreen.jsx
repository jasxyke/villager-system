import { View, Text } from "react-native";

const FormScreen = ({ children, headerText }) => {
  return (
    <View className="items-center justify-center h-full bg-greyGreen">
      <View className="rounded-xl bg-white py-10 px-7 w-[85%] flex ">
        <Text className="text-2xl font-bold mb-5">{headerText}</Text>
        {children}
      </View>
    </View>
  );
};

export default FormScreen;
