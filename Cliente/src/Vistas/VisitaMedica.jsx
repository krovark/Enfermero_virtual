import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/fetchConfig';
import { useNavigation } from '@react-navigation/native';

const ListaVisitaMedica = () => {
  const [visitasMedicas, setVisitasMedicas] = useState([]);
  const navigation = useNavigation();
  

  const fetchVisitasMedicas = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/visitasmed/visitasmed`, {
        headers: {
          'x-access-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVisitasMedicas(data.data.docs);
      } else {
        throw new Error('Error al obtener las visitas médicas');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchVisitasMedicas(); // Ejecutar al montar el componente

    const unsubscribe = navigation.addListener('focus', () => {
      fetchVisitasMedicas(); // Ejecutar cuando la pantalla obtenga el foco
    });

    return unsubscribe; // Limpiar el listener al desmontar el componente
  }, [navigation]);

  const borrarVisitaMedica = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/visitasmed/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      });

      if (response.ok) {
        Alert.alert('Visita Médica Borrada', 'La visita médica ha sido borrada exitosamente');
        setVisitasMedicas(visitasMedicas.filter((visita) => visita._id !== id));
      } else {
        throw new Error('Error al borrar la visita médica');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visitasMedicas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.visita} subtitle={`${item.fecha} - ${item.hora}`} />
            <Card.Content>
              <Text>{item.direccion}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => borrarVisitaMedica(item._id)}>Borrar</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <View>
        <Button onPress={() => navigation.navigate('RegistroVisita')}>Agregar Visita Médica</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#663399',
  },
});

export default ListaVisitaMedica;
