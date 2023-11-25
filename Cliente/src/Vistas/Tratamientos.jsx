import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, Pressable, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton, Card, Button, Title} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListaTratamientos = () => {
  const navigation = useNavigation();
  const [tratamientos, setTratamientos] = useState([]);
  const [isEnabled, setIsEnabled] = useState([]);

  const fetchTratamientos = async () => {
    try {
      // Replace with your AsyncStorage logic to get user token and ID
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      const apiUrl = 'http://192.168.0.103:4000/api/tratamiento/' + userId;

      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json',
        },
    });

      if (response.ok) {
        const result = await response.json();
        setTratamientos(result.data.docs);
        setIsEnabled(result.data.docs.map((item) => item.isEnabled));
      } else {
        console.error('Error al obtener tratamientos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener tratamientos:', error.message);
    }
  };

  useEffect(() => {
    fetchTratamientos();
  }, []);

  const toggleSwitch = async (id, state) => {
    const updatedEnabled = [...isEnabled];
    updatedEnabled[id] = state;
    setIsEnabled(updatedEnabled);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tratamientos}
        keyExtractor={(item) => item._id.toString()} // Assuming _id is the unique identifier
        renderItem={({ item, index }) => (
          <Card contentStyle={styles.card}>
            <Card.Title title={item.medicamento} subtitle={new Date(item.fechaInicio).toDateString()} />
            <Card.Content>
              <Text>Dosis: {item.dosis}</Text>
              <Text>Recurrencia: {item.recurrencia}</Text>
              <Text>Duración: {item.duracion} días</Text>
              {item.hastaCuando && <Text>Hasta: {new Date(item.hastaCuando).toDateString()}</Text>}
            </Card.Content>
            <Card.Actions>
              <Switch
                value={isEnabled[index]}
                onValueChange={(value) => toggleSwitch(index, value)}
              />
              <Button onPress={() => navigation.navigate('Tratamientos')}>
                Borrar
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      <View>
        <Button onPress={() => navigation.navigate('RegistroTratamiento')}>
          Agregar Tratamiento
        </Button>
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
});

export default ListaTratamientos;
