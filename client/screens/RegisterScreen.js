import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import check from '../assets/check.png'
import Img from '../components/Img';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('https://tasks-react-native-node.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'User registered successfully!');
                navigation.navigate('Login'); 
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during registration');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{flex:1, alignItems: 'center', margin: 0}}>
                <Img src={check}/>
            </View>
            <View style={styles.contentContainerStyle}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.link}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text>Already have an account? Login</Text>
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
        justifyContent: 'center'
    },
    contentContainerStyle: {
        padding: 20,              
        gap: 40,                  
        backgroundColor: '#FFFFFF', 
        borderRadius: 10,         
        shadowColor: '#000',      
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,      
        shadowRadius: 3.84,     
        elevation: 5,  
        marginTop: 0,           
        marginVertical: 50, 
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

export default RegisterScreen;
