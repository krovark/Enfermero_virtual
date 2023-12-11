import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground  } from 'react-native';
import { Card } from 'react-native-paper';





const HomeScreen = () => {
  const tratamientos = [
    { id: '001', nombre: 'Tratamiento 1', tiempo: '24 min' },
    { id: '002', nombre: 'Tratamiento 2', tiempo: '57 min' },
  ];

  const turnosMedicos = [
    { id: '003', nombre: 'Turno 1', fecha: '12/12/2023' },
    { id: '004', nombre: 'Turno 2', fecha: '08/05/2024' },
  ];

  const data = [
    { id: 'header1', type: 'header', title: 'Tratamientos' },
    ...tratamientos.map(item => ({ ...item, type: 'tratamiento' })),
    { id: 'header2', type: 'header', title: 'Turnos Médicos' },
    ...turnosMedicos.map(item => ({ ...item, type: 'turnoMedico' })),
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.header}>{item.title}</Text>;
    }
    return (
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardSubtitle}>{item.tiempo || item.fecha}</Text>
      </View>
     
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      
    },

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // O 'stretch'
    },
  

    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
      color: 'black',
      
    },
    card: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 15,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      margin: 3,
    },
    cardSubtitle: {
      fontSize: 16,
      color: '#666',
      marginTop: 6,
    },
  });

  return (
    <ImageBackground source={require('../../assets/home.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
    </ImageBackground>
  );
};

export default HomeScreen;