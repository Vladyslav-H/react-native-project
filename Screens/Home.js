import { View, Text, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import NewIcon from "../assets/icons/new-icon.svg";
import LogOutIcon from "../assets/icons/log-out-icon.svg";
import { useRoute } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export default function Home({ navigation }) {
  const { params } = useRoute();

  return (
    <Tabs.Navigator
      initialRouteName="Публікації"
      screenOptions={{
        headerTitleAlign: "center",

        headerStyle: {
          backgroundColor: "#ffffff",
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#bdbdbbd",
        },
        tabBarStyle: {
          paddingTop: 9,
          paddingBottom: 34,
          backgroundColor: "#ffffff",
          height: 83,
          borderTopWidth: 1,
          borderTopColor: "#bdbdbd",
        },
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        initialParams={params}
        options={{
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
          },
          tabBarShowLabel: false,
          headerRight: () => (
            <Pressable
              style={{ marginRight: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="log-out" size={24} color="#bdbdbd" />
            </Pressable>
          ),
          tabBarIcon: ({}) => <Feather name="grid" size={24} color="#212121" />,
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },

          headerLeft: () => (
            <Pressable
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("Публікації")}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </Pressable>
          ),
          tabBarIcon: ({}) => <NewIcon />,
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({}) => <Feather name="user" size={24} color="#212121" />,
        }}
      />

      <Tabs.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarItemStyle: {
            display: "none",
          },
          headerLeft: () => (
            <Pressable
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("Публікації")}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="Мапа"
        component={MapScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarItemStyle: {
            display: "none",
          },
          headerLeft: () => (
            <Pressable
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("Публікації")}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </Pressable>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
