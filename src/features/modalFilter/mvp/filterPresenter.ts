import { FilterSelected } from '@types/home';
import { IFilterPresenter } from './filterContract';
import { Dispatch } from 'redux';
import {
  clearFilter,
  fetchFilterRequest,
  setFilter,
} from '@actions/homeActions';

export class FilterPresenter implements IFilterPresenter {
  private dispatch: Dispatch;

  constructor(params: { dispatch: Dispatch }) {
    this.dispatch = params.dispatch;
  }
  onInit(): void {
    this.dispatch(fetchFilterRequest());
  }
  onApplyFilter(filter: FilterSelected): void {
    this.dispatch(setFilter({ filter }));
  }
  onClearFilter(): void {
    this.dispatch(clearFilter());
  }
}
