import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import { CustomButton, FormField } from "../components";

const Settings = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View className="flex-row items-center mb-10 gap-x-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <Text className="text-2xl text-white font-psemibold">Settings</Text>
        </View>

        <View className="items-center mb-10">
          <View className="w-24 h-24 border border-secondary rounded-xl flex justify-center items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="w-[90%] h-[90%] rounded-xl"
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity className="mt-4">
            <Text className="text-secondary font-psemibold">Change Avatar</Text>
          </TouchableOpacity>
        </View>

        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
          editable={false}
        />

        <CustomButton
          title="Update Profile"
          containerStyles="mt-10"
          handlePress={() => {
            // Placeholder for update functionality
            router.back();
          }}
        />

        <View className="mt-10 border-t border-black-200 pt-10">
          <Text className="text-white font-psemibold text-lg mb-4">Account</Text>
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-black-200">
            <Text className="text-gray-100 font-pmedium">Privacy Policy</Text>
            <Image
              source={icons.rightArrow}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-black-200">
            <Text className="text-gray-100 font-pmedium">Terms of Service</Text>
            <Image
              source={icons.rightArrow}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
