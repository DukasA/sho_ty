import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success</Text>
      <Text>The door is now open</Text>
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
    color: '#2A9928'
  },
});

export default SuccessScreen;
