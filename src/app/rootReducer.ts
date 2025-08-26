import searchReducer from '@reducers/searchReducer';
import homeReducer from '@reducers/homeReducer';
import { combineReducers } from 'redux';
import detailReducer from '@reducers/detailReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  search: searchReducer,
  detail: detailReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
