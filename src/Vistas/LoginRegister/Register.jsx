import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';

const Register = ({ navigation }) => {
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
      alert('Las contraseñas no coinciden');
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
        <Text style={{ fontSize: 24, color: 'white' }}>Registrarse</Text>
        <View style={{ width: '80%' }}>
          <TextInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          {/* Repite este patrón para los demás campos */}
          <Button title="Registrarse" onPress={handleSubmit} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});

export default Register;
