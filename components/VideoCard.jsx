import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[45px] h-[45px] rounded-xl border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 text-xs font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
          {play ? <Text>Playing....</Text> : <TouchableOpacity activeOpacity={0.8} onPress={() => setPlay(true)} className="mt-3 relative justify-center items-center w-full h-60 rounded-xl">
              <Image source={{ uri: thumbnail }} className="w-full h-full rounded-3xl" resizeMode="cover" />
              <Image source={icons.play} className="w-16 h-16 absolute"  resizeMode="contain"/>
          </TouchableOpacity>}
    </View>
  );
};
export default VideoCard;
