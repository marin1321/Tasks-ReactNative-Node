import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InputTask({ tasks, setTasks }) {
  const [showEmojies, setShowEmojies] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0.1));

  useEffect(() => {
    
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setShowEmojies(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setShowEmojies(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (messageBody === "") {
      return;
    } else {
        const token = await AsyncStorage.getItem('token')
        const userId = await AsyncStorage.getItem('userId')
      const response = await fetch("https://tasks-react-native-node.vercel.app/tasks", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          title: messageBody,
        }),
      });
      const newTask = await response.json();
      setTasks([...tasks, { ...newTask, shared_with_id: null }]);
      Keyboard.dismiss();
      setMessageBody("");
    }
  };

  const RenderEmoji = ({ emoji }) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"transparent"}
        onPress={() => {
          setMessageBody(messageBody + emoji);
        }}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {showEmojies && (
          <Animated.View
            style={[
              styles.emojiesContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <RenderEmoji emoji="✅" />
            <RenderEmoji emoji="🚨" />
            <RenderEmoji emoji="📝" />
            <RenderEmoji emoji="🎁" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="🎉" />
            <RenderEmoji emoji="🏃🏻‍♂️" />
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write a new task"
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="checkcircle"
              size={40}
              color={messageBody ? "black" : "#00000050"}
              style={{ paddingLeft: 5 }}
            />
          </Pressable>
          {/* <MaterialCommunityIcons
            name="arrow-up-circle"
            size={40}
            color={messageBody ? "black" : "#00000050"}
            style={{ paddingLeft: 5 }}
            onPress={handleSubmit}
          /> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: "#00000030",
    alignItems: "baseline",
  },
  emojiesContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingLeft: 10,
    marginVertical: 10,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 25,
    paddingVertical: 5,
    marginRight: 10,
  },

  containerTextInput: {
    width: windowWidth - 100,
    borderWidth: 1,
    borderRadius: 30,
    minHeight: 45,
    paddingHorizontal: 15,
    paddingTop: 8,
    fontSize: 16,
    paddingVertical: 5,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    marginBottom: 5,
    fontWeight: "600",
  },
});