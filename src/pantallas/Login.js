import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
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
      console.log("Boton Presionado");

      if (user.trim() === "" || pass.trim() === "") {
         showCustomAlert("Campos vacíos", `Usuario y Contraseña`);
         return;
      } else if (user === "admin" && pass === "admin") {
         showCustomAlert("Bienvenido!", `Ha ingresado correctamente`, () => {
            navigation.navigate("Login");
         });
         return;
      }
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Login Basico 1</Text>
         <TextInput
            style={styles.input}
            placeholder="Ingrese un usuario"
            value={user}
            autoCapitalize="none"
            onChangeText={setUser}
         ></TextInput>

         <TextInput
            style={styles.input}
            placeholder="Ingrese una contraseña"
            value={pass}
            secureTextEntry
            onChangeText={setPass}
         ></TextInput>

         <TouchableOpacity style={styles.btn} onPress={manejaLogin}>
            <Text style={styles.btnText}>Entrar</Text>
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
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
   },
   input: {
      borderWidth: 1,
      borderColor: "#929292",
      padding: 12,
      marginBottom: 12,
      borderRadius: 6,
      fontSize: 16,
   },
   btn: {
      backgroundColor: "#1510ef",
      padding: 14,
      borderRadius: 6,
      alignItems: "center",
   },
   btnText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
   },
});
