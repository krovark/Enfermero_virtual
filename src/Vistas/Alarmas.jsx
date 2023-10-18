import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Alarmas = () => {
    return (
      <View style={styles.container}>
        <Text>Hola Hola hola hola mundo</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default Alarmas;