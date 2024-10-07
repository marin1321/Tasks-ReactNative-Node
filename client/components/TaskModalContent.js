import { useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskModalContent({ id, title, updateTask, bottomSheetModalRef }) {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token')
    const userId = await AsyncStorage.getItem('userId')
    const response = await fetch("https://tasks-react-native-node.vercel.app/tasks/shared_tasks", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        task_id: id,
        user_id: userId, 
        email: email, 
      }),
    });
    const data = await response.json();
    updateTask(id, { shared_with_id: data.shared_with_id });
    Keyboard.dismiss();
    setEmail("");
    setFocus(false);
    Alert.alert(
      "Congratulations 🎉",
      `You successfully shared ${title} with ${email}`,
      [{ text: "Okay", onPress: () => bottomSheetModalRef.current?.dismiss() }]
    );
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Share your task</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={styles.description}>
        Enter the email of the user you want to share your task with. Share a
        task with someone and stay in sinc with your goals everyday.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "black" },
        ]}
        placeholder="Enter your contact email"
      />
      <Button
        onPress={handleSubmit}
        title="Share"
        disabled={email.length === 0}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
});