import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { useState, useRef } from "react"
import "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SharedTaskModalContent from "./SharedTaskModalContent";
import TaskModalContent from "./TaskModalContent";
import AsyncStorage from '@react-native-async-storage/async-storage';

function CheckMark({id, completed, toggleTask}) {
    async function toggle() {
        const token = await AsyncStorage.getItem('token')
        const response = await fetch(`https://tasks-react-native-node.vercel.app/tasks/${id}`,{
            method:"PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                value: completed ? false : true,
            }),
        });
        const data = await response.json();
        toggleTask(id);
        console.log(data)
    }
    return (
        <Pressable 
        onPress={toggle}
        style={[styles.checkMark, {backgroundColor: completed===0 ? "#E9E9EF" : "#0EA5E9"}]}>
        </Pressable>
    )
}

export default function Task({
    id,
    title,
    shared_with_id,
    completed,
    clearTask,
    toggleTask,
    updateTask,
}) {
    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const bottomSheetModalRef = React.useRef(null);
    const sharedBottomSheetRef = React.useRef(null);
    const snapPoints = ["25%", "48%", "75%"];
    const snapPointsShared = ["40%"];

    function handlePressentModal() {
      bottomSheetModalRef.current?.present();
    }

    function handlePressentShared() {
      sharedBottomSheetRef.current?.present();
    }

    async function deleteTask() {
        const token = await AsyncStorage.getItem('token')
        const response = await fetch(`https://tasks-react-native-node.vercel.app/tasks/${id}`,{
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        clearTask(id);     
    }
    
    return(
        <TouchableOpacity 
            onLongPress = {() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
            style={[styles.container]}
        >
            <View style={styles.containerTextCheckBox}>
                <CheckMark id={id} completed={completed} toggleTask={toggleTask} />
                <Text style={styles.text}>{title}</Text>
            </View>
            {shared_with_id != null ? (
                <Feather
                    onPress={handlePressentShared}
                    name="users"
                    size={20}
                    color="#383839"
                />
            ):(
                <Feather
                    onPress={handlePressentModal}
                    name="share"
                    size={20}
                    color="#383839"
                />
            )}
            {isDeleteActive && (
                <Pressable onPress={deleteTask} style={styles.deleteButton}>
                    <Text style={{color: "white", fontWeight: "bold"}}>X</Text>
                </Pressable>
            )}

            <BottomSheetModal
              ref={sharedBottomSheetRef}
              snapPoints={snapPointsShared}
              backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
              <SharedTaskModalContent
                id={id}
                title={title}
                shared_with_id={shared_with_id}
                completed={completed}
              />
            </BottomSheetModal>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={2}
              snapPoints={snapPoints}
              backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
              <TaskModalContent id={id} title={title} updateTask={updateTask} bottomSheetModalRef={bottomSheetModalRef} />
            </BottomSheetModal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 14,
      borderRadius: 21,
      marginBottom: 10,
      backgroundColor: "white",
    },
    containerTextCheckBox: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      flexGrow: 1,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#383839",
      letterSpacing: -0.011 * 16, // 16 = baseFontSize
      flexShrink: 1,
      marginHorizontal: 8,
    },
    checkMark: {
      width: 20,
      height: 20,
      borderRadius: 7,
    },
    deleteButton: {
      position: "absolute",
      right: 0,
      top: -6,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ef4444",
      borderRadius: 10,
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 15,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    title: {
      fontWeight: "900",
      letterSpacing: 0.5,
      fontSize: 16,
    },
    subtitle: {
      color: "#101318",
      fontSize: 14,
      fontWeight: "bold",
    },
    description: {
      color: "#56636F",
      fontSize: 13,
      fontWeight: "normal",
      width: "100%",
    },
});