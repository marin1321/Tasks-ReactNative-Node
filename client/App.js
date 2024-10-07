import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';  // Asegúrate de que la ruta sea correcta
import TasksScreen from './screens/TasksScreen';   // La pantalla donde se muestran las tareas
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ title: 'Login', headerShown: false }} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{ title: 'Register', headerShown: false }} 
                />
                <Stack.Screen 
                    name="Tasks" 
                    component={TasksScreen} 
                    options={{ title: 'My Tasks', headerShown: false }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
