import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { StatProps } from '@types/detail';
import StatItem from './StatItem';
import { Stat as IStat } from '@models/pokedex';

const Stat = ({ stats, color, isLight }: StatProps) => {
  const renderItem = ({ item, index }: { item: IStat; index: number }) => {
    return (
      <StatItem
        key={`stat-${index}-${item.stat.name}`}
        item={item}
        isLight={isLight}
        color={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={`stat`}
        data={stats}
        renderItem={renderItem}
        keyExtractor={(item, index) => `stat-${index}-${item.stat.name}`}
        numColumns={3}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Stat;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});
