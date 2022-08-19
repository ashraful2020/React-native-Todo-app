import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Create from "./src/screens/create";
import Edit from "./src/screens/edit";
import Home from "./src/screens/home";
import Signin from "./src/screens/signin";
import Signup from "./src/screens/signup";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
// Firebase Authentication
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKA-bGDbh4A2FIFJG-sMaOAuS6xehh3mQ",
  authDomain: "todo-app-87c97.firebaseapp.com",
  projectId: "todo-app-87c97",
  storageBucket: "todo-app-87c97.appspot.com",
  messagingSenderId: "243058882044",
  appId: "1:243058882044:web:ca7fcfb4f994a77e406e79",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Firestore database
export const db = getFirestore(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    setLoading(true);
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribed;
  }, []);
  // useEffect(() => {
  //   signOut(auth).then(() => {});
  // }, [auth]);
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"green"} size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Home">
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name="Edit">
              {(props) => <Edit {...props} user={user}></Edit>}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signin"
              component={Signin}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signup"
              component={Signup}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
