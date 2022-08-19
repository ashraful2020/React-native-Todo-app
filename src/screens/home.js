import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {
  query,
  collection,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../App";
const Home = ({ navigation, user }) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "Notes"), where("uid", "==", user?.uid));
    onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
    });
  }, []);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;

    return (
      <Pressable
        onPress={() => navigation.navigate("Edit", { item })}
        style={{
          backgroundColor: color,
          marginBottom: 20,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <Pressable style={styles.deleteNote}>
          <AntDesign
            name="delete"
            size={24}
            color="red"
            onPress={() => {
              deleteDoc(doc(db, "Notes", item.id));
            }}
          />
        </Pressable>
        <Text style={{ color: "#fff", fontSize: 24 }}>{title}</Text>
        <Text style={{ color: "#fff", fontSize: 15 }}>{description}</Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text>Home</Text>
        <Pressable onPress={() => navigation.navigate("Create")}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  deleteNote: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 10,
    margin: 20,
    marginHorizontal: 40,
    borderRadius: 50,
    borderWidth: 0.4,
    borderColor: "white",
    zIndex: 4,
  },
});
