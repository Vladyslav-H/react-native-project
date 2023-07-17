import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function PublicationItem({
  image,
  description,
  comments = 0,
  likes = 0,
  location,
}) {
  const navigation = useNavigation();
  const {
    params: { coordinate },
  } = useRoute();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.description}>{description}</Text>
      <View style={styles.thumb}>
        <View style={styles.wrapper}>
          <View style={styles.commentContaner}>
            <Pressable
              onPress={() => {
                navigation.navigate("Коментарі", { imageUrl: image });
              }}
            >
              <Feather
                name="message-circle"
                size={24}
                color={comments ? "#ff6c00" : "#bdbdbd"}
                // stroke="#ff6c00"
              />
            </Pressable>
            <Text
              style={
                comments ? styles.text : { ...styles.text, color: "#bdbdbd" }
              }
            >
              {comments}
            </Text>
          </View>
          {likes ? (
            <View style={styles.commentContaner}>
              <Feather name="thumbs-up" size={22} color="#ff6c00" />
              <Text style={styles.text}>{likes}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.locationContaner}>
          <Pressable
            onPress={() => {
              navigation.navigate("Мапа", { coordinate });
            }}
          >
            <Feather name="map-pin" size={24} color="#bdbdbd" />
          </Pressable>
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
  },
  image: {
    marginBottom: 8,
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  description: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  thumb: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    flexDirection: "row",
    gap: 24,
  },
  commentContaner: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 6,
    color: "#212121",
  },
  locationContaner: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  locationText: {
    marginLeft: 4,
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
