import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, FEED_PHOTO } from "../fragments";

const FEED_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      ...FeedPhoto
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${FEED_PHOTO}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="white" size={20} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={coffee => "" + coffee.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
