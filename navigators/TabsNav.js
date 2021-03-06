import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./SharedStackNav";
import { Image, View } from "react-native";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  const { data } = useMe();
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: false,
        style: {
          borderTopColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
          elevation: 0,
          shadowOpacity: 0,
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
          elevation: 0,
          shadowOpacity: 0,
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: e => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName={"camera"}
              color={color}
              focused={focused}
              name={true}
            />
          ),
          elevation: 0,
          shadowOpacity: 0,
        }}
      >
        {/* {() => <StackNavFactory screenName="Upload" />} */}
      </Tabs.Screen>
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
          elevation: 0,
          shadowOpacity: 0,
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  ...(focused && { borderColor: "white", borderWidth: 2 }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} color={color} focused={focused} />
            ),
          elevation: 0,
          shadowOpacity: 0,
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
