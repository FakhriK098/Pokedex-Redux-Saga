import { Dispatch } from 'redux';
import { HomeState, IHomePresenter, IHomeView } from './homeContract';
import { fetchPokedexsRequest } from '../actions';

export class HomePresenter implements IHomePresenter {
  private view?: IHomeView;
  private getState: () => HomeState;
  private dispatch: Dispatch;

  constructor(params: { dispatch: Dispatch; getState: () => HomeState }) {
    this.dispatch = params.dispatch;
    this.getState = params.getState;
  }
  attach(view: IHomeView) {
    this.view = view;
  }
  detach(): void {
    this.view = undefined;
  }
  onInit(): void {
    this.dispatch(fetchPokedexsRequest({ offset: 0 }));
  }
  onRefresh(): void {
    this.dispatch(fetchPokedexsRequest({ offset: 0 }));
  }
  onEndReached(offset: number): void {
    this.dispatch(fetchPokedexsRequest({ offset: offset }));
  }
  onItemPress(id: number): void {
    this.view?.navigateToDetail(id);
  }
}
