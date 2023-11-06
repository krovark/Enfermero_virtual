import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { ListItem } from 'react-native-elements';
import {Button} from 'react-native-paper';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

const HomeScreen = () => {
  const [selected, setSelected] = useState('');

  const buttonContainerStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
  }; 

  const buttonStyle = {
    margin: 15,
    padding: 15,
    fontSize: 18,
  };

  const tittleStyle={
    fontSize: 32,
    fontWeight: 'bold',
    textAlign:'center',
  };

  const subtittleStyle={
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'left',
  };

  const tratamientos = [
    {
      id:'001',
      nombre:'Tratamiento 1',
    },
    

    {
      id:'002',
      nombre:'Tratamiento 2',
    },
    
  ]

  return (
    <View style={{backgroundColor: 'blue'}}>
      <View style={{textAlign: 'center'}}>
        <Text style={tittleStyle}>SeguiMed</Text>
      </View>
      <View style={{textAlign: 'left'}}>
        <Text style={subtittleStyle}>Tratamientos</Text>
        <View style={styles.container}>
          <ListItem.Title style={styles.titleStyle}>{tratamientos.nombre}</ListItem.Title>
        </View>
      </View>

      <View style={{textAlign: 'left'}}>
        <Text style={subtittleStyle}>Alarmas</Text>
      </View>

      <View style={{textAlign: 'left'}}>
        <Text style={subtittleStyle}>Turnos Medicos</Text>
      </View>

      <View style={buttonContainerStyle}>
        <Button mode="contained" style={buttonStyle} buttonColor='red'>SOS</Button>

      </View>
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
  
  export default HomeScreen;