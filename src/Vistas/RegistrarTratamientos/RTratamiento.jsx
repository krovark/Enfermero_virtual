import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch } from 'react-native';


const Tratamientos = () => {
  const [tratamineto, setTratamiento] = useState(''); // State to hold the input text
  const [horario, setHorario] = useState('');
  const [notas, setNotas] = useState('');
  const [isToggled, setToggled] = useState(false);
  const toggleSwitch = () => {
    setToggled((previousState) => !previousState);
  };
  const handleSubmit = () => {
    // Do something with the user's input (e.g., save it to a variable or send it to a server)
    console.log('Tratamiento:', tratamineto,'Horario:', horario,'Notas:', notas);
    };
    return (
      <View style={styles.container}>
      <Text style={styles.labels}>Recordatorio de tratamiento</Text>
      <TextInput
        placeholder="Identificacion del recordatorio"
        style={styles.input}
        onChangeText={(input) => setTratamiento(input)}
        value={tratamineto}
      />
      <Text style={styles.labels}>Horario del tartamiento</Text>
      <TextInput
        placeholder="Hora"
        style={styles.input}
        onChangeText={(input) => setHorario(input)}
        value={horario}
      />
      <Text style={styles.labels}>Notas sobre el tratamiento</Text>
      <TextInput
        placeholder="Notas"
        style={styles.input}
        onChangeText={(input) => setNotas(input)}
        value={notas}
      />
      <Text style={styles.labels}>Alarma:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isToggled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isToggled}
      />
      <Text>{isToggled ? "Activada" : "No activada"}</Text>
      <Button
        title="Agregar recordatorio"
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