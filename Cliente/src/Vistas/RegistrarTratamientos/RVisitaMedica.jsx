import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, Switch, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


const VisitasMedicas = () => {
  const [visitaMedica, setVisitaMedica] = useState(''); // State to hold the input text
  const [direccion, setDireccion] = useState('');
  const [isToggled, setToggled] = useState(false);
  const toggleSwitch = () => {
    setToggled((previousState) => !previousState);
  };
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setShowPicker(false);
      setTime(selectedTime);
    }
  };

  const onChange2 = (event, selectedTime) => {
    if (selectedTime) {
      setShowPicker2(false);
      setDate(selectedTime);
    }
  };

  const handleSubmit = () => {
    // Do something with the user's input (e.g., save it to a variable or send it to a server)
    console.log('Visita medica:', visitaMedica,'Fecha: ', date, 'Hora:', time, 'Direccion:', direccion, 'Alarma:', isToggled);
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={100} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={styles.inner}>
      <Text style={styles.labels}>Visita medica:</Text>
      <TextInput
        placeholder="e.g., Cita con el Traumatologo"
        style={styles.input}
        onChangeText={(input) => setVisitaMedica(input)}
        value={visitaMedica}
      />

        <Text style={styles.labels}>Horario de la cita:</Text>
        <Button title="Seleccionar fecha" onPress={() => setShowPicker2(true)} />
        {showPicker2 && (
            <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange2}
            />
        )}
        <Text style={styles.labels}>Fecha seleccionada: {date.toLocaleDateString()}</Text>

      <Text style={styles.labels}>Horario de la cita:</Text>
      <Button title="Seleccionar hora" onPress={() => setShowPicker(true)} />
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

      <Text style={styles.labels}>Direccion:</Text>
      <TextInput
        placeholder="e.g., Hospital Facultad de Medicina, piso 2, consultorio d"
        style={styles.input}
        multiline={true}
        onChangeText={(input) => setDireccion(input)}
        value={direccion}
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
        title="Agregar visita medica"
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

export default VisitasMedicas;