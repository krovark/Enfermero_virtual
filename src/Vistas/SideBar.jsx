
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import { Drawer as PaperDrawer, Searchbar, IconButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Vistas/Home';
import Perfil from '../Vistas/Perfil'
import Tratamientos from '../Vistas/RTratamiento'
import Historial from '../Vistas/Historial'
import Chat from '../Vistas/Chat'
import Inicio from '../Vistas/LoginRegister/Inicio.jsx';
import Login from '../Vistas/LoginRegister/Login.jsx';
import Register from '../Vistas/LoginRegister/Register.jsx';
import Historial from '../Vistas/Historial.jsx';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');  // Estado para el Searchbar


  return (
    
    <PaperDrawer.Section style={styles.drawer}>
      <Searchbar
        placeholder="Buscar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchbar}
      />
      <PaperDrawer.Item
        icon="home"
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <PaperDrawer.Item
        icon="plus"
        label="Tratamientos"
        onPress={() => props.navigation.navigate('Tratamientos')}
      />
      <PaperDrawer.Item
        icon="account"
        label="Perfil"
        onPress={() => props.navigation.navigate('Perfil')}
      />
      <PaperDrawer.Item
        icon="history"
        label="Historial"
        onPress={() => props.navigation.navigate('Historial')}
      />
      
      <PaperDrawer.Item
        icon="chat"
        label="Chat"
        onPress={() => props.navigation.navigate('Chat')}
      />
      <View style={styles.logoutContainer}>
    <PaperDrawer.Item
      icon="logout"
      label="Cerrar Sesión"
      onPress={() => {
        // Lógica para cerrar sesión
      }}
    />
    </View>
    </PaperDrawer.Section>
     
  );
};

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Inicio" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Inicio" component={Inicio}  />
      <Drawer.Screen name="Login" component={Login}  />
      <Drawer.Screen name="Register" component={Register}  />
      <Drawer.Screen name="Home" component={HomeScreen}  />
      <Drawer.Screen name="Perfil" component={Perfil}  />
      <Drawer.Screen name="Historial" component={Historial}  />
      <Drawer.Screen name="Chat" component={Chat}  />
      <Drawer.Screen name="Tratamientos" component={Tratamientos}  />
      <Drawer.Screen name="Historial" component={Historial}  />
    </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  searchbar: {
    margin: 10,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default DrawerNavigator;
