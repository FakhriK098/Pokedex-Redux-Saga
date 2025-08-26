import searchReducer from '@reducers/searchReducer';
import homeReducer from '@reducers/homeReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  home: homeReducer,
  search: searchReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
