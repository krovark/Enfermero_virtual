import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, Pressable, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton, Card, Button, Title} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListaVisitaMedica = () => {
  const data = [{
    id: 0,
    time: '17:30',
    date: '2023-10-31',
    description: 'Traumatologo',
    alarmNotifData: {
      id: 'efdfoiuad120983102',
    },
    status: true,
    isEnabled: true,
  }, {
    id: 1,
    time: '16:30',
    date: '2023-10-31',
    description: 'Dermatologo',
    action: '1 comprimido',
    alarmNotifData: {
      id: 'efdfoiuad120983102',
    },
    status: true,
    isEnabled: true,
  },]

  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState([true, false, true, true, false]);

  const toggleSwitch = (id, state) => {
    console.log('===')
    console.log(id)
    console.log(state)
    console.log(isEnabled)
    console.log('===')
    // isEnabled[id]=state
    // setIsEnabled(previousState => !previousState)
  }

return (
      <View style={styles.container}>
        
        <FlatList 
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item }) => (
        <Card contentStyle={styles.card}>
          <Card.Title title={item.description} subtitle={item.date}/>
        <Card.Content>
        </Card.Content>
        <Card.Actions>
          <Button>Borrar</Button>
        </Card.Actions>
        </Card>
        )}  />
        <View>
        <Button onPress={() => navigation.navigate('RegistroVisita')}> Agregar Visita Medica </Button>
        </View>
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
    justifyContent: "space-evenly",
    borderWidth: 5,
    borderBlockColor: '#663399',
    gap: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
  },
  hairline: {
    backgroundColor: '#888',
    height: 1,
    width: '100%',
  },
});

export default ListaVisitaMedica;