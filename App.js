import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Button, SafeAreaView, Text, View } from 'react-native';
import SideBar from './src/Vistas/SideBar'


export default function App() {
  return (

    <SideBar></SideBar>
    // <View style={styles.container}>
    
    //    {/* <HomeMenu></HomeMenu> */}
    
    //    <StatusBar style="auto" />
    //  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8AA1B1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

