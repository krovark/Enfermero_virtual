import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/fetchConfig';
import { useFocusEffect } from '@react-navigation/native';

const Historial = () => {
    const [historial, setHistorial] = useState([]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const apiUrl = `${API_URL}/tratamiento/historial`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setHistorial(data.data);
            } else {
                console.error('Error al obtener historial:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener historial:', error.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (historial.length === 0) {
        return <Text style={styles.noDataText}>Aún no hay tratamientos finalizados.</Text>;
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.titleStyle}>{item.medicamento}</ListItem.Title>
                    <ListItem.Subtitle>{`Finalizado el: ${item.hastaCuando}`}</ListItem.Subtitle>
                </ListItem.Content>
                <Ionicons name="checkmark-outline" size={32} color="green" />
            </ListItem>
        );
    };

    return (
        <FlatList
            data={historial}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noDataText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    hairline: {
        backgroundColor: '#888',
        height: 1,
        width: '100%',
    },
});

export default Historial;
