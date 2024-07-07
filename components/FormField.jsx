import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-200 font-pmedium">{title}</Text>

      <View className="border-[1px] border-black-200 rounded-2xl w-full h-14 px-4 bg-black-100 focus:border-secondary items-center flex-row">
        <TextInput
          placeholderTextColor="#7b7b8b"
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          value={value}
          className="flex-1 text-white font-psemibold text-base"
              />
              {title === 'Password' && (
                  <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
                      <Image source={!showPassword ? icons.eye: icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
                  </TouchableOpacity>
              )}
      </View>
    </View>
  );
};

export default FormField;
