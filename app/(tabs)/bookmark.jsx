import { useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getUserBookmarks } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { VideoCard, EmptyState, SearchInput } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, reFetch } = useAppwrite(() =>
    getUserBookmarks(user?.$id)
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await reFetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            userId={user?.$id}
            postId={item.$id}
            initialBookmark={true}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-2xl text-white font-psemibold">
              Saved Videos
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput placeholder="Search your saved videos" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="You haven't bookmarked any videos yet"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
