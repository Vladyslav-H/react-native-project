import { Pressable, StyleSheet } from "react-native";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function CreatePostsScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -175 : 175}
      style={styles.contaner}
      > */}
      <View style={styles.contaner}>
        <View style={styles.cameraContaner}>
          <Pressable style={styles.cameraIconContaner}>
            <View>
              <MaterialIcons name="camera-alt" size={24} color="#bdbdbd" />
            </View>
          </Pressable>
        </View>
        <Text style={styles.cameraText}>Завантажте фото</Text>
        <View style={styles.inputContaner}>
          <TextInput
            style={{ ...styles.input, marginBottom: 16 }}
            placeholder="Назва..."
            placeholderTextColor="#bdbdbd"
          />
          <TextInput
            style={{ ...styles.input, paddingLeft: 28 }}
            placeholder="Місцевість..."
            placeholderTextColor="#bdbdbd"
          />
          <Feather
            style={styles.icon}
            name="map-pin"
            size={24}
            color="#bdbdbd"
          />
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonTitle}>Опубліковати</Text>
        </Pressable>
        <Pressable style={styles.buttonRemove}>
          <Feather name="trash-2" size={24} style={styles.buttonTitle} />
        </Pressable>
      </View>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  cameraContaner: {
    height: 240,
    marginBottom: 8,
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
  },
  cameraIconContaner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraText: {
    fontSize: 16,
    color: "#bdbdbd",
    marginBottom: 32,
  },
  inputContaner: {
    marginBottom: 32,
  },
  input: {
    position: "relative",
    height: 50,
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
  },
  icon: {
    position: "absolute",
    bottom: 13,
  },
  button: {
    height: 51,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 120,
    borderRadius: 100,
    backgroundColor: "#f6f6f6",
  },
  buttonTitle: {
    textAlign: "center",
    color: "#bdbdbd",
  },
  buttonRemove: {
    width: 70,
    height: 40,
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
