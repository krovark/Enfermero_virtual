import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/fetchConfig';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const [proximosTratamientos, setProximosTratamientos] = useState([]);
  const [turnosMedicos, setTurnosMedicos] = useState([]);

  const fetchProximosTratamientos = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/tratamiento/proximos-tratamientos`, {
        headers: {
          'x-access-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.data.length > 0) {
          setProximosTratamientos(data.data);
        } else {
          setProximosTratamientos([]);
        }
      } else {
        throw new Error('Error al obtener los próximos tratamientos');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'No se pudieron obtener los próximos tratamientos');
    }
  };

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
      fetchProximosTratamientos();
      fetchTurnosMedicos();
    }, [])
  );

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      // return <Text style={styles.header}>{item.title}</Text>;
      return <Text style={[styles.header, styles.headerTitle]}>{item.title}</Text>;
    } else if (item.type === 'tratamiento') {
      return (
        <Card style={styles.card}>
          <Card.Title 
          title={`${item.medicamento} - ${item.dosis}`} titleStyle={styles.tratamientoTitle} />
          <Card.Content>
            <Text>Hasta: {item.hastaCuando}</Text>
            <Text>Tomas restantes: {item.tomasRestantes}</Text>
            <Text>{item.notas}</Text>
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.nombre}</Text>
          <Text style={styles.cardSubtitle}>{item.fecha}</Text>
        </View>
      );
    }
  };

  const data = [
    { id: 'header1', type: 'header', title: 'Próximos Tratamientos' },
    ...proximosTratamientos.map(tratamiento => ({ ...tratamiento, type: 'tratamiento', key: `tratamiento-${tratamiento._id}` })),
    { id: 'header2', type: 'header', title: 'Turnos Médicos' },
    ...turnosMedicos.map(turno => ({ ...turno, key: `turno-${turno.id}` })),
  ];

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
      padding: 7,
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
    tratamientoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333', 
    },
  });

  return (
    // <ImageBackground source={require('../../assets/home.png')} style={styles.backgroundImage}>
    <ImageBackground source={require('../../assets/FA.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.key}
          renderItem={renderItem}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
