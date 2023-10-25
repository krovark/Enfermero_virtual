import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button  } from 'react-native';

const Tratamientos = () => {
  const [text, setText] = useState(''); // State to hold the input text

  const handleSubmit = () => {
    // Do something with the user's input (e.g., save it to a variable or send it to a server)
    console.log('User input:', text);
    };
    return (
      <View>
      <Text>Recordatorio de tratamiento</Text>
      <TextInput
        label="Tratamiento"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(input) => setText(input)}
        value={text}
      />
      <Text>Horario</Text>
      <TextInput
        label="Horario"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(input) => setText(input)}
        value={text}
      />
      <Text>Notas</Text>
      <TextInput
        label="Notas"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(input) => setText(input)}
        value={text}
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
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default Tratamientos;