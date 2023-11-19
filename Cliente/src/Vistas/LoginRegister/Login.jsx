import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Button, TextInput as TextInputPaper, IconButton } from 'react-native-paper';
import validator from 'validator';
import { useAuth } from '../../utils/AuthContext';
import axios from "axios";

const DUMMY_USER = {
  email: 'admin@gmail.com',
  password: '123'
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  


  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail('');
      setPassword('');
      
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
      console.log(email);
      console.log(password);
      
      return;
    }

  
    // Verificar si la contraseña es al menos de longitud 3 para el usuario dummy
    if (password.length < 3) {
      Alert.alert('La contraseña es inválida');
      return;
    }


    axios.post('http://192.168.0.3:4000/api/users/login', { "email": email, "password": password })
    .then(rest => {
      const loginCheck = rest.data;
      console.log('algo estamos chequeando', rest.data)
      if(rest.data.loginUser.token != 0) {
        Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión');
        login({ email });
        navigation.navigate('Home');
      }
    }).catch(function (error) {
      if (error.response) {
        Alert.alert('Error de inicio de sesión', 'Credenciales incorrectas');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
  })};

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/foto-gratis/hermosa-joven-doctora-mirando-camara-oficina_1301-7807.jpg" }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={30}
          style={styles.iconButton}
          iconColor='black'
          onPress={() => navigation.goBack()} // Utiliza goBack para volver a la pantalla anterior
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
});

export default Login;
