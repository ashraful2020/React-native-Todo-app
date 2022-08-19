import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/input";
import Button from "../components/button";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";

const Signup = ({ navigation }) => {
  const [gender, setGender] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Success");
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        age,
        gender,
        uid: result?.user?.uid,
      });
      console.log(docRef, "result");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const genderOptions = ["Male", "Female"];
  return (
    <SafeAreaView>
      <View>
        <Input
          placeholder="Your full Name"
          onChangeText={(text) => setName(text)}
        />
        <Input
          onChangeText={(text) => setAge(text)}
          placeholder="Enter your Age"
        />
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
        {/* <Input onChangeText={(text) => setName(text)} secureTextEntry placeholder="Confirm Password" /> */}
      </View>
      {genderOptions.map((option) => {
        const selected = gender === option;
        return (
          <Pressable
            onPress={() => setGender(option)}
            style={styles.radioContainer}
          >
            <View
              style={[
                styles.outerCircle,
                selected && styles.selectedOuterCircle,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  selected && styles.selectedInnerCircle,
                ]}
              ></View>
            </View>
            <Text style={{ marginLeft: 10 }}> {option} </Text>
          </Pressable>
        );
      })}

      <Button
        title={"Sign In"}
        customStyle={{ alignSelf: "center" }}
        onPress={signup}
      />

      <Pressable
        onPress={() => {
          navigation.navigate("Signin");
        }}
        style={styles.backSignin}
      >
        <Text>
          Already Have an account ?{"    "}
          <Text style={{ color: "green", textDecoration: "underline" }}>
            Sign in{" "}
          </Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  backSignin: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 25,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    backgroundColor: "gray",
    borderColor: "gray",
  },
  selectedOuterCircle: {
    borderWidth: 1,
    borderColor: "orange",
  },
  selectedInnerCircle: {
    borderWidth: 1,
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
