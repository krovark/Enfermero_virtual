import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import validator from 'validator';
import Swiper from 'react-native-swiper';

const ResetPW = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEmailSubmit = () => {
        if (!validator.isEmail(email)) {
            Alert.alert('Error', 'Por favor, ingresa un email válido.');
            return;
        }
    
        
        fetch('http://192.168.0.103:4000/api/users/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => response.json())
        .then(data => {
            Alert.alert('Revisa tu correo', 'Si tu email está registrado, recibirás un token para cambiar tu contraseña.');
            console.log({email});
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // const handleEmailSubmit = () => {
    //     if (!validator.isEmail(email)) {
    //         Alert.alert('Error', 'Por favor, ingresa un email válido.');
    //         return;
    //     }
    
    //     fetch('http://192.168.0.103:4000/api/users/forgot-password', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email }),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Suponiendo que 'data' contiene el token en una propiedad 'token'
    //         if (data.token) {
    //             setToken(data.token); // Actualiza el estado 'token'
    //             Alert.alert('Token Generado', 'Usa el token para restablecer tu contraseña.');
    //         } else {
    //             Alert.alert('Revisa tu correo', 'Si tu email está registrado, recibirás un token para cambiar tu contraseña.');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // };

    const handlePasswordReset = () => {
        // Llamada al backend para restablecer la contraseña
        fetch('http://192.168.0.103:4000/api/users/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            Alert.alert('Éxito', 'Tu contraseña ha sido actualizada.');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.swiperContainer}>
        <Swiper style={styles.wrapper} showsButtons={false}>
            {/* Pantalla para ingresar el email */}
            <View style={styles.slide}>
                <Text style={styles.title}>Recuperar Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Ingresa tu email"
                    keyboardType="email-address"
                />
                <Button title="Enviar" onPress={handleEmailSubmit} />
            </View>

            {/* Pantalla para ingresar el token y la nueva contraseña */}
            <View style={styles.slide}>
                <Text style={styles.title}>Restablecer Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={token}
                    onChangeText={setToken}
                    placeholder="Ingresa el token"
                />
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Nueva Contraseña"
                    secureTextEntry
                />
                <Button title="Restablecer" onPress={handlePasswordReset} />
            </View>
                </Swiper>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20, // Añadir margen para evitar la superposición
    },
    swiperContainer: {
        marginTop: 50, // Añade un margen superior al swiper
        width: '100%', // Asegúrate de que el swiper ocupa todo el ancho
        height: 400,   // Ajusta la altura según sea necesario
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default ResetPW;
