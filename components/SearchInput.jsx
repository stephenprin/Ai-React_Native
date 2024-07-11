import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-[1px] space-x-4 border-black-200 rounded-2xl w-full h-14 px-4 bg-black-100 focus:border-secondary items-center flex-row">
      <TextInput
        placeholderTextColor="#7b7b8b"
        placeholder="Search for a video topic"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        value={value}
        className="flex-1 text-white mt-0.5 font-pregular text-base"
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
