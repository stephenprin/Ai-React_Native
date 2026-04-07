import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { bookmarkPost, unBookmarkPost } from "../lib/appwrite";

const VideoCard = ({
  title,
  creator,
  avatar,
  video,
  thumbnail,
  userId,
  postId,
  initialBookmark = false,
}) => {
  const [play, setPlay] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmark);

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await unBookmarkPost(postId, userId);
        setIsBookmarked(false);
      } else {
        await bookmarkPost(postId, userId);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14 bg-black-200/50 p-4 rounded-2xl shadow-md">
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
              {creator}
            </Text>
          </View>
        </View>
        <View className="pt-2 flex-row gap-2">
          <TouchableOpacity onPress={toggleBookmark}>
            <Image
              source={icons.bookmark}
              className="w-5 h-5"
              resizeMode="contain"
              tintColor={isBookmarked ? "#FF9C01" : "#CDCDE0"}
            />
          </TouchableOpacity>
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-3xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setPlay(true)}
          className="mt-3 relative justify-center items-center w-full h-60 rounded-xl"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-3xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-16 h-16 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default VideoCard;
