
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import { Drawer as PaperDrawer, Searchbar, IconButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Vistas/Home';



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
        onPress={() => props.navigation.navigate('Inicio')}
      />
      <PaperDrawer.Item
        icon="plus"
        label="Tratamientos"
        onPress={() => props.navigation.navigate('Inventory')}
      />
      <PaperDrawer.Item
        icon="account"
        label="Perfil"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <PaperDrawer.Item
        icon="alarm"
        label="Alarmas"
        onPress={() => props.navigation.navigate('Alarms')}
      />
      <PaperDrawer.Item
        icon="history"
        label="Historial"
        onPress={() => props.navigation.navigate('History')}
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
      <Drawer.Screen name="Inicio" component={HomeScreen}  />
      {/* <Drawer.Screen name="Profile"  /> */}
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
