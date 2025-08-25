import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
const createSagaMiddleware = require('redux-saga').default;

const saga = createSagaMiddleware();

export const store = createStore(rootReducer, compose(applyMiddleware(saga)));

saga.run(rootSaga);
