import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

const Skeleton = ({ containerStyles }) => {
  return (
    <Animatable.View
      animation={{
        from: { opacity: 0.3 },
        to: { opacity: 1 },
      }}
      duration={1000}
      iterationCount="infinite"
      direction="alternate"
      className={`bg-black-200 rounded-2xl ${containerStyles}`}
    />
  );
};

export const VideoCardSkeleton = () => (
  <View className="px-4 mb-14 bg-black-200/50 p-4 rounded-2xl">
    <View className="flex-row items-start mb-3">
      <Skeleton containerStyles="w-[45px] h-[45px] rounded-xl" />
      <View className="flex-1 ml-3 gap-y-2">
        <Skeleton containerStyles="w-3/4 h-4" />
        <Skeleton containerStyles="w-1/2 h-3" />
      </View>
    </View>
    <Skeleton containerStyles="w-full h-60 rounded-3xl" />
  </View>
);

export default Skeleton;
