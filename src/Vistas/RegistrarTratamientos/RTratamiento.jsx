import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button  } from 'react-native';

const Tratamientos = () => {
  const [tratamineto, setTratamiento] = useState(''); // State to hold the input text
  const [horario, setHorario] = useState('');
  const [notas, setNotas] = useState('');
  const handleSubmit = () => {
    // Do something with the user's input (e.g., save it to a variable or send it to a server)
    console.log('User input:', tratamineto);
    };
    return (
      <View>
      <Text>Recordatorio de tratamiento</Text>
      <TextInput
        label="Tratamiento"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(input) => setTratamiento(input)}
        value={tratamineto}
      />
      <Text>Horario</Text>
      <TextInput
        label="Horario"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(input) => setHorario(input)}
        value={horario}
      />
      <Text>Notas</Text>
      <TextInput
        label="Notas"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(input) => setNotas(input)}
        value={notas}
      />
      <Text>Alarma</Text>
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:  '#dcdcdc',
    
  },

  tratamientos_container:{
    margin: 15,


  },

  input: {
    marginBottom: 15,
    backgroundColor: 'white', // Color de fondo para el TextInput
    borderRadius: 5,          // bordes redondeados para el TextInput
    elevation: 2,             // sombra para darle un poco de elevación al TextInput
    paddingHorizontal: 12,
    height: 56,
  },

  labels:{
    fontSize: 16,
  },
});

export default Tratamientos;