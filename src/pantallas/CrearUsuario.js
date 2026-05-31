// Librerías o inputs
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Función principal que renderiza la aplicación
export default function Usuario() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [verifyPass, setVerifyPass] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const manejaIniciarSesion = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear una Cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Clave"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Repetir clave"
        value={verifyPass}
        onChangeText={setVerifyPass}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btnSecondary}>
        <Text style={styles.btnTextDark}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnFacebook}>
        <Text style={styles.btnTextLight}>Iniciar sesión con Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnGoogle}>
        <Text style={styles.btnTextLight}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnApple}>
        <Text style={styles.btnTextLight}>Iniciar sesión con Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={manejaIniciarSesion}>
        <Text style={styles.btnTextDark}>¿Tienes cuenta? Ingresar</Text>
      </TouchableOpacity>

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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1282de',
  },
  input: {
    borderWidth: 1,
    borderColor: '#929292',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    fontSize: 16,
    width: "15vw",
  },
  btnTextLight: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnTextDark: {
    color: "#131313",
    fontSize: 16,
    fontWeight: "600",
  },
  btnSecondary: {
    backgroundColor: "#0e99f6",
    padding: 14,
    margin: 8,
    borderRadius: 6,
    alignItems: "center",
    color: "#000000",
    width: "15vw",
  },
  btnFacebook: {
    backgroundColor: "#085bc1",
    padding: 14,
    margin: 8,
    borderRadius: 6,
    alignItems: "center",
    color: "#ffffff",
    width: "15vw",
  },
  btnGoogle: {
    backgroundColor: "#e03d3d",
    padding: 14,
    margin: 8,
    borderRadius: 6,
    alignItems: "center",
    color: "#ffffff",
    width: "15vw",
  },
  btnApple: {
    backgroundColor: "#787a7c",
    padding: 14,
    margin: 8,
    borderRadius: 6,
    alignItems: "center",
    color: "#ffffff",
    width: "15vw",
  }
});
