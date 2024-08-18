import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ESP32_IP = '172.20.10.6'; // получаем при запуске платы и отображении в serial monitor

const WelcomeScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const handlePasswordSubmit = async () => {
    try {
      setIsLoading(!isLoading)
      const response = await axios.post(`http://${ESP32_IP}/check-password`, new URLSearchParams({
        password: password
      }));
      console.log("RESPONSE:" , response)
      if (response.data.status === 'OK') {
        setIsLoading(false)
        navigation.navigate('Verification');
      } else if (response.data.code === 401) {
         alert('Incorrect password, try again :(')
      } else {
        setIsLoading(false)
        alert('Access denied');
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error);
      alert('Error');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Password verification in progress, please wait :)</Text>
      <ActivityIndicator />
    </View>
    )
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text>Enter the secret password</Text>
      <Text style={styles.errTitle}>{errMsg}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={handlePasswordSubmit} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  waitTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2861F6'
  },
  errTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FF2E2E'
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
