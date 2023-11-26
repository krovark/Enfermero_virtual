import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import API_URL from '../../utils/fetchConfig'

const Register = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [sangre, setSangre] = useState('');

  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [emergencia, setEmergencia] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [edad, setEdad] = useState('');

  const alturaInputRef = useRef(null);
  const pesoInputRef = useRef(null);
  const sangreInputRef = useRef(null);
  const telefonoInputRef = useRef(null);
  const emergenciaInputRef = useRef(null);
  const nombreInputRef = useRef(null);
  const apellidoInputRef = useRef(null);
  const generoInputRef = useRef(null);
  const edadInputRef = useRef(null);
  const fechaNacimientoInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setNombre('');
      setApellido('');
      setGenero('');
      setEdad('');
      setEmergencia('');
      setAltura('');
      setPeso('');
      setSangre('');
      setTelefono('');
      setFechaNacimiento('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      nombreInputRef.current?.clear();
      apellidoInputRef.current?.clear();
      generoInputRef.current?.clear();
      edadInputRef.current?.clear();
      fechaNacimientoInputRef.current?.clear();
      emailInputRef.current?.clear();
      passwordInputRef.current?.clear();
      confirmPasswordInputRef.current?.clear();
      alturaInputRef.current?.clear();
      pesoInputRef.current?.clear();
      sangreInputRef.current?.clear();
      telefonoInputRef.current?.clear();
      emergenciaInputRef.current?.clear();
      
    });

    return unsubscribe;
  }, [navigation]);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
        Alert.alert('Las contraseñas no coinciden');
        return;
    }

    // Datos del usuario a enviar
    const userData = {
        nombre,
        apellido,
        genero,
        fechaNacimiento,
        email,
        password,
        altura,
        peso,
        sangre,
        telefono,
        edad,
        emergencia,
        
    };

    // Envía la solicitud al backend
    fetch(`${API_URL}/users/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('El correo electrónico ya está registrado.');
      }
      return response.json();
  })
  .then(data => {
      Alert.alert(
          "Registro Exitoso",
          "Usuario registrado con éxito",
          [{ text: "OK", onPress: () => navigation.navigate('Login') }]
      );
  })
  .catch(error => {
      Alert.alert('Error de Registro', error.message);
  });
};

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/foto-gratis/doctor-trabajo_144627-40457.jpg" }} style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <IconButton
        icon="arrow-left"
        size={30}
        style={styles.iconButton}
        iconColor='black'
        onPress={() => navigation.navigate('Inicio')}
        />
        <Text style={{ fontSize: 24, color: 'white' }}>Registrarse</Text>
        <View style={{ width: '80%' }}>
          {step === 1 && (
            <>
              <TextInput
                label="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Apellido"
                value={apellido}
                onChangeText={setApellido}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Género"
                placeholder="M o F"
                value={genero}
                onChangeText={setGenero}
                style={styles.input}
                mode="outlined"
              />

              <TextInput
                label="Edad"
                value={edad}
                onChangeText={setEdad}
                style={styles.input}
                mode="outlined"
              />

              <Button mode="contained" onPress={() => setStep(2)} style={styles.button}>
                Siguiente
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <TextInput
            label="Fecha de nacimiento"
            placeholder="dd/mm/aaaa"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            style={styles.input}
            mode="outlined"
        />
        <TextInput
            label="Tipo de sangre"
            value={sangre}
            onChangeText={setSangre}
            style={styles.input}
            mode="outlined"
        />
        <TextInput
            label="Peso"
            placeholder="En kilogramos"
            value={peso}
            onChangeText={setPeso}
            style={styles.input}
            mode="outlined"
        />
        <TextInput
            label="Altura"
            placeholder="En centímetros"
            value={altura}
            onChangeText={setAltura}
            style={styles.input}
            mode="outlined"
        />
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                mode="outlined"
              />
              <Button mode="contained" onPress={() => setStep(3)} style={styles.button}>
                Siguiente
              </Button>
              <Button mode="contained" onPress={() => setStep(1)} style={styles.button} buttonColor="#B3B3B3">
                Atrás
              </Button>
            </>
          )}
          {step === 3 && (
            <>
              <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                mode="outlined"
                secureTextEntry
              />
              <TextInput
                label="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                mode="outlined"
                secureTextEntry
              />
              <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Registrarse
              </Button>
              <Button mode="contained" onPress={() => setStep(2)} style={styles.button} buttonColor="#B3B3B3">
                Atrás
              </Button>
            </>
          )}
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

export default Register;
