import { Pokemon } from '@models/pokedex';
import { IHandles } from 'react-native-modalize/lib/options';

export interface CardPokemonProps {
  item: Pokemon;
}

export interface ModalFilterProps {
  modalRef: React.RefObject<IHandles | null>;
}

export interface FilterSelected {
  moveSelected: string | null;
  typeSelected: string | null;
  colorSelected: string | null;
}

export interface SectionFilterProps {
  onSelected: (value: string) => void;
  selected: string;
  options: string[];
  title: string;
}
