import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import CustomAlert from "../componentes/CustomAlert";
import { useNavigation } from "@react-navigation/native";

//Formulario o Pantalla
export default function App() {
   const [user, setUser] = useState("");
   const [pass, setPass] = useState("");
   const [alert, setAlert] = useState({
      visible: false,
      title: "",
      message: "",
      _callback: null,
   });
   const showCustomAlert = (title, message, callback) => {
      setAlert({
         visible: true,
         title,
         message,
         _callback: callback,
      });
   };
   const navigation = useNavigation();

   ///FUNCIONES
   const manejaLogin = () => {
      console.log("Botón Presionado");

      if (user.trim() === "" || pass.trim() === "") {
         showCustomAlert("Campos vacíos", `Por favor, ingrese Usuario y Contraseña`);
         return;
      } else if (user === "admin" && pass === "admin") {
         showCustomAlert("¡Bienvenido!", "Ha ingresado correctamente", () => {
            navigation.navigate("Home");
         });
         return;
      }
   };

   const manejaCrearCuenta = () => {
      navigation.navigate("Usuarios");
   };


   return (
      <View style={styles.container}>
         <Image
            source={require('../../assets/usuario_icon.png')}
            style={ styles.img }
         />
         <Text style={styles.title}>Iniciar sesión</Text>
         <TextInput
            style={styles.input}
            placeholder="Ingrese un usuario"
            value={user}
            autoCapitalize="none"
            onChangeText={setUser}
         />

         <TextInput
            style={styles.input}
            placeholder="Ingrese una contraseña"
            value={pass}
            secureTextEntry
            onChangeText={setPass}
         />

         <TouchableOpacity style={styles.btn} onPress={manejaLogin}>
            <Text style={styles.btnTextLight}>Entrar</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnTextDark}>Olvidé mi contraseña</Text>
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

         <TouchableOpacity style={styles.btnSecondary} onPress={manejaCrearCuenta}>
            <Text style={styles.btnTextDark}>¿No tienes cuenta? Crea una</Text>
         </TouchableOpacity>

         <CustomAlert
            visible={alert.visible}
            title={alert.title}
            message={alert.message}
            onConfirm={() => {
               setAlert({ ...alert, visible: false });
               if (alert._callback) {
                  alert._callback();
               }
            }}
         />

         <StatusBar style="auto" />
      </View>
   );
}

//Styles o CSS
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: '#1282de',
   },
   input: {
      borderWidth: 1,
      borderColor: "#929292",
      padding: 12,
      marginBottom: 12,
      borderRadius: 6,
      fontSize: 16,
      width: "15vw",
   },
   btn: {
      backgroundColor: "#166cc7",
      padding: 14,
      borderRadius: 6,
      alignItems: "center",
      width: "15vw",
      margin: 8,
   },
   btnTextLight: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
   },
   btnTextDark: {
      color: "#3b3a3a",
      fontSize: 16,
      fontWeight: "600",
   },
   btnSecondary: {
      backgroundColor: "#bdb9b9",
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
   },
   img: {
      width: 100, 
      height: 100, 
      marginBottom: 20,
   }
});