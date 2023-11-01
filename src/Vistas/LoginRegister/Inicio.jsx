import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Inicio = ({ navigation }) => {
  const paperStyle = {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  const buttonContainerStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const buttonStyle = {
    margin: 10,
    padding: 10,
    fontSize: 16,
  };

  const titleStyle = {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'right',
  };

  const subtitleStyle = {
    fontSize: 18,
    textAlign: 'right',
  };

  const ingresarButtonStyle = {
    ...buttonStyle,
    color: 'black',
  };

  return (
    <ImageBackground source={{ uri: "https://img.freepik.com/foto-gratis/concepto-dia-trabajadores-medicos-atencion-medica-uniforme-medicina_185193-108329.jpg" }} style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={paperStyle}>
          <View style={{ textAlign: 'right' }}>
            <Text style={titleStyle}>SaludApp</Text>
            <Text style={subtitleStyle}>Asistente médico virtual</Text>
          </View>
          <View style={buttonContainerStyle}>
          <Button mode="outlined" style={buttonStyle} buttonColor="#ffffff" onPress={() => navigation.navigate('Register')}>Registrarse</Button>
          <Button mode="contained" style={ingresarButtonStyle} onPress={() => navigation.navigate('Login')}>Ingresar</Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Inicio;
