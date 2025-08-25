import { PokemonResult } from '@models/pokedex';

export const getId = (poke: PokemonResult): string => {
  const idMatch = poke.name.match(/\/(\d+)\/$/);
  return idMatch ? idMatch[1] : poke.name;
};

export const getOffset = (url: string): number => {
  const match = url.match(/[?&]offset=(\d+)/);
  return match ? Number(match[1]) : 0;
};
