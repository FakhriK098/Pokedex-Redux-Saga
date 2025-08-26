import searchSagas from '@sagas/searchSaga';
import homeSagas from '@sagas/homeSaga';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(homeSagas), fork(searchSagas)]);
}
