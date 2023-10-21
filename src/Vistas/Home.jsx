import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const HomeScreen = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'violet'}
      }}
    />
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