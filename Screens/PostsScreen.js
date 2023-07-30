import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import PublicationItem from "../components/PublicationItem/PublicationItem";
import { getPosts } from "../redux/post/postOperations";
import {
  selectUserEmail,
  selectUserId,
  selectUserName,
  selectUserPhoto,
} from "../redux/auth/authSelectors";
import { selectPostList } from "../redux/post/postSelectors";

export default function PostsScreen() {
  const userPhotoUrl = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);

  const postList = useSelector(selectPostList);

  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <PublicationItem
        showsVerticalScrollIndicator={false}
        image={item.imageURL}
        description={item.postName}
        location={item.locationName}
        coordinate={item.coordinate}
        postId={item.postId}
        comments={item.comments}
      />
    );
  };

  useEffect(() => {
    if (!postList.length) dispatch(getPosts());
  }, [postList]);

  return (
    <View style={styles.contaner}>
      <View style={styles.userContaner}>
        {userPhotoUrl ? (
          <Image style={styles.image} source={{ uri: userPhotoUrl }} />
        ) : (
          <View style={{ backgroundColor: "#000000", borderRadius: 8 }}>
            <Feather name="user" size={60} color="#ffffff" />
          </View>
        )}
        <View style={styles.textContaner}>
          <Text style={styles.nameText}>{userName} </Text>
          <Text style={styles.emailText}>{userEmail} </Text>
        </View>
      </View>

      <FlatList
        data={postList}
        renderItem={renderItem}
        keyExtractor={(item) => item.postId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
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
