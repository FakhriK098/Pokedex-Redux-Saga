import homeReducer from '@features/home/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ home: homeReducer });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
