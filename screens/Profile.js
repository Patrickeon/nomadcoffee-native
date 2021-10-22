import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { isLoggedInVar } from "../apollo";
import useMe from "../hooks/useMe";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments";

const PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Profile({ navigation, route }) {
  const { data: me, loading } = useMe();
  const { data, loading, refetch, fetchMore } = useQuery(PROFILE_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const theme = useTheme();

  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: `${route.params.username}`,
      });
    }
  });

  const theme = useTheme();
  return (
    <ScreenLayout loading={loading || shopsLoading}>
      {isLoggedInVar ? (
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Some one Profile</Text>
        </View>
      ) : (
        navigation.navigate("LogIn")
      )}
    </ScreenLayout>
  );
}
