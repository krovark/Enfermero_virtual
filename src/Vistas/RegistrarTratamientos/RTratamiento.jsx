import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button  } from 'react-native';



const Tratamientos = () => {
  const [notas, setNotas] = useState(''); // State to hold the input text
  const [horario, setHorario] = useState('');
    const [recordatorio, setRecordatorio] = useState('');

  const handleSubmit = () => {
    // Do something with the user's input (e.g., save it to a variable or send it to a server)
    console.log('User input:', notas);
    console.log('User input:', horario);
    console.log('User input:', recordatorio);
    };
    return (
      <View style={styles.tratamientos_container}>

      <Text style={styles.labels} >Recordatorio de tratamiento</Text>
      <TextInput
        label="Tratamiento"
        style={styles.input}
        onChangeText={setRecordatorio}
        value={recordatorio}
      />
      <Text style={styles.labels} >Horario </Text>
      <TextInput
        label="Horario"
        style={styles.input}
        onChangeText={setHorario}
        value={horario}
      />
      <Text style={styles.labels} >Notas</Text>
      <TextInput
        label="Notas"
       
        style={styles.input}
        onChangeText={setNotas}
        value={notas}
      />
      <Text style={styles.labels} >Alarma</Text>
      <Button
        title="Agregar"
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