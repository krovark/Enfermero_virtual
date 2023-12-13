import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/fetchConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ListaTratamientos = () => {
  const navigation = useNavigation();
  const [tratamientos, setTratamientos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchTratamientos = async () => {
    setIsFetching(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const apiUrl = `${API_URL}/tratamiento/tratamientos`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setTratamientos(result.data);
      } else {
        console.error('Error al obtener tratamientos:', response.statusText);
        setTratamientos([]); // Asegúrate de reiniciar el estado si hay un error
      }
    } catch (error) {
      console.error('Error al obtener tratamientos:', error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTratamientos();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isFetching ? (
        <Text style={styles.loadingText}>Cargando tratamientos...</Text>
      ) : tratamientos.length === 0 ? (
        <Text style={styles.noDataText}>Aún no hay tratamientos cargados.</Text>
      ) : (
        <FlatList
          data={tratamientos}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={item.medicamento} subtitle={new Date(item.fechaInicio).toDateString()} />
              <Card.Content>
                <Text>Horario: {item.horarioToma}</Text>
                <Text>Dosis: {item.dosis}</Text>
                <Text>Intervalo: {item.intervalo} horas</Text>
                <Text>Tomas: {item.tomas}</Text>
                <Text>Notas: {item.notas}</Text>
                {item.hastaCuando && <Text>Hasta: {new Date(item.hastaCuando).toLocaleDateString()}</Text>}
              </Card.Content>
            </Card>
          )}
        />
      )}
      <Button onPress={() => navigation.navigate('RegistroTratamiento')}>
        Agregar Tratamiento
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    flex: 1,
    justifyContent: 'space-evenly',
    borderWidth: 5,
    borderBlockColor: '#663399',
    gap: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ListaTratamientos;
