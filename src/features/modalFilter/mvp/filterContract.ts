import { FilterPokemon } from '@models/pokedex';
import { FilterSelected } from '@types/home';

export type FilterState = {
  filters: FilterPokemon;
  loading: boolean;
  error?: string | null;
};

export interface IFilterPresenter {
  onInit(): void;
  onApplyFilter(filter: FilterSelected): void;
  onClearFilter(): void;
}
