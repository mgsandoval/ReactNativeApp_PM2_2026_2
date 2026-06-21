import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet
} from 'react-native';

export default function IMC() {
    // Estados básicos para capturar lo que escribe el usuario
    // (Los alumnos usarán estos estados luego para sus validaciones y cálculos)
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const validarValoresNuméricos = (text) => {
        // Permitir solo números y un punto decimal
        let resultado = '';
        let puntoEncontrado = false;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char >= '0' && char <= '9') {
                resultado += char;
            } else if (char === '.' && !puntoEncontrado) {
                resultado += char;
                puntoEncontrado = true;
            }
        }
        return resultado;
    };

    // Función placeholder donde los alumnos desarrollarán su lógica
    const calcularIMC = () => {
        setMensajeError('');
        // Validaciones básicas
        if (!peso || !altura) {
            setMensajeError('Por favor ingresa peso y altura.');
            setImc(null);
            setCategoria('');
            return;
        }
        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);
        if (!isFinite(pesoNum) || !isFinite(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
            setMensajeError('Valores inválidos para peso o altura.');
            setImc(null);
            setCategoria('');
            return;
        }

        const calcImc = pesoNum / (alturaNum * alturaNum);
        setImc(calcImc.toFixed(2));
        if (calcImc < 18.5) {
            setCategoria("Bajo peso");
        } else if (calcImc >= 18.5 && calcImc < 24.9) {
            setCategoria("Peso normal");
        } else if (calcImc >= 25 && calcImc < 29.9) {
            setCategoria("Sobrepeso");
        } else {
            setCategoria("Obesidad");
        }
        console.log("IMC calculado:", calcImc);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>

                {/* Título de la App */}
                <Text style={styles.titulo}>Calculadora de IMC</Text>

                {/* Campo para el Peso */}
                <Text style={styles.label}>Ingresa tu peso (kg):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ejemplo: 70.5"
                    keyboardType="decimal-pad"
                    value={peso}
                    onChangeText={(text) => {
                        setPeso(validarValoresNuméricos(text))
                    }}
                    
                />

                {/* Campo para la Altura */}
                <Text style={styles.label}>Ingresa tu altura (m):</Text>
                {/* Se valida que solo se acepten números y un punto decimal en este campo */}
                <TextInput
                    style={styles.input}
                    placeholder="Ejemplo: 1.75"
                    keyboardType="decimal-pad"
                    value={altura}
                    onChangeText={(text) => setAltura(validarValoresNuméricos(text))}
                />

                {/* Botón de Acción */}
                <View style={styles.botonContainer}>
                    <Button title="Calcular IMC" onPress={calcularIMC} color="#007AFF" />
                </View>

                {/* Área de Resultados (Placeholders) */}
                <Text style={styles.resultadoValor}>IMC: {imc || '--'}</Text>
                <Text style={styles.resultadoCategoria}>Categoría: {categoria || '--'}</Text>

                {/* Área para mensajes de error o validación */}
                <Text style={styles.mensajeError}>{mensajeError}</Text>

            </View>
        </SafeAreaView>
    );
}

// Estilos equivalentes al XML de Android
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Un gris muy suave de fondo
    },
    formContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center', // Centra verticalmente el formulario
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 32,
        color: '#333333',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#555555',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 24,
    },
    botonContainer: {
        marginBottom: 32,
        // Nota: El componente Button de RN tiene sus propios márgenes,
        // este view ayuda a controlar el espacio alrededor.
    },
    resultadoValor: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#007AFF',
    },
    resultadoCategoria: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 16,
        color: '#333333',
    },
    mensajeError: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FF0000', // Rojo para errores
        minHeight: 24, // Reserva espacio para que la UI no "salte" cuando aparezca el mensaje
    }
});