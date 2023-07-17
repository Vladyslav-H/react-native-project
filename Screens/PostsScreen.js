import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList } from "react-native-gesture-handler";

import PublicationItem from "../components/ImageViewer/PublicationItem";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { useEffect, useState } from "react";

 

export default function UserPostsScreen() {
  const {
    params: {
      userPhotoUrl,
      login,
      email,
      selectedPhoto,
      namePost,
      locationName,
    },
  } = useRoute();

  return (
    <View style={styles.contaner}>
      <View style={styles.userContaner}>
        <Image style={styles.image} source={{ uri: userPhotoUrl }} />
        <View style={styles.textContaner}>
          <Text style={styles.nameText}>{login} </Text>
          <Text style={styles.emailText}>{email} </Text>
        </View>
      </View>
      {selectedPhoto ? (
        <PublicationItem
          image={selectedPhoto}
          description={namePost}
          location={locationName}
        />
      ) : null}
      {selectedPhoto ? (
        <PublicationItem
          image={selectedPhoto}
          description={namePost}
          location={locationName}
        />
      ) : null}

      {selectedPhoto ? (
        <PublicationItem
          image={selectedPhoto}
          description={namePost}
          location={locationName}
        />
      ) : null}
      {/* <FlatList
            data={PublicationList}
            renderItem={renderItem}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  userContaner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    gap: 8,
  },
  textContaner: {},
  nameText: {
    fontSize: 13,
    fontWeight: 700,
  },
  emailText: {
    fontSize: 11,
  },
});
