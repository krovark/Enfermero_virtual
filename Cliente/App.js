import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Button, SafeAreaView, Text, View } from 'react-native';
import SideBar from './src/Vistas/SideBar'
import { AuthProvider } from './src/utils/AuthContext';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (

    triggerNotifications(),

    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <AuthProvider>
      <SideBar />
      </AuthProvider>
      <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

let date = new Date();
//Add 10 seconds to the current date to test it.
date.setSeconds(date.getSeconds() + 10);


const triggerNotifications = async () => {
  await Notifications.scheduleNotificationAsync({
  content: {
    title: 'SEGUIMED',
    body: "Tú asistente medico personal",
  },
  trigger: { date: date },
});
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


