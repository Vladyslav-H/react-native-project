import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

import BgImage from "../assets/bg-img.jpg";
import UserImage from "../assets/images/user-img.jpg";
import RemoveIcon from "../assets/icons/remove-icon.svg";
import PublicationItem from "../components/ImageViewer/PublicationItem";

// const PublicationList = [
//   {
//     id: 1,
//     source: require("../assets/images/public/forest.jpg"),
//     description: "Ліс",
//     comments: 8,
//     likes: 153,
//     location: "Ukraine",
//   },
//   {
//     id: 2,
//     source: require("../assets/images/public/sunset.jpg"),
//     description: "Захід на Чорному морі",
//     comments: 3,
//     likes: 200,
//     location: "Ukraine",
//   },
//   {
//     id: 3,
//     source: require("../assets/images/public/lodge.jpg"),
//     description: "Старий будиночок у Венеції",
//     comments: 50,
//     likes: 200,
//     location: "Italy",
//   },
// ];

export default function ProfileScreen({ navigation }) {
  // const renderItem = ({ item }) => (
  //   <PublicationItem
  //     image={item.source}
  //     description={item.description}
  //     comments={item.comments}
  //     likes={item.likes}
  //     location={item.location}
  //   />
  // );
  return (
    <ImageBackground
      source={BgImage}
      style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.imgContainer}>
            <Image style={{ borderRadius: 16 }} source={UserImage} />
            <Pressable style={styles.closeBtn}>
              <RemoveIcon width={35} height={35} />
            </Pressable>
          </View>
          <Pressable
            style={styles.buttonLogOut}
            onPress={() => navigation.navigate("Login")}
          >
            <Feather name="log-out" size={24} color="#bdbdbd" />
          </Pressable>
          <Text style={styles.nameText}>Name SurName</Text>
          {/* <FlatList
            data={PublicationList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          /> */}
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
     
    position: "relative",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
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
    marginBottom:33,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
  },
});
