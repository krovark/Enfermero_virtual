
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import { Drawer as PaperDrawer, Searchbar, IconButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Vistas/Home';
import Perfil from '../Vistas/Perfil';
import Tratamientos from '../Vistas/RegistrarTratamientos/RTratamiento';
import Historial from '../Vistas/Historial';
import Chat from '../Vistas/Chat';
import Inicio from '../Vistas/LoginRegister/Inicio.jsx';
import Login from '../Vistas/LoginRegister/Login.jsx';
import Register from '../Vistas/LoginRegister/Register.jsx';
import VisitasMedicas from './RegistrarTratamientos/RVisitaMedica.jsx';
import ResetPW from './LoginRegister/ResetPW.jsx';
import { AuthProvider, useAuth } from '../utils/AuthContext.js';
import { CommonActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator();




const CustomDrawerContent = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');  // Estado para el Searchbar
    const { logout, navigationRef } = useAuth();

   

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
        icon="calendar"
        label="Visitas Medicas"
        onPress={() => props.navigation.navigate('VisitasMedicas')}
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
          logout();
    
        }}
    />


    </View>
    </PaperDrawer.Section>
     
  );

    };

const DrawerNavigator = () => {
  const { user, navigationRef } = useAuth();
  return (
    <NavigationContainer ref={navigationRef} >


  {user ? (
        
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} ref={navigationRef} />}>
      <Drawer.Screen name="Home" component={HomeScreen}  />
      <Drawer.Screen name="Perfil" component={Perfil}  />
      <Drawer.Screen name="Chat" component={Chat}  />
      <Drawer.Screen name="Tratamientos" component={Tratamientos}  />
      <Drawer.Screen name="Historial" component={Historial}  />
      <Drawer.Screen name="VisitasMedicas" component={VisitasMedicas}  />
        </Drawer.Navigator>
      ) : (


    <Drawer.Navigator initialRouteName="Inicio" >
      <Drawer.Screen name="Inicio" component={Inicio}  />
      <Drawer.Screen name="Login" component={Login}  options={{ drawerLabel: 'Iniciar Sesión' }}  />
      <Drawer.Screen name="Register" component={Register} options={{ drawerLabel: 'Registrarse' }}  />
      <Drawer.Screen name="ResetPW" component={ResetPW} options={{ drawerLabel: 'Recuperar Contraseña', drawerItemStyle: { height: 0 } }} />
    </Drawer.Navigator>
      )}



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
