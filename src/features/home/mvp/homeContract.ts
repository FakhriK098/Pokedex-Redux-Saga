import { Pokemon } from '@models/pokedex';

export type HomeState = {
  items: Pokemon[];
  loading: boolean;
  error?: string | null;
  offset: number;
};

export interface IHomeView {
  navigateToDetail(pokemonId: number): void;
  navigateToSearch(): void;
  openModalFilter(): void;
}

export interface IHomePresenter {
  attach(view: IHomeView): void;
  detach(): void;
  onInit(): void;
  onRefresh(): void;
  onEndReached(offset: number): void;
  onItemPress(id: number): void;
  onSearchPress(): void;
  onFilterPress(): void;
}
