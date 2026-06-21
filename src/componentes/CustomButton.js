import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({
  title,
  onPress,
  backgroundColor = '#3b5bdb',
  textColor = '#fff',
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CustomButton;