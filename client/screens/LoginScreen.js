import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import check from '../assets/check.png'
import Img from '../components/Img';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://tasks-react-native-node.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('userId', data.userId.toString());
                setEmail("");
                setPassword("");
                navigation.navigate('Tasks');
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during login');
        }
    };

    const navegateRegister = async() => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <View style={{flex:1, alignItems: 'center'}}>
                <Img src={check}/>
            </View>
            <View style={styles.contentContainerStyle}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.link}>
                    <TouchableOpacity onPress={navegateRegister}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E9E9EF',
      paddingTop: 30,
      justifyContent: 'center',
      
    },
    contentContainerStyle: {             
        padding: 50,              
        gap: 40,                  
        backgroundColor: '#FFFFFF', 
        borderRadius: 10,         
        shadowColor: '#000',      
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,      
        shadowRadius: 3.84,     
        elevation: 5,  
        marginTop: 0,           
        marginVertical: 90, 
        marginHorizontal: 40,     
    },
    title: {
      fontWeight: "800",
      fontSize: 28,
      marginBottom: 15,
    },
    input: {
        height: 50,                  
        borderColor: '#ccc',         
        borderWidth: 1,              
        borderRadius: 10,            
        paddingHorizontal: 15,       
        fontSize: 16,                
        color: '#333',               
        backgroundColor: '#f9f9f9',  
        marginBottom: 15,            
        shadowColor: '#000',        
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1,          
        elevation: 3,  
    },
    button: {
        backgroundColor: '#007BFF',  
        paddingVertical: 15,         
        paddingHorizontal: 25,       
        borderRadius: 10,            
        alignItems: 'center',        
        justifyContent: 'center',    
        shadowColor: '#000',         
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,          
        shadowRadius: 3.84,          
        elevation: 5,                     
    },
    buttonText: {
        color: '#fff',              
        fontSize: 16,                
        fontWeight: '600',          
        textTransform: 'uppercase', 
        letterSpacing: 1,        
    },
    link: {
        alignItems: 'center'
    }
});

export default LoginScreen;
