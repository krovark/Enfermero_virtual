import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { IconButton } from 'react-native-paper';



const Register = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }

    console.log({
      nombre,
      apellido,
      genero,
      dni,
      fechaNacimiento,
      email,
      password,
    });

    // Aquí puedes agregar la lógica para registrar al usuario
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
                value={genero}
                onChangeText={setGenero}
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
                label="DNI"
                value={dni}
                onChangeText={setDni}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Fecha de nacimiento"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
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
              <Button mode="contained" onPress={() => setStep(1)} style={styles.button} buttonColor="#D3D3D3">
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
              <Button mode="contained" onPress={() => setStep(2)} style={styles.button} buttonColor="#D3D3D3">
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
