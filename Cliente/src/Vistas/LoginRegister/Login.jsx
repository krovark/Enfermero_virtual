import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, TouchableOpacity  } from 'react-native';
import { Button, TextInput as TextInputPaper, IconButton } from 'react-native-paper';
import validator from 'validator';
import { useAuth } from '../../utils/AuthContext';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail('3243@gmail.com');
      setPassword('111');
      
      if (emailInputRef.current && passwordInputRef.current) {
        emailInputRef.current.clear();
        passwordInputRef.current.clear();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleSubmit = () => {
    if (!validator.isEmail(email)) {
      Alert.alert('El correo electrónico es inválido');
      return;
    }

    if (password.length < 3) {
      Alert.alert('La contraseña es inválida');
      return;
    }

   /*  axios.post('http://192.168.68.113:4000/api/users/login', { email, password })
      .then(async response => {
        if (response.data && response.data.loginUser && response.data.loginUser.token) {
          await AsyncStorage.setItem('userToken', response.data.loginUser.token);
          Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión');
          login({ email });
          navigation.navigate('Home');
        } else {
          Alert.alert('Error de inicio de sesión', 'Credenciales incorrectas');
        }
      })
      .catch(error => {
        if (error.response) {
          Alert.alert('Error de inicio de sesión', error.response.data.message || 'Credenciales incorrectas');
        } else {
          console.error(error)
          Alert.alert('Error de inicio de sesión', 'Error al conectarse al servidor');
        }
      });
  }; */

  fetch('http://192.168.0.103:4000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(async (response) => {
    const data = await response.json();
    if (data && data.loginUser && data.loginUser.token) {
      await AsyncStorage.setItem('userToken', data.loginUser.token);
      Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión');
      login({ email });
      navigation.navigate('Home');
    } else {
      Alert.alert('Error de inicio de sesión', 'Credenciales incorrectas');
    }
  })
  .catch(error => {
    console.error(error)
    Alert.alert('Error de inicio de sesión', 'Error al conectarse al servidor');
  });
};


  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/foto-gratis/hermosa-joven-doctora-mirando-camara-oficina_1301-7807.jpg" }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={30}
          style={styles.iconButton}
          iconColor='black'
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.titleText}>Iniciar Sesión</Text>
        <View style={styles.formContainer}>
          <TextInputPaper
            ref={emailInputRef}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            style={styles.input}
            mode="outlined"
          />
          <TextInputPaper
            ref={passwordInputRef}
            label="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text.toLowerCase())}
            style={styles.input}
            mode="outlined"
            secureTextEntry
          />
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Iniciar Sesión
          </Button>
          <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPW')} // Navegación a ResetPW
                    style={styles.forgotPasswordLink}
                >
                    <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  titleText: {
    fontSize: 24,
    color: 'white'
  },
  formContainer: {
    width: '80%'
  },
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
  forgotPasswordLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Login;