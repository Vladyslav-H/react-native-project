import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BgImage from "../assets/bg-img.jpg";
import AddPhotoIcon from "../assets/add-photo.svg";
import RemoveIcon from "../assets/remove-icon.svg";
import ImageViewer from "../components/ImageViewer/ImageViewer";
import UserImage from "../assets/images/user-img.jpg";

export default function RegistrationScreen() {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [selectedImage, setSelectedImage] = useState(true);
  const { width, height } = useWindowDimensions();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAddUserPhoto = () => {
    setSelectedImage(!selectedImage);
  };

  //   const pickImageAsync = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true,
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //      setSelectedImage(result.assets[0].uri);
  //     } else {
  //       alert("You did not select any image.");
  //     }
  //   };

  return (
    <ImageBackground
      source={BgImage}
      style={{ position: "absolute", top: 0, width: width, height: height }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -175 : -175}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.box}>
            <View style={styles.imgContainer}>
              {selectedImage ? (
                <Pressable onPress={handleAddUserPhoto}>
                  <AddPhotoIcon width={132} height={120} />
                </Pressable>
              ) : (
                <View>
                  <Image style={{ borderRadius: 16 }} source={UserImage} />
                  <Pressable
                    style={styles.closeBtn}
                    onPress={handleAddUserPhoto}
                  >
                    <RemoveIcon width={35} height={35} />
                  </Pressable>
                </View>
              )}
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.thumb}>
              <TextInput
                style={[
                  styles.input,
                  inputOnFocus === "login" && styles.inputFocus,
                ]}
                onFocus={() => setInputOnFocus("login")}
                placeholder="Логін"
                placeholderTextColor="#bdbdbd"
              />
              <TextInput
                style={[
                  styles.input,
                  inputOnFocus === "email" && styles.inputFocus,
                ]}
                onFocus={() => setInputOnFocus("email")}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#bdbdbd"
              />
              <TextInput
                style={[
                  styles.input,
                  inputOnFocus === "password" && styles.inputFocus,
                ]}
                onFocus={() => setInputOnFocus("password")}
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                secureTextEntry={showPassword}
              />
              <Pressable
                style={styles.passwordButton}
                onPress={handleShowPassword}
              >
                <Text style={styles.passwordButtonText}>
                  {showPassword ? "Показати" : "Приховати"}
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={styles.button}
              // onPress={onPress}
            >
              <Text style={styles.buttonTitle}>Зареєстуватися</Text>
            </Pressable>
            <Text style={styles.text}>Вже є акаунт? Увійти</Text>
            <View style={styles.indicator}></View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    paddingLeft: 16,
    paddingRight: 16,
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
  title: {
    marginBottom: 32,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    textAlign: "center",
  },
  thumb: {
    marginBottom: 43,
    gap: 16,
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    backgroundColor: "#f6f6f6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
  },
  inputFocus: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  button: {
    width: 343,
    height: 51,
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 16,
    borderRadius: 100,
    backgroundColor: "#ff6c00",
  },
  buttonTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#ffffff",
  },
  text: {
    color: "#1b4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  passwordButton: {
    position: "absolute",
    bottom: 31,
    right: 16,
  },
  passwordButtonText: {
    color: "#1b4371",
    fontSize: 16,
  },
  indicator: {
    position: "absolute",
    bottom: -21,
    width: 135,
    height: 5,
    backgroundColor: "#212121",
    borderRadius: 5,
  },
});
