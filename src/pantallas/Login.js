import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   TextInput,
   Image,
} from "react-native";
import CustomAlert from "../componentes/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import { API_URLS } from "../config/config";
import BitacoraServices from '../componentes/Bitacora';

//Formulario o Pantalla
export default function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [alert, setAlert] = useState({
      visible: false,
      title: "",
      message: "",
      _callback: null,
   });

   const [conexionBd, setConexionBD] = useState({
      estado: "Verificando...",
      mensaje: "Verificando conexión...",
      datos: null,
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
   const handleLogin = async () => {
      if (!username || !password) {
         showCustomAlert('Campos vacios', 'Por favor ingrese usuario y contraseña.');
         return;
      }

      try {
         const respuesta = await fetch(API_URLS.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ user: username, pass: password }),
         });
         const textoRespuesta = await respuesta.text();
         console.log("Respuesta del servidor", textoRespuesta);

         const data = JSON.parse(textoRespuesta);

         if (data.exito) {
            console.log("usuarioId:", data.usuario.id);
            const resultDispo = await BitacoraServices.registrarDispositivo();
            //Llamar a Guardar Evento en Bitacora
            await BitacoraServices.registrarEvento({
               accion: "LOGIN",
               usuario_id: data.usuario.id,
               estado_operacion: "EXITOSO",
               mensaje_error: null
            });
            navigation.navigate('Home', { user: data.usuario });
         } else {
            showCustomAlert('Error', data.mensaje);
         }
      } catch (error) {
         console.error("Error", error);
      }
   };

   // Método para verificar la conexión a la base de datos
   const verificarConexionBD = async () => {
      setConexionBD({ estado: "Verificando...", mensaje: "Verificando conexión...", datos: null });

      try {
         console.log("Intentando conectar a:", API_URLS.CHECKDB);
         
         const respuesta = await fetch(API_URLS.CHECKDB, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
         });

         console.log("Respuesta status:", respuesta.status);
         console.log("Respuesta ok:", respuesta.ok);
         
         const textoRespuesta = await respuesta.text();
         console.log("Respuesta texto:", textoRespuesta);
         console.log("Respuesta tipo:", typeof textoRespuesta);
         
         if (!respuesta.ok) {
            throw new Error(`Error http: ${respuesta.status}`);
         }
         
         // Try parsing JSON with error handling
         let data;
         try {
            data = JSON.parse(textoRespuesta);
            console.log("JSON parsed:", data);
         } catch (parseError) {
            console.error("JSON parse error:", parseError);
            console.error("Raw response:", textoRespuesta);
            throw new Error(`JSON Parse Error: ${parseError.message}`);
         }
         
         if (data.conectado) {
            console.log("Conexión exitosa!");
            setConexionBD({ estado: "¡Conectado!", mensaje: "Conexión establecida.", datos: data });
         } else {
            throw new Error(`Conexión rechazada: ${data.mensaje}`);
         }
      } catch (error) {
         console.error("Error de conexión - Detalles:");
         console.error("- Nombre:", error.name);
         console.error("- Mensaje:", error.message);
         console.error("- Stack:", error.stack);
         
         setConexionBD({ 
            estado: `Error: ${error.name}`, 
            mensaje: error.message, 
            datos: null 
         });
      }
   };

   // --------------------------------------------------

   const handleCrearCuenta = () => {
      navigation.navigate("Crear cuenta");
   };

   const handleIMCCalculator = () => {
      navigation.navigate("IMCCalculator");
   }

   useEffect(() => {
      verificarConexionBD();
   }, []);

   return (
      <View style={styles.container}>
         <Image
            source={require("../../assets/usuario_icon.png")}
            style={styles.img}
         />
         <Text style={styles.title}>Iniciar sesión</Text>
         <TextInput
            style={styles.input}
            placeholder="Ingrese un usuario"
            value={username}
            autoCapitalize="none"
            onChangeText={setUsername}
         />

         <TextInput
            style={styles.input}
            placeholder="Ingrese una contraseña"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
         />

         <Text style={{ marginBottom: 12, color: "#929292" }}>
            {conexionBd.estado}
         </Text>

         <TouchableOpacity style={styles.btn} onPress={handleLogin}>
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

         <TouchableOpacity style={styles.btnSecondary} onPress={handleCrearCuenta}>
            <Text style={styles.btnTextDark}>¿No tienes cuenta? Crea una</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.btnSecondary} onPress={handleIMCCalculator}>
            <Text style={styles.btnTextDark}>Calcular IMC</Text>
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
      color: "#1282de",
   },
   input: {
      borderWidth: 1,
      borderColor: "#929292",
      padding: 12,
      marginBottom: 12,
      borderRadius: 6,
      fontSize: 16,
      width: "100%",
   },
   btn: {
      backgroundColor: "#166cc7",
      padding: 14,
      borderRadius: 6,
      alignItems: "center",
      width: "100%",
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
      width: "100%",
   },
   btnFacebook: {
      backgroundColor: "#085bc1",
      padding: 14,
      margin: 8,
      borderRadius: 6,
      alignItems: "center",
      color: "#ffffff",
      width: "100%",
   },
   btnGoogle: {
      backgroundColor: "#e03d3d",
      padding: 14,
      margin: 8,
      borderRadius: 6,
      alignItems: "center",
      color: "#ffffff",
      width: "100%",
   },
   btnApple: {
      backgroundColor: "#787a7c",
      padding: 14,
      margin: 8,
      borderRadius: 6,
      alignItems: "center",
      color: "#ffffff",
      width: "100%",
   },
   img: {
      width: 100,
      height: 100,
      marginBottom: 20,
   },
   connOKText: {
      color: '#2f9e44',
      fontSize: 13,
      marginBottom: 10,
      textAlign: 'center',
   },
   connErrorText: {
      color: '#e03131',
      fontSize: 13,
      marginBottom: 10,
      textAlign: 'center',
   }
});
