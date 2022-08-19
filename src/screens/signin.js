import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/input";
import Button from "../components/button";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.signinImage}
          source={require("../../assets/Image/siginin.png")}
        />
      </View>
      <View>
        <Input
          autoCapitalize={"none"}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your Email"
        />
        <Input
          autoCapitalize={"none"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholder="Enter your Password"
        />
      </View>
      <Button
        title={"Sign In"}
        onPress={signin}
        customStyle={{ alignSelf: "center" }}
      />

      <Pressable
        onPress={() => {
          navigation.navigate("Signup");
        }}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text>
          Don't have any account ?{" "}
          <Text style={{ color: "green", textDecoration: "underline" }}>
            Sign up{" "}
          </Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  signinImage: {
    height: 300,
    width: 300,
    alignSelf: "center",
    backgroundColor: "#346",
    margin: 0,
  },
  textInput: {
    fontSize: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.9,
    borderBottomColor: "gray",
  },
});
