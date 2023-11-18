import React, { useState } from 'react';
import { Text, StyleSheet, Switch, ScrollView, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button, TextInput } from 'react-native-paper';


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
      extraHeight={50} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={styles.inner}>
            <TextInput
        label="Nombre:"
        style={styles.input}
        onChangeText={(input) => setVisitaMedica(input)}
        value={visitaMedica}
mode="outlined"
      />

        <Button mode="contained" style={styles.button} onPress={() => setShowPicker2(true)}>
          Fecha: {date.toLocaleDateString()}
        </Button>
        {showPicker2 && (
            <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange2}
            />
        )}
        
      <Button mode="contained" style={styles.button} onPress={() => setShowPicker(true)}>
          Hora: {time.toLocaleTimeString()}
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
        label="Direccion:"
        style={styles.input}
        multiline={true}
        onChangeText={(input) => setDireccion(input)}
        value={direccion}
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

export default VisitasMedicas;