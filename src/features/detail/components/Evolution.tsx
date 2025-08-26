import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import Label from './Label';
import EvolutionChain from './EvolutionChain';

const Evolution = () => {
  const { pokemon } = useSelector((s: RootState) => s.detail);

  if (!pokemon || !pokemon.evolutions) return null;

  return (
    <View>
      <Label title="Evolution Chain" />
      {pokemon.evolutions.map((item, index) => (
        <EvolutionChain
          key={index}
          evolutionFrom={{
            name: item.evolutionFrom,
            image: item.evolutionImgFrom,
          }}
          evolutionTo={{
            name: item.evolutionTo,
            image: item.evolutionImgTo,
          }}
          level={item.level}
        />
      ))}
    </View>
  );
};

export default Evolution;
