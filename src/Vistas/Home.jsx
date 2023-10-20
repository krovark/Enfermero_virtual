import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [Fecha, setFecha] = useState(new Date());

  const [minDate, setMinDate] = useState (new Date());

    return (
      <>
        <DatePicker 
        selected={Fecha} 
        showPreviousMonths
        monthsShown={2}
        minDate={minDate}
        withPortal

        />
      </>
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