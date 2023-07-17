import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

export default function () {
  const {
    params: { imageUrl },
  } = useRoute();

  return (
    <View style={styles.contaner}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.inputContaner}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          placeholderTextColor="#bdbdbd"
        />
        <Pressable style={styles.button}>
          <Feather name="arrow-up" size={15} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  image: {
    marginBottom: 32,
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  input: {
    height: 50,
    padding: 16,
    borderRadius: 25,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  inputContaner: {},

  button: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#ff6c00",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
