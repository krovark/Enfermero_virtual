import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Modal, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity   } from 'react-native';
import { IconButton, Avatar, TextInput, Button, HelperText  } from 'react-native-paper';
import ProfileImg from '../../assets/Avatar.png'
import PhoneInput from 'react-native-phone-input';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import API_URL from '../utils/fetchConfig'



const Perfil = () => {
    const [name, setName] = useState("");
    const [edad, setEdad] = useState("");
    const [phone, setPhone] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [emergencyContact, setEmergencyContact] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [profileImage, setProfileImage] = useState(ProfileImg);
    const [isEditable, setIsEditable] = useState(false); // Nuevo estado

    useEffect(() => {
        const fetchProfile = async () => {
            
            try {
                const token = await AsyncStorage.getItem('userToken');
                
                const response = await fetch(`${API_URL}/users/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });
                
                if (!response.ok) {
                    const errorData = await response.text();
                   
                    console.error('Error en la respuesta del servidor:', errorData.message);
                    Alert.alert('Error', errorData || 'Ocurrió un error al obtener el perfil');
                    return;
                }
    
                const data = await response.json();
                console.log("Data de la API:", data);
                
                    setName(data.data.perfil.nombre + " " + data.data.perfil.apellido);
                    setEdad(data.data.perfil.edad?.toString() || '');
                    setPhone(data.data.perfil.telefono || '');
                    setBloodType(data.data.perfil.sangreTipo || '');
                    setPeso(data.data.perfil.peso?.toString() || '');
                    setAltura(data.data.perfil.altura?.toString() || '');
                    setEmergencyContact(data.data.perfil.c_emergencia || '');
                    
                
            } catch (error) {
                console.error('Error en la respuesta del servidor:', error);
                Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
            }
        };
    
        fetchProfile();
    }, []);

    useEffect(() => {
        if (phoneRef.current) {
            phoneRef.current.setValue(phone);
        }
    }, [phone]);

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };

    const takePhoto = async () => {
        
        if (!isEditable) {
          
          return;
        }
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();


    if (cameraPermission.status !== 'granted') {
        Alert.alert("Permiso necesario", "Es necesario el permiso para acceder a las fotos.");
        return;
      }

      let result = await ImagePicker.launchCameraAsync ({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        setProfileImage({ uri: result.assets[0].uri });
      }
    };

    const getTextInputStyle = (isEditable) => {
        return isEditable ? styles.input : styles.inputDisabled;
    };
    const phoneRef = useRef(null);
    const phoneNumber = phoneRef.current ? phoneRef.current.getValue() : "";

   
    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId'); // Asumiendo que guardas el ID del usuario
            
            const perfilToUpdate = {
                telefono: phone,
                sangreTipo: bloodType,
                peso: parseFloat(peso), // Convierte el peso a un número
                altura: parseInt(altura, 10), // Convierte la altura a un entero
                c_emergencia: emergencyContact
            };


            const response = await fetch(`${API_URL}/users/${userId}/update`, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ perfil: perfilToUpdate })
            });
    
            
            if (response.ok) {
                const data = await response.json();
                Alert.alert('Éxito', 'Perfil actualizado correctamente');
                
            } else {
                const errorData = await response.text();
                console.error('Error en la respuesta del servidor:', errorData);
                Alert.alert('Error', errorData || 'Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
        }
        setIsEditable(false); 
    };



    return (

        <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={{flex: 1}}
>
    <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                {/* <IconButton icon="pencil" size={20} onPress={toggleEditable} /> */}
                {!isEditable && <IconButton icon="pencil" size={20} onPress={toggleEditable} />}
                </View>
            <View style={styles.avatarSection}>
                {/* <Avatar.Image size={130} source={ProfileImg} /> */}
                <TouchableOpacity onPress={takePhoto} disabled={!isEditable}>
                <Avatar.Image size={130} source={profileImage} />
                </TouchableOpacity>


                <Text style={styles.nombre_edad}>
                    {name},{edad}
                
                </Text>
            </View>
            

            <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
                <View pointerEvents={isEditable ? 'auto' : 'none'}>
                    <PhoneInput
                        ref={phoneRef}               
                        initialCountry='ar' // Por defecto Argentina, puedes cambiarlo
                        value={phone}
                        onChangePhoneNumber={setPhone}
                        style={isEditable ? styles.phoneInputContainer : styles.phoneInputDisabled}
                    />
                </View>
            </TouchableWithoutFeedback>

            <TextInput
                label="Tipo de sangre"
                value={bloodType}
                onChangeText={setBloodType}
                // style={styles.input}
                editable={isEditable}
                style={isEditable ? styles.input : styles.inputDisabled} // Estilo condicional aquí
            />

            <TextInput
                label="Peso"
                value={peso}
                onChangeText={setPeso}
                // style={styles.input}
                keyboardType="numeric"
                placeholder='kgs'
                editable={isEditable}
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
                editable={isEditable}
            />


            <TextInput
                label="Contacto de emergencia"
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                // style={styles.input}
                style={isEditable ? styles.input : styles.inputDisabled} // Estilo condicional aquí
                editable={isEditable}
            />

            {
        isEditable && (
        <Button mode="contained" onPress={handleUpdate}>
            Actualizar Perfil
        </Button>
                )
            }
              </View>

              <TouchableOpacity
        style={styles.checkboxBase}
        onPress={() => setSelection(!isSelected)}
      >
        {isSelected && <View style={styles.checkboxChecked} />}
        
      </TouchableOpacity>

      <Text style={styles.label}> Emails recordatorios</Text>

              <View style={{ height: 70 }} />
        </ScrollView>
        
        </KeyboardAvoidingView>
    );
};
  
const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:  '#dcdcdc',
        
    },
    cardContainer: { // Estilo del contenedor de tarjeta
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',  // Color de fondo blanco para la tarjeta
        elevation: 5,  // Da la sensación de elevación
        margin: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2
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
    nombre_edad:{

        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10


    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white', // para que el fondo del TextInput sea blanco
        borderRadius: 5,          // bordes redondeados para el TextInput
        elevation: 2,             // sombra para darle un poco de elevación al TextInput
        paddingHorizontal: 12,
    },

    phoneInputContainer: {
        marginBottom: 15,
        backgroundColor: 'white',  // Color de fondo blanco para el TextInput
        borderRadius: 5,          // bordes redondeados para el TextInput
        elevation: 2,             // sombra para darle un poco de elevación al TextInput
        paddingHorizontal: 12,
        height: 56,               // height similar to TextInput's default
    },

    phoneInputDisabled: {
    
        marginBottom: 15,
        backgroundColor: '#848689', // Color gris claro para el fondo
        opacity:0.3,
        borderRadius: 5,          // bordes redondeados para el TextInput
        elevation: 2,             // sombra para darle un poco de elevación al TextInput
        paddingHorizontal: 12,
        height: 56,

    },
    inputDisabled: {
    marginBottom: 15,
    backgroundColor: '#848689', // Color gris claro para el fondo
    opacity:0.3,
    borderRadius: 5,
    elevation: 2,
    paddingHorizontal: 12,
    },

    button: {
        marginTop: 20,
       backgroundColor: '#6200EE', // Color principal para el botón
       // backgroundColor: '#0097B2', // Color principal para el botón
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
    },

    checkboxBase: {
        marginTop: 20,
        marginLeft: 10,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'coral',
        backgroundColor: 'transparent',
        borderRadius: 4,
        marginRight: 8,
      },
      checkboxChecked: {
        width: 12,
        height: 12,
        backgroundColor: 'coral',
      },

      label:{

        marginTop: 7,
        marginLeft: 7,
        color: 'purple'

      },
});
  
  export default Perfil;