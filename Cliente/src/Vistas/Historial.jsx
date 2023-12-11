import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/fetchConfig'


const Historial = (props) => {
    const [historial, setHistorial] = useState([]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');

            const apiUrl = `${API_URL}/historial/` + userId;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setHistorial(data.data.docs);
            } else {
                console.error('Error al obtener historial:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener historial:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getIconDetails = (item) => {
        if (item.status === true) {
            return {
                name: 'checkmark-outline',
                color: 'green',
            };
        } else {
            return {
                name: 'close-outline',
                color: 'red',
            };
        }
    };

    const renderItem = ({ item }) => {
        const result = getIconDetails(item);

        return (
            <View style={styles.container}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleStyle}>{item.action} {item.medicine}</ListItem.Title>
                        <ListItem.Subtitle>{item.date.toString()} {item.time.toString()}</ListItem.Subtitle>
                    </ListItem.Content>
                    {/* <Text>{item.status}</Text> */}
                    <Ionicons name={result.name} size={32} color={result.color} />
                </ListItem>
                <View style={styles.hairline} />
            </View>
        );
    };

    return (
        <FlatList
            data={historial}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hairline: {
        backgroundColor: '#888',
        height: 1,
        width: '100%',
    },
});

export default Historial;
