import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { FEED_PHOTO } from "../fragments";

const SEE_COFFEE = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ...FeedPhoto
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${FEED_PHOTO}
`;

export default function PhotoScreen({ route }) {
  const { data, loading, refetch } = useQuery(SEE_COFFEE, {
    variables: {
      id: route?.params?.id,
    },
  });
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seeCoffeeShop} />
      </ScrollView>
    </ScreenLayout>
  );
}
