import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList,ImageBackground, Alert,ScrollView } from 'react-native';
import { IconButton, Card} from 'react-native-paper';


const HomeScreen = () => {
  const [selected, setSelected] = useState('');

  const container= {
    flexGrow: 1,
    padding: 35,
  };

  const inner= {
    flex: 1,
    padding: 30,
    backgroundColor: '#dcdcdc',
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 5,
    borderBlockColor: '#663399',
    gap: 5,
  };


  const tittleStyle={
    fontSize: 32,
    fontWeight: 'bold',
    textAlign:'center',
    color: 'white',
  };
  
  const subtittleStyle={
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'left',
    color: 'black',
  };

  const tratamientos = [
    {
      id:'001',
      nombre:'Tratamiento 1',
      tiempo:'24 min',
    },
    

    {
      id:'002',
      nombre:'Tratamiento 2',
      tiempo:'57 min',
    },
  ]
   
   const turnosMedicos = [
    { id: '001', nombre: 'Turno 1', fecha:'12/12/2023' },
    { id: '002', nombre: 'Turno 2', fecha:'08/05/2024' },
   ];


   return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/foto-gratis/vista-frontal-concepto-mala-costumbre_23-2148540815.jpg' }}
      style={styles.backgroundImage}
    > 
    <View
    style={container}
    >
    <View style={inner}>
      <View style={{textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.6)'}}>
        <Text style={tittleStyle}>SeguiMed</Text>
      </View>
        <Card>
        <Card.Title title="Tratamientos" />
        <Card.Content>
          <FlatList
            data={tratamientos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text style={{ color: 'black', marginVertical: 10, marginLeft:10, fontSize: 20 }}>{item.nombre}          {item.tiempo}</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gray' }} />}
          />
        </Card.Content>
        </Card>
  
        <Card>
        <Card.Title title="Turnos Medicos" />
        <Card.Content>
          <FlatList
            data={turnosMedicos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text style={{ color: 'black', marginVertical: 10, marginLeft:10, fontSize: 20 }}>{item.nombre}          {item.tiempo}</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gray' }} />}
          />
        </Card.Content>
        </Card>
      </View>
    </View>
    </ImageBackground>
  );
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  });
  
  export default HomeScreen;