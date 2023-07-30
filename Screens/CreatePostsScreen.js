import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { createPost } from "../redux/post/postOperations";
import { selectUserId } from "../redux/auth/authSelectors";

export default function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [takenPhoto, setTakenPhoto] = useState(null);
  const [postName, setpostName] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [coordinate, setCoordinate] = useState(null);
  const [imageURL, setimageURL] = useState(null);
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const userId = useSelector(selectUserId);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

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

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setCoordinate(coords);

    if (!result.canceled) {
      setimageURL(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleCreatePost = async () => {
    const postData = {
      imageURL,
      postName,
      locationName,
      coordinate,
      userId,
      comments: [],
    };

    if (coordinate) dispatch(createPost(postData));

    setLocationName(null);
    setimageURL(null);
    setpostName(null);

    navigation.navigate("Публікації");
  };

  const removePost = () => {
    setLocationName(null);
    setimageURL(null);
    setpostName(null);
  };

  const isActiveButton = imageURL && postName && locationName;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contaner}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 70}
        >
          <View style={styles.cameraContaner}>
            {imageURL ? (
              <Image
                source={{
                  uri: imageURL,
                }}
                style={{ width: "100%", height: 240 }}
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
          <Pressable onPress={handleSelectImage}>
            {imageURL ? (
              <Text style={styles.cameraText}>Редагувати фото</Text>
            ) : (
              <Text style={styles.cameraText}>Завантажте фото</Text>
            )}
          </Pressable>

          <View style={styles.inputContaner}>
            <TextInput
              style={[
                inputOnFocus === "postName"
                  ? { ...styles.inputFocus, marginBottom: 16 }
                  : { ...styles.input, marginBottom: 16 },
              ]}
              onFocus={() => setInputOnFocus("postName")}
              value={postName}
              onChangeText={setpostName}
              placeholder="Назва..."
              placeholderTextColor="#bdbdbd"
            />
            <TextInput
              style={[
                inputOnFocus === "locationName"
                  ? { ...styles.inputFocus, paddingLeft: 28 }
                  : { ...styles.input, paddingLeft: 28 },
              ]}
              onFocus={() => setInputOnFocus("locationName")}
              value={locationName}
              onChangeText={setLocationName}
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
        </KeyboardAvoidingView>
        <Pressable
          style={[
            styles.button,
            isActiveButton ? styles.buttonActive : styles.buttonDisable,
          ]}
          onPress={() => {
            handleCreatePost();
          }}
          disabled={!isActiveButton}
        >
          <Text
            style={[
              styles.buttonTitle,
              isActiveButton ? styles.buttonActive : styles.buttonDisable,
            ]}
          >
            Опубліковати
          </Text>
        </Pressable>
        <Pressable style={styles.buttonRemove} onPress={removePost}>
          <Feather
            name="trash-2"
            size={24}
            color="#bdbdbd"
            style={styles.buttonTitle}
          />
        </Pressable>
      </View>
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
  subContainer: {
    flex: 1,
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
  inputFocus: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ff6c00",
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
  },
  buttonDisable: {
    backgroundColor: "#f6f6f6",
    color: "#bdbdbd",
  },
  buttonActive: {
    backgroundColor: "#ff6c00",
    color: "#ffffff",
  },
  buttonTitle: {
    textAlign: "center",
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
