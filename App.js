import React from "react";  
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pantallas/Login";
import Principal from "./src/pantallas/Principal";
import CrearUsuario from "./src/pantallas/CrearUsuario";
import IMC from "./src/pantallas/examen1P";

const Stack = createNativeStackNavigator();

export default function App (){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Principal} />
        <Stack.Screen name="Crear cuenta" component={CrearUsuario} />
        <Stack.Screen name="IMCCalculator" component={IMC} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}