import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, TextInput as TextInputPaper } from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Iniciar Sesión</Text>
      <View style={{ width: '80%' }}>
        <TextInputPaper
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
        />
        <TextInputPaper
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Iniciar Sesión
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default Login;