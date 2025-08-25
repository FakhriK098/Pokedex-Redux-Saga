import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const EmptyContainer = () => {
  return (
    <View style={styles.containerEmpty}>
      <Text style={styles.textEmpty}>Data No Found</Text>
    </View>
  );
};

export default EmptyContainer;

const styles = StyleSheet.create({
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: 16,
    fontWeight: '600',
  },
});
