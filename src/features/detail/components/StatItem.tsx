import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '@themes/colors';
import { StatItemProps } from '@types/detail';

const StatItem = ({ item, isLight, color }: StatItemProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.baseStatContainer, { backgroundColor: color }]}>
        <Text
          style={[
            styles.baseText,
            { color: isLight ? colors.white : colors.black },
          ]}
        >
          {item.base_stat}
        </Text>
      </View>
      <View
        style={[
          styles.baseStatValueContainer,
          { backgroundColor: isLight ? colors.white : colors.black },
        ]}
      >
        <Text
          style={[
            styles.baseValueText,
            { color: !isLight ? colors.white : colors.black },
          ]}
        >
          {item.stat.name.replace('-', ' ')}
        </Text>
      </View>
    </View>
  );
};

export default StatItem;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    padding: 8,
    elevation: Platform.select({ ios: 8, android: 0 }),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flex: 1 / 2,
  },
  baseStatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  baseText: {
    fontSize: 24,
    fontWeight: '600',
  },
  baseStatValueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  baseValueText: {
    fontSize: 10,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
