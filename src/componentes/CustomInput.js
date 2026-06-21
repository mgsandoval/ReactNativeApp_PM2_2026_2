import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 8,
    fontSize: 15,
    color: '#333',
  },
});

export default CustomInput;