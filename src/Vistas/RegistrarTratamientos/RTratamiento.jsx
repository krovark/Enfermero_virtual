import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, Switch, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


const Tratamientos = () => {
  const [tratamineto, setTratamiento] = useState(''); // State to hold the input text
  const [notas, setNotas] = useState('');
  const [isToggled, setToggled] = useState(false);
  const toggleSwitch = () => {
    setToggled((previousState) => !previousState);
  };
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setShowPicker(false);
      setTime(selectedTime);
    }
  };
  const [horas, setHoras] = useState('');

  const handleSubmit = () => {
    // Do something with the user's input (e.g., save it to a variable or send it to a server)
    console.log('Tratamiento:', tratamineto, 'Horario:', time, 'Notas:', notas, 'Alarma:', isToggled, 'Frecuencia:', horas);
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={100} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={styles.inner}>
      <Text style={styles.labels}>Identificacion del tratamiento:</Text>
      <TextInput
        placeholder="e.g., Pastillas para la tension"
        style={styles.input}
        onChangeText={(input) => setTratamiento(input)}
        value={tratamineto}
      />

      <Text style={styles.labels}>Horario del tartamiento:</Text>
      <Button title="Seleccionar horario inicial" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={styles.labels}>Horario seleccionado: {time.toLocaleTimeString()}</Text>

      <Text>Frecuencia del tratamiento en horas:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 6"
        value={horas}
        onChangeText={(input) => setHoras(input)}
        keyboardType="numeric" // Display a numeric keyboard
      />

      <Text style={styles.labels}>Notas sobre el tratamiento:</Text>
      <TextInput
        placeholder="e.g., Pastillas de color azul"
        style={styles.input}
        multiline={true}
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
      <Button
        title="Agregar tratamiento"
        onPress={handleSubmit}
      />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },

  inner: {
    flex: 1,
    padding: 20,
    backgroundColor: '#dcdcdc',
    justifyContent: "flex-end",
  },

  tratamientos_container: {
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



  labels: {
    fontSize: 16,
    padding: 10,
  },
});

export default Tratamientos;