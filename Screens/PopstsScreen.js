import { View, Text, Image, StyleSheet } from "react-native";

import UserImage from "../assets/images/user-img.jpg";

export default function PostsScreen({ login, email }) {
  console.log("PostSc", login);
  return (
    <View style={styles.contaner}>
      <View style={styles.userContaner}>
        <Image style={styles.image} source={UserImage} />
        <View style={styles.textContaner}>
          <Text style={styles.nameText}>Name SurName</Text>
          <Text style={styles.emailText}>user@email.com</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
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
