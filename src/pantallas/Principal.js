// Librerías o inputs
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';

// Función principal que renderiza la aplicación
export default function Principal({ route, navigation }) {
const { user } = route.params || { user: 'Usuario' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>
      <Text style={styles.subText}>¡Bienvenido, {user.nombre_completo}!</Text>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
   logoutBtn: {
    backgroundColor: '#3b5bdb',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
