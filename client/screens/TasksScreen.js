import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Task from '../components/Task';
import { BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputTask from '../components/InputTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";

const TasksScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    try {
      const token = await AsyncStorage.getItem('token')
      const userId = await AsyncStorage.getItem('userId')
      const response = await fetch("https://tasks-react-native-node.vercel.app/tasks/"+userId, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data)
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
  }

  function clearTask(id) {
   setTasks(tasks.filter((task) => task.id !== id)); 
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => 
        task.id === id
        ? {...task, completed: task.completed === 1 ? 0 : 1}
        : task
      )
    )
  }

  function updateTask(id, updatedTask) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  }  

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };


  return (
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={tasks}
            keyExtractor={(task) => task.id}
            renderItem={({ item }) => (
              <Task {...item} clearTask={clearTask} toggleTask={toggleTask} updateTask={updateTask}/>
            )}
            ListHeaderComponent={() => <View style={styles.header}><Text style={styles.title}>Today</Text><TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
</View>}
            contentContainerStyle={styles.contentContainerStyle}
          />
          <InputTask tasks={tasks} setTasks={setTasks} />
        </SafeAreaView>
        <StatusBar style="auto" />
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E9E9EF',
      paddingTop: 30,
    },
    contentContainerStyle: {
      padding: 15,
    },
    title: {
      fontWeight: "800",
      fontSize: 28,
      marginBottom: 15,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    }
});

export default TasksScreen;