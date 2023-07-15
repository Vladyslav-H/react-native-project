import { useEffect, useState, useRef } from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [takenPhoto, setTakenPhoto] = useState(null);
  const [namePost,setNamePost]=useState('')
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const createPost = () => {
    setTakenPhoto(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -175 : 175}
      style={styles.contaner}
      > */}
      <View style={styles.contaner}>
        <View style={styles.cameraContaner}>
          {takenPhoto ? (
            <Image
              source={{
                uri: takenPhoto
              }}
              style={{width:'100%',height:240}}
            />
          ) : (
            <Camera style={styles.camera} ref={setCameraRef}></Camera>
          )}
          <Pressable
            style={styles.cameraIconContaner}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
                setTakenPhoto(uri);
                              }
            }}
          >
            <View>
              <MaterialIcons name="camera-alt" size={24} color="#ffffff" />
            </View>
          </Pressable>
        </View>
        <Text style={styles.cameraText}>Завантажте фото</Text>
       
        <View style={styles.inputContaner}>
          <TextInput
            style={{ ...styles.input, marginBottom: 16 }}
            value={namePost}
            onChangeText={setNamePost}
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
        <Pressable style={styles.button} onPress={createPost}>
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
    overflow: "hidden",
  },
  camera: {
    height: 240,
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
    opacity: 0.3,
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
