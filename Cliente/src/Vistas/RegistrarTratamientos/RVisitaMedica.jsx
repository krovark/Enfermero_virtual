import React, { useState } from 'react';
import { Text, StyleSheet, Switch, ScrollView, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import API_URL from '../../utils/fetchConfig'
import { useNavigation } from '@react-navigation/native';

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

  

  const handleSubmit = async () => {
    console.log('Visita medica:', visitaMedica, 'Fecha:', date, 'Hora:', time, 'Direccion:', direccion, 'Alarma:', isToggled);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/visitasmed/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          visita: visitaMedica,
          fecha: date.toISOString(),
          hora: time.toISOString(),
          direccion: direccion,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        Alert.alert(
          'Visita Médica Registrada',
          'La visita médica ha sido registrada exitosamente',
          [
            {
              text: "OK",
              onPress: () => {
                // Actualizar la lista de visitas médicas
                navigation.navigate('ListaVisitaMedica', { updateList: true });
              }
            }
          ]
        );
      } else {
        console.log(token);
        Alert.alert('Error', data.message || 'No se pudo registrar la visita médica');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar la visita médica');
    }
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