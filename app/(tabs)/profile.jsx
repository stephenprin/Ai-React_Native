import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  VideoCard,
  EmptyState,
  InfoBox,
  VideoCardSkeleton,
} from "../../components";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, isLoading } = useAppwrite(() => getUserPosts(user?.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 100}>
            <VideoCard
              title={item.title}
              thumbnail={item.thumbnail}
              video={item.video}
              creator={item.creator.username}
              avatar={item.creator.avatar}
              userId={user?.$id}
              postId={item.$id}
              initialBookmark={item.bookmarks?.includes(user?.$id)}
            />
          </Animatable.View>
        )}
        ListEmptyComponent={() =>
          !isLoading && (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this profile"
            />
          )
        }
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <View className="flex-row w-full justify-end items-center mb-10 gap-x-4">
              <TouchableOpacity onPress={() => router.push("/settings")}>
                <Image
                  source={icons.menu}
                  resizeMode="contain"
                  className="w-6 h-6"
                  tintColor="#CDCDE0"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title={formatNumber(posts.length + 1000)}
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>

            {isLoading && (
              <View className="w-full mt-10">
                <VideoCardSkeleton />
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
