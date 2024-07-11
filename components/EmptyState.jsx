import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, description }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[250px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl mt-2 font-psemibold text-white">{title}</Text>
          <Text className="font-pmedium text-sm text-gray-200">{description}</Text>
          
          <CustomButton
              title="Create video"
              handlePress={() => router.push('/create')}
              containerStyles="w-full my-5"
          />
    </View>
  );
};

export default EmptyState;
