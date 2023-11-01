import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { Button, TextInput as TextInputPaper } from 'react-native-paper';
import { IconButton } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/foto-gratis/hermosa-joven-doctora-mirando-camara-oficina_1301-7807.jpg" }} style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <IconButton
        icon="arrow-left"
        size={30}
        style={styles.iconButton}
        iconColor='black'
        onPress={() => navigation.navigate('Inicio')}
        />
        <Text style={{ fontSize: 24, color: 'white' }}>Iniciar Sesión</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  iconButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default Login;
