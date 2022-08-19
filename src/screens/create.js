import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "../components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";

const Create = ({ navigation, user }) => {
  const colorOptions = [
    "#7c76c4",
    "#5eb2cc",
    "#65f78c",
    "#e3a762",
    "#f05af2",
    "#9225db",
    "#e3427a",
  ];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#5eb2cc");
  const addNote = async () => {
    await addDoc(collection(db, "Notes"), {
      title,
      description,
      color,
      uid: user.uid,
    });
    navigation.goBack();
    alert("Success");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
      }}
    >
      <View style={{ width: "100%" }}>
        <Input
          autoCapitalize={"none"}
          onChangeText={(text) => setTitle(text)}
          placeholder="Title"
        />
        <Input
          autoCapitalize={"none"}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter your description"
          multiline={true}
        />

        <Text>Select Your note theme</Text>
        <View style={{ flexDirection: "row" }}>
          {colorOptions.map((option) => {
            const selected = color === option;
            return (
              <Pressable
                onPress={() => setColor(option)}
                style={styles.radioContainer}
              >
                <View
                  style={[
                    styles.outerCircle,
                    selected && styles.selectedOuterCircle,
                    {
                      backgroundColor: option,
                      borderColor: option,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.innerCircle,
                      {
                        backgroundColor: option,
                        borderColor: option,
                      },
                      selected && styles.selectedInnerCircle,
                    ]}
                  ></View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Button
          title={"ADD Note"}
          customStyle={{ alignSelf: "center", width: "90%" }}
          onPress={addNote}
        />
      </View>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 9,
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
    backgroundColor: "white",
    borderColor: "white",
  },
  selectedOuterCircle: {
    borderWidth: 1,
    borderColor: "orange",
  },
  selectedInnerCircle: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "orange",
  },
});
