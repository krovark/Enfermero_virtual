import React , { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, ScrollView, KeyboardAvoidingView, Platform  } from 'react-native';
import { IconButton, Avatar, TextInput, Button, HelperText  } from 'react-native-paper';
import ProfileImg from '../../assets/Avatar.png'



const Perfil = () => {
    const [name, setName] = useState("Itunuoluwa Abidoye, 45");
    const [location, setLocation] = useState("Formosa, Argentina");
    const [phone, setPhone] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [emergencyContact, setEmergencyContact] = useState("");

  
    const [isEditable, setIsEditable] = useState(false); // Nuevo estado

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };

    const getTextInputStyle = (isEditable) => {
        return isEditable ? styles.input : styles.inputDisabled;
    };

    return (

        <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? 0 : 0}
    style={{flex: 1}}
>
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="pencil" size={24} onPress={toggleEditable} />
                </View>
            <View style={styles.avatarSection}>
                <Avatar.Image size={130} source={ProfileImg} />
                
                
                <TextInput
                    label="Nombre y Edad"
                    editable = {false}
                    value={name}
                    onChangeText={setName}
                    style={styles.name}
                />
            </View>
            
            <TextInput
                label="Ubicación"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
                editable={isEditable}
            />
            
            <TextInput
                label="Número de teléfono"
                value={phone}
                onChangeText={setPhone}
                // style={styles.input}
                // editable={isEditable}
                style={isEditable ? styles.input : styles.inputDisabled} // Estilo condicional aquí
            />

            <TextInput
                label="Tipo de sangre"
                value={bloodType}
                onChangeText={setBloodType}
                // style={styles.input}
                // editable={isEditable}
                style={isEditable ? styles.input : styles.inputDisabled} // Estilo condicional aquí
            />

            <TextInput
                label="Peso"
                value={peso}
                onChangeText={setPeso}
                // style={styles.input}
                keyboardType="numeric"
                placeholder='kgs'
                // editable={isEditable}
                style={isEditable ? styles.input : styles.inputDisabled} // Estilo condicional aquí
            />
               
            <TextInput
                label="Altura"
                value={altura}
                onChangeText={setAltura}
                // style={styles.input}
                style={isEditable ? styles.input : styles.inputDisabled} // Estilo condicional aquí
                keyboardType="numeric"
                placeholder='centímetros'
                // editable={isEditable}
            />

           


            <TextInput
                label="Contacto de emergencia"
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                // style={styles.input}
                style={isEditable ? styles.input : styles.inputDisabled} // Estilo condicional aquí
                // editable={isEditable}
            />

            {/* <Button mode="contained" onPress={() => { }}>
                Update Profile
            </Button> */}

            {
        isEditable && (
        <Button mode="contained" onPress={() => { /* Acción para actualizar el perfil */ }}>
            Actualizar Perfil
        </Button>
                )
            }
        </ScrollView>
        </KeyboardAvoidingView>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
    name: {
        marginBottom: 15,
        backgroundColor: 'white', // para que el fondo del TextInput sea blanco
        borderRadius: 5,          // bordes redondeados para el TextInput
        elevation: 2,             // sombra para darle un poco de elevación al TextInput
        paddingHorizontal: 12,

    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white', // para que el fondo del TextInput sea blanco
        borderRadius: 5,          // bordes redondeados para el TextInput
        elevation: 2,             // sombra para darle un poco de elevación al TextInput
        paddingHorizontal: 12,
    },

    inputDisabled: {
    marginBottom: 15,
    backgroundColor: '#E0E0E0', // Color gris claro para el fondo
    borderRadius: 5,
    elevation: 2,
    paddingHorizontal: 12,
    },

    button: {
        marginTop: 20,
        backgroundColor: '#6200EE', // Color principal para el botón
        borderRadius: 5,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});
  
  export default Perfil;