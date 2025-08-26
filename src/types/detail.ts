import { Stat } from '@models/pokedex';

export interface LabelProps {
  title: string;
  value?: string;
}

export interface ChainType {
  name: string;
  image: string;
}

export interface EvolutionChainProps {
  evolutionFrom: ChainType;
  evolutionTo: ChainType;
  level: string | number;
}

export interface StatProps {
  stats: Stat[];
  color: string;
  isLight: boolean;
}

export interface StatItemProps {
  item: Stat;
  isLight: boolean;
  color: string;
}
