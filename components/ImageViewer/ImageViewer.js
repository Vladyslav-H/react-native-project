import { Feather } from "@expo/vector-icons";

import { View, Pressable, StyleSheet, Image } from "react-native";

export const ImageViewer = ({ userPhoto, addUserPhoto, removeUserPhoto }) => {
  return (
    <View style={styles.imgContainer}>
      {!userPhoto ? (
        <Pressable onPress={addUserPhoto}>
          <Feather
            name="plus-circle"
            size={30}
            color={"#ff6c00"}
            style={{ position: "absolute", top: 82, right: -12 }}
          />
        </Pressable>
      ) : (
        <View>
          <Image
            style={{ borderRadius: 16, width: 120, height: 120 }}
            source={{
              uri: userPhoto,
            }}
          />
          <Pressable style={styles.closeBtn} onPress={removeUserPhoto}>
            <Feather
              name="x-circle"
              size={25}
              color={"#bdbdbd"}
              style={{ right: 5 }}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  imgContainer: {
    position: "absolute",
    backgroundColor: "#f6f6f6",
    width: 120,
    height: 120,
    top: -60,
    left: 150,
    borderRadius: 16,
  },
  closeBtn: {
    position: "absolute",
    right: -18,
    bottom: 10,
  },
});
