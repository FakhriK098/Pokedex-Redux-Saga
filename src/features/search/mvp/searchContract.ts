export interface ISearchView {
  navigateToDetail(pokemonId: string): void;
  showToast(m: string): void;
}

export interface ISearchPresenter {
  attach(v: ISearchView): void;
  detach(): void;
  onInit(): void;
  onChangeQuery(text: string): void;
  onItemPress(id: string): void;
  onClearQuery(): void;
}
