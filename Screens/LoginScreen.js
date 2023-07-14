import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

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

export default function LoginScreen({ navigation }) {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { width, height } = useWindowDimensions();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    setEmail(email);
    setPassword(password);
    console.log("LogScr", "email:", email, "password:", password);
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={BgImage}
      style={{ position: "absolute", top: 0, width: width, height: height }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -255 : -255}
          style={styles.container}
        >
          <View style={styles.box}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.thumb}>
              <TextInput
                style={[
                  styles.input,
                  inputOnFocus === "email" && styles.inputFocus,
                ]}
                onFocus={() => setInputOnFocus("email")}
                value={email}
                onChangeText={setEmail}
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
                onChangeText={setPassword}
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

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonTitle}>Увійти</Text>
            </Pressable>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Registration")}
            >
              Немає акаунту? Зареєструватися
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
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 144,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },

  title: {
    marginBottom: 33,
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
