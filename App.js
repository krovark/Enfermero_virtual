import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Button, SafeAreaView, Text, View } from 'react-native';
import SideBar from './src/Vistas/SideBar'


export default function App() {
  return (

    

    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <SideBar />
      <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 30 : 3,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


