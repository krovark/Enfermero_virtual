import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import validator from 'validator';

const ResetPW = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (!validator.isEmail(email)) {
            Alert.alert('Error', 'Por favor, ingresa un email válido.');
            return;
        }

        // Aquí añadirías la lógica para enviar el email al backend
        // Por ejemplo, usando axios o fetch para enviar el email
        // El backend enviaría el token al email del usuario

        Alert.alert('Revisa tu correo', 'Si tu email está registrado, recibirás un token para cambiar tu contraseña.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Ingresa tu email"
                keyboardType="email-address"
            />
            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
};

// Estilos para el componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default ResetPW;