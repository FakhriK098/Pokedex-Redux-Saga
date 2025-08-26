import { Pokemon } from '@models/pokedex';

export type DetailState = {
  items: Pokemon;
  loading: boolean;
  error?: string | null;
};

export interface IDetailView {
  showToast(m: string): void;
}

export interface IDetailPresenter {
  attach(view: IDetailView): void;
  detach(): void;
  onInit(id: string): void;
}
