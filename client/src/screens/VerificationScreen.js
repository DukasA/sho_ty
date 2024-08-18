import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const SERVER_IP = '192.168.42.171';

const VerificationScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [errMsg, setErrMsg] = useState('')

  const handleVerificationSubmit = async () => {
    try {
      const response = await axios.post(`http://${SERVER_IP}/verify-code`, new URLSearchParams({
          code: verificationCode
      }));
      if (response.data.status === 'OK') {
        navigation.navigate('Success');
      } else if (response.data.code === 401) {
        setErrMsg('Incorrect verification code, try again :(')
      } else {
        alert('Verification failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text>Code has been sent to your email</Text>
      <Text style={styles.errTitle}>{errMsg}</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title="Submit" onPress={handleVerificationSubmit} />
    </View>
  );
};

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

export default VerificationScreen;
