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

  const titleStyle={
    fontSize: 32,
    fontWeight: 'bold',
    textAlign:'center',
  };

  const subtitleStyle={
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'left',
  };

  const tratamientos = [
    {
      id:'001',
      nombre:'Tratamiento 1',
      medicine:'Artamina',
      action: '50 mg',
      status: true,
      isEnabled: true,
    },
  

    {
      id:'002',
      nombre:'Tratamiento 2',
      medicine:'Propanelida',
      action: '1 comprimido',
      status: true,
      isEnabled: true,
    },
    
  ]

  return (
    <View style={{backgroundColor: 'grey'}}>
      <View style={{textAlign: 'center'}}>
        <Text style={titleStyle}>SeguiMed</Text>
      </View>
      <View style={{textAlign: 'left'}}>
        <Text style={subtitleStyle}>Tratamientos</Text>
        <View style={styles.container}>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title style={titleStyle}>{tratamientos.action} {tratamientos.medicine}</ListItem.Title>
              
             </ListItem.Content>
            <Text>{tratamientos.status}</Text>

          </ListItem>
         <View style={styles.hairline} />
        </View>
      </View>

      <View style={{textAlign: 'left'}}>
        <Text style={subtitleStyle}>Alarmas</Text>
      </View>

      <View style={{textAlign: 'left'}}>
        <Text style={subtitleStyle}>Turnos Medicos</Text>
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
    },
    hairline: {
      backgroundColor: '#888',
      height: 1,
      width: '100%',
    }
  });
  
  export default HomeScreen;