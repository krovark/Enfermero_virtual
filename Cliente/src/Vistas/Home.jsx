import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/fetchConfig';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const [tratamientos, setTratamientos] = useState([
    { id: '001', nombre: 'Tratamiento 1', tiempo: '24 min' },
    { id: '002', nombre: 'Tratamiento 2', tiempo: '57 min' },
  ]);
  const [turnosMedicos, setTurnosMedicos] = useState([]);

  const fetchTurnosMedicos = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/visitasmed/proximas-visitas`, {
        headers: {
          'x-access-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.data.length > 0) {
          setTurnosMedicos(data.data.map((item) => ({
            id: `turno${item._id}`,
            nombre: `${item.visita} - ${item.direccion}`,
            fecha: `${item.fecha} - ${item.hora}`,
            type: 'turnoMedico'
          })));
        } else {
          setTurnosMedicos([{ id: 'noTurnos', nombre: 'Sin citas programadas', type: 'turnoMedico' }]);
        }
      } else {
        throw new Error('Error al obtener los turnos médicos');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'No se pudieron obtener los turnos médicos');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTurnosMedicos();
    }, [])
  );

  const data = [
    { id: 'header1', type: 'header', title: 'Tratamientos' },
    ...tratamientos,
    { id: 'header2', type: 'header', title: 'Turnos Médicos' },
    ...turnosMedicos,
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
      resizeMode: 'cover',
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
