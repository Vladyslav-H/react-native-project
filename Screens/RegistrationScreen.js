import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import {
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
import { registerUser } from "../redux/auth/authOperations";
import { ImageViewer } from "../components/ImageViewer/ImageViewer";

export default function RegistrationScreen({ navigation }) {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [photoURL, setphotoURL] = useState(null);
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { width, height } = useWindowDimensions();

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (!login) alert("Введіть логін");
    if (!email) alert("Введіть адресу електронної пошти");
    if (!password) alert("Введіть пароль");

    dispatch(registerUser({ login, email, password, photoURL }));

    setLogin(null);
    setEmail(null);
    setPassword(null);
    setphotoURL(null);
    navigation.navigate("Home");
  };

  const handleAddUserPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setphotoURL(result.assets[0].uri);
    } else {
      alert("Ви не вибрали жодного зображення");
    }
  };

  const removePhoto = () => {
    setphotoURL(null);
  };

  return (
    <ImageBackground
      source={BgImage}
      style={{ position: "absolute", top: 0, width: width, height: height }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -175 : -175}
          style={styles.container}
        >
          <View style={styles.box}>
            <ImageViewer
              userPhoto={photoURL}
              addUserPhoto={handleAddUserPhoto}
              removeUserPhoto={removePhoto}
            />
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.thumb}>
              <TextInput
                style={[
                  styles.input,
                  inputOnFocus === "login" && styles.inputFocus,
                ]}
                onFocus={() => setInputOnFocus("login")}
                value={login}
                onChangeText={(text) => setLogin(text)}
                placeholder="Логін"
                placeholderTextColor="#bdbdbd"
              />
              <TextInput
                style={[
                  styles.input,
                  inputOnFocus === "email" && styles.inputFocus,
                ]}
                onFocus={() => setInputOnFocus("email")}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#bdbdbd"
              />
              <TextInput
                style={[
                  styles.input,
                  inputOnFocus === "password" && styles.inputFocus,
                ]}
                onFocus={() => setInputOnFocus("password")}
                value={password}
                onChangeText={(text) => setPassword(text)}
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
              onPress={() => handleSubmit()}
              onSubmit
            >
              <Text style={styles.buttonTitle}>Зареєстуватися</Text>
            </Pressable>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Login")}
            >
              Вже є акаунт? Увійти
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
});
