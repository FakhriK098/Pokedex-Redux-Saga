import homeSagas from '@features/home/saga';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(homeSagas)]);
}
