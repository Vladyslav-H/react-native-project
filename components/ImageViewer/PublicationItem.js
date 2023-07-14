import { View, StyleSheet, Image, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PublicationItem({
  image,
  description,
  comments,
  likes,
  location,
}) {
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.description}>{description}</Text>
      <View style={styles.thumb}>
        <View style={styles.wrapper}>
          <View style={styles.commentContaner}>
            <Feather
              name="message-circle"
              size={24}
              color="#ff6c00"
              stroke="#ff6c00"
            />
            <Text style={styles.text}>{comments}</Text>
          </View>
          <View style={styles.commentContaner}>
            <Feather name="thumbs-up" size={22} color="#ff6c00" />
            <Text style={styles.text}>{likes}</Text>
          </View>
        </View>
        <View style={styles.locationContaner}>
          <Feather name="map-pin" size={24} color="#bdbdbd" />
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
