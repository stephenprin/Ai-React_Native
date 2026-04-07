import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import {
  VideoCard,
  EmptyState,
  SearchInput,
  VideoCardSkeleton,
} from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const {
    data: posts,
    reFetch,
    isLoading,
  } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    reFetch();
  }, [query]);

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
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white mt-1">
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} reFetch={reFetch} />
            </View>

            {isLoading && (
              <View>
                <VideoCardSkeleton />
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() =>
          !isLoading && (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search query"
            />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
