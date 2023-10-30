import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, Pressable } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';

const Historial = (props) => {
  const item = [{
    id: 0,
    time: '17:30',
    date: '2023-10-31',
    medicine: 'Amoxidal 500',
    action: '1 comprimido',
    alarmNotifData: {
      id: 'efdfoiuad120983102',
    },
    status: true,
    isEnabled: true,
  }, {
    id: 1,
    time: '16:30',
    date: '2023-10-31',
    medicine: 'Diclofenac',
    action: '1 comprimido',
    alarmNotifData: {
      id: 'efdfoiuad120983102',
    },
    status: true,
    isEnabled: true,
  }, {
    id: 2,
    time: '14:30',
    date: '2023-10-31',
    medicine: 'Paracetamol',
    action: '1 comprimido',
    alarmNotifData: {
      id: 'efdfoiuad120983102',
    },
    status: false,
    isEnabled: true,
  }, {
    id: 3,
    time: '16:30',
    date: '2023-10-31',
    medicine: 'Diclofenac',
    action: '1 comprimido',
    alarmNotifData: {
      id: 'efdfoiuad120983102',
    },
    status: true,
    isEnabled: true,
  }, {
    id: 4,
    time: '14:30',
    date: '2023-10-31',
    medicine: 'Paracetamol',
    action: '1 comprimido',
    alarmNotifData: {
      id: 'efdfoiuad120983102',
    },
    status: false,
    isEnabled: true,
  }]
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

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => {
    if (item.status === true) {
      result = {
        name: 'checkmark-outline',
        color: 'green',
      }
    } else {
      result = {
        name: 'close-outline',
        color: 'red',
      }
    }
    return (
      <View style={styles.container}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.titleStyle}>{item.action} {item.medicine}</ListItem.Title>
            <ListItem.Subtitle>{item.date.toString()} {item.time.toString()}</ListItem.Subtitle>
          </ListItem.Content>

          {/* <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              console.log(item.value);
              props.delete(item.value);
              PushNotification.cancelLocalNotification(item.alarmNotifData.id);
              console.log("Alarm Deleted with ID: " + item.alarmNotifData.id);
            }}> */}
            <Text>{item.status}</Text>
            <Ionicons name={result.name} size={32} color={result.color} />
            {/* <Switch
              trackColor={{ false: 'grey', true: 'tomato' }}
              thumbColor={isEnabled[item.id] ? '#f4f3f4' : 'f4f3f4'}
              ios_backgroundColor='grey'
              onClick={toggleSwitch(item.id, isEnabled[item.id])}
              value={isEnabled[item.id]}
            /> */}
          {/* </Pressable> */}
        </ListItem>
        <View style={styles.hairline} />
      </View>
    );
  }
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={item}
      renderItem={renderItem} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hairline: {
    backgroundColor: '#888',
    height: 1,
    width: '100%',
  }
});

export default Historial;