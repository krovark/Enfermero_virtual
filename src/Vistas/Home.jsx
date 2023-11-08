import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList,ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { IconButton} from 'react-native-paper';

const HomeScreen = () => {
  const [selected, setSelected] = useState('');

  const tittleStyle={
    fontSize: 32,
    fontWeight: 'bold',
    textAlign:'center',
    color: 'white',
    paddingHorizontal: 10,
  };
  
  const subtittleStyle={
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'left',
    color: 'black',
    paddingHorizontal: 10,
  };

  const tratamientos = [
    {
      id:'001',
      nombre:'Tratamiento 1',
    },
    

    {
      id:'002',
      nombre:'Tratamiento 2',
    },
  ]
  
  const alarmas = [
    { id: '001', nombre: 'Alarma 1' },
    { id: '002', nombre: 'Alarma 2' },
   ];
   
   const turnosMedicos = [
    { id: '001', nombre: 'Turno 1' },
    { id: '002', nombre: 'Turno 2' },
   ];


   return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/foto-gratis/vista-frontal-concepto-mala-costumbre_23-2148540815.jpg' }}
      style={styles.backgroundImage}
    > 
      <View style={{textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.6)'}}>
        <Text style={tittleStyle}>SeguiMed</Text>
      </View>
  
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop:210 }}>
        <View style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: 5, marginBottom: 5 }}>
          <Text style={subtittleStyle}>Tratamientos</Text>
          <FlatList
            data={tratamientos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text style={{ color: 'black', marginVertical: 10, marginLeft:10, fontSize: 20 }}>{item.nombre}</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gray' }} />}
          />
        </View>
  
        <View style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: 5, marginBottom: 5 }}>
          <Text style={subtittleStyle}>Alarmas</Text>
          <FlatList
            data={alarmas}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text style={{ color: 'black', marginVertical: 10, marginLeft:10, fontSize: 20 }}>{item.nombre}</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gray' }} />}
          />
        </View>
  
        <View style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: 5, marginBottom: 5 }}>
          <Text style={subtittleStyle}>Turnos Médicos</Text>
          <FlatList
            data={turnosMedicos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text style={{ color: 'black', marginVertical: 10, marginLeft:10, fontSize: 20 }}>{item.nombre}</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gray' }} />}
          />
        </View>
      </View>
  
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <IconButton
            icon={(props) => <Icon {...props} name="phone" color="red" size={45}/>}
            size={50}
            color="white"
            onPress={() => console.log('Pressed')}
          />
          <Text style={{color: 'black', fontSize: 20, marginBottom: 5}}>SOS</Text>
        </View>
      </View>
    </ImageBackground>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  });
  
  export default HomeScreen;