// Librerías o inputs
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';

// Función principal que renderiza la aplicación
export default function App() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Estilos CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#929292',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    fontSize: 16,
  }
});
