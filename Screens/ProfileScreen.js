import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import BgImage from "../assets/bg-img.jpg";
import {
  selectUserEmail,
  selectUserPhoto,
  selectUserName,
  selectUserId,
} from "../redux/auth/authSelectors";

import { logoutUser } from "../redux/auth/authOperations";

import { ImageViewer } from "../components/ImageViewer/ImageViewer";
import PublicationItem from "../components/PublicationItem/PublicationItem";
import { selectPostList } from "../redux/post/postSelectors";
import { useEffect } from "react";

export default function ProfileScreen() {
  const userId = useSelector(selectUserId);
  const userPhotoUrl = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);
  const postList = useSelector(selectPostList);

  const dispatch = useDispatch();
  useEffect(() => {
    const postListCurrentUser = postList.filter((el) => el.userId === userId);
  });

  const renderItem = ({ item }) => (
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

  return (
    <ImageBackground
      source={BgImage}
      style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View
          style={[
            postListCurrentUser.length
              ? { ...styles.box, height: "75%" }
              : { ...styles.box, height: "40%" },
          ]}
        >
          <ImageViewer userPhoto={userPhotoUrl} />
          <Pressable
            style={styles.buttonLogOut}
            onPress={() => dispatch(logoutUser())}
          >
            <Feather name="log-out" size={24} color="#bdbdbd" />
          </Pressable>
          <Text style={styles.nameText}>{userName}</Text>
          {postListCurrentUser.length ? (
            <FlatList
              data={postListCurrentUser}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item) => item.postId}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}>У Вас ще немає публікацій</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  box: {
    paddingHorizontal: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  imgContainer: {
    position: "absolute",
    top: -60,
    left: 150,
    borderRadius: 16,
  },
  closeBtn: {
    position: "absolute",
    right: -18,
    bottom: 10,
  },
  buttonLogOut: {
    position: "absolute",
    right: 16,
    top: 22,
    marginRight: 16,
  },
  nameText: {
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
  },
});
