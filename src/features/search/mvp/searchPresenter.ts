import { Dispatch } from 'redux';
import { ISearchPresenter, ISearchView } from './searchContract';
import {
  fetchPokedexsRequest,
  searchClearQuery,
  searchSetQuery,
} from '@actions/searchActions';

export class SearchPresenter implements ISearchPresenter {
  private view?: ISearchView;
  private dispatch: Dispatch;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(params: { dispatch: Dispatch }) {
    this.dispatch = params.dispatch;
  }
  onItemPress(id: string): void {
    this.view?.navigateToDetail(id);
  }
  onClearQuery(): void {
    this.dispatch(searchClearQuery());
  }

  attach(v: ISearchView) {
    this.view = v;
  }
  detach() {
    this.view = undefined;
    if (this.timer) clearTimeout(this.timer);
  }

  onInit() {
    // ensure pokedex is loaded (saga will no-op if already loaded)
    this.dispatch(fetchPokedexsRequest());
  }

  onChangeQuery(text: string) {
    // debounce 120–200ms to reduce renders for very fast typing
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.dispatch(searchSetQuery({ q: text })),
      120,
    );
  }
}
