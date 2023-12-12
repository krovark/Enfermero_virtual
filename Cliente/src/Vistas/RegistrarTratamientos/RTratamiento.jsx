import React, { useState } from 'react';
import { Text, StyleSheet, Switch, ScrollView, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button, TextInput } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

const Tratamientos = () => {
  const [tratamiento, setTratamiento] = useState(''); // State to hold the input text
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
  const [tomas, setTomas] = useState('');
  const [dosis, setDosis] = useState('');

  const handleSubmit = () => {
   

    console.log('Tratamiento:', tratamiento,"Dosis:", dosis, 'Horario:', time, 'Notas:', notas, 'Alarma:', isToggled, 'Intervalo:', horas, "Cantidad de tomas:", tomas );
  if (isToggled) {
    const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
    content: {
      title: tratamiento,
      body: notas,
    },
    trigger: { date: time },
    });
  }
  triggerNotifications();
  }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={50} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={styles.inner}>
      <TextInput
        label="Tratamiento"
        style={styles.input}
        onChangeText={(input) => setTratamiento(input)}
        value={tratamiento}
        mode="outlined"
      />

<TextInput
        label="Dosis"
        style={styles.input}
        onChangeText={(input) => setDosis(input)}
        value={dosis}
        mode="outlined"
      />

      <Button mode="contained" style={styles.button} onPress={() => setShowPicker(true)}>
        Hora de inicio: {time.toLocaleTimeString()}
      </Button>
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}

      <TextInput
        label="Intervalo de tomas en horas"
        style={styles.input}
        value={horas}
        onChangeText={(input) => setHoras(input)}
        keyboardType="numeric"
        mode="outlined"
      />

<TextInput
        label="Cantidad de tomas "
        style={styles.input}
        value={tomas}
        onChangeText={(input) => setTomas(input)}
        keyboardType="numeric"
        mode="outlined"
      />

      <TextInput
        label="Descripcion:"
        style={styles.input}
        multiline={true}
        onChangeText={(input) => setNotas(input)}
        value={notas}
        mode="outlined"
      />
      <View style={styles.row}>
        <Text style={styles.labels}>Alarma:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isToggled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isToggled}
        />
      </View>

      <Button
        mode="contained" 
        style={styles.button}
        onPress={handleSubmit}
      >
      Agregar tratamiento
      </Button>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 35,
  },

  inner: {
    flex: 1,
    padding: 30,
    backgroundColor: '#dcdcdc',
    justifyContent: "space-evenly",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 5,
    borderBlockColor: '#663399',
    gap: 5,
  },

  tratamientos_container: {
    margin: 15,
  },

  button: {
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    marginBottom: 10,
  },

  labels: {
    fontSize: 16,
    padding: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Tratamientos;


