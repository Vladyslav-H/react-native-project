import "react-native-get-random-values";
import uuid from "react-native-uuid";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { createComment } from "../redux/post/postOperations";
import { selectUserId, selectUserPhoto } from "../redux/auth/authSelectors";
import { createdDate } from "../redux/utils/createdDate";
import { selectPostList } from "../redux/post/postSelectors";

export default function () {
  const {
    params: { imageUrl, postId },
  } = useRoute();

  const [comment, setComment] = useState(null);
  const userPhotoURL = useSelector(selectUserPhoto);
  const userId = useSelector(selectUserId);
  const postList = useSelector(selectPostList);

  const commentList = postList.filter((el) => el.postId === postId)[0].comments;

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const date = new Date();

    const createdAt = createdDate(date);

    if (!comment) return alert("Напишіть кометар, будь ласка");

    dispatch(
      createComment({
        postId,
        userPhotoURL,
        comment,
        createdAt,
        userId,
        commentId: uuid.v4(),
      })
    );

    setComment(null);
  };

  return (
    <View style={styles.contaner}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        backgroundColor="tomato"
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? -500 : -500}
        style={styles.contaner}
      > */}

      <Image style={styles.imageComment} source={{ uri: imageUrl }} />
      {/* <View style={{ marginBottom: 16 }}> */}
      {!commentList ? (
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
          }}
        >
          Ця публікація ще не має коментарів
        </Text>
      ) : (
        <FlatList
          data={commentList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={
                  userId === item.userId
                    ? styles.commentThumbCurrentUser
                    : styles.commentThumb
                }
              >
                <Image
                  style={styles.photoUser}
                  source={{ uri: item.userPhotoURL }}
                />
                <View
                  style={[
                    styles.commentWrapper,
                    userId === item.userId && styles.commentWrapperCurrentUser,
                  ]}
                >
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.commentDate}>{item.createdAt}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.commentId}
        />
      )}
      {/* </View> */}

      <View style={styles.inputContaner}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={(comment) => setComment(comment)}
          placeholder="Коментувати..."
          placeholderTextColor="#bdbdbd"
        />
        <Pressable style={styles.button} onPress={() => handleSubmit()}>
          <Feather name="arrow-up" size={15} color="#ffffff" />
        </Pressable>
      </View>
      {/* </KeyboardAvoidingView>
    </TouchableWithoutFeedback> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#ffff99",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  commentThumb: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  commentThumbCurrentUser: {
    flexDirection: "row-reverse",
    gap: 16,
  },
  imageComment: {
    marginBottom: 32,
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  photoUser: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#bdbdbd",
  },
  commentWrapperCurrentUser: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 6,
  },
  commentWrapper: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 16,
    marginBottom: 24,
    borderRadius: 6,
    borderTopLeftRadius: 0,
  },
  commentText: {
    marginBottom: 8,
    color: "#212121",
    fontSize: 13,
    lineHeight: 18,
  },
  commentDate: {
    color: "#bdbdbd",
  },
  input: {
    height: 50,
    padding: 16,
    borderRadius: 25,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  inputContaner: {
    justifyContent: "flex-end",
    paddingTop: 16,
  },

  button: {
    position: "absolute",
    top: 24,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#ff6c00",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
