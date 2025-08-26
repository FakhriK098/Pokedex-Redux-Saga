import { PokemonListResponse } from '@models/pokedex';
import { searchPokemon } from '@repository/pokedexRepository';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPokedexFailure,
  fetchPokedexsSuccess,
} from '@actions/searchActions';
import { SEARCH_FETCH_POKEDEXS_REQUEST } from '@actionTypes/searchActionTypes';

export function* fetchPokedexsSearch() {
  try {
    const list: PokemonListResponse = yield call(searchPokemon);

    yield put(fetchPokedexsSuccess({ list: list.results }));
  } catch (error: any) {
    yield put(fetchPokedexFailure(error.message));
  }
}

export default function* searchSagas() {
  yield takeLatest(SEARCH_FETCH_POKEDEXS_REQUEST, fetchPokedexsSearch);
}
