import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Button} from 'react-native-paper';

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

  return (
    <View>
      <Calendar

        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350
        }}

        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e000'
        }}

        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'violet'}
        }}
      />
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