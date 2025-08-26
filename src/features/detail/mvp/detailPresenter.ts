import { Dispatch } from 'redux';
import { IDetailPresenter, IDetailView } from './detailContract';
import { fetchDetailPokedexRequest } from '@actions/detailActions';

export class DetailPresenter implements IDetailPresenter {
  private view?: IDetailView;
  private dispatch: Dispatch;

  constructor(params: { dispatch: Dispatch }) {
    this.dispatch = params.dispatch;
  }
  attach(v: IDetailView): void {
    this.view = v;
  }
  detach(): void {
    this.view = undefined;
  }
  onInit(id: string): void {
    this.dispatch(fetchDetailPokedexRequest({ id }));
  }
}
