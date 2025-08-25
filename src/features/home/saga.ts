import { Pokemon, PokemonListResponse } from '@models/pokedex';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPokedexFailure,
  fetchPokedexsRequest,
  fetchPokedexsSuccess,
} from './actions';
import { HOME_FETCH_POKEDEXS_REQUEST } from './actionTypes';
import {
  getPokemonById,
  getPokemonList,
  speciesPokemon,
} from '@repository/pokedexRepository';

export function* fetchPokedexs(
  action: ReturnType<typeof fetchPokedexsRequest>,
) {
  try {
    const { offset } = action.payload;

    const list: PokemonListResponse = yield call(getPokemonList, offset);
    const detailedList: Pokemon[] = yield all(
      list.results.map(item => call(getPokemonById, item.name)),
    );
    const finalResult: Pokemon[] = yield all(
      detailedList.map(item => call(speciesPokemon, item)),
    );

    yield put(
      fetchPokedexsSuccess({ list: finalResult, offset: finalResult.length }),
    );
  } catch (err: any) {
    yield put(fetchPokedexFailure(err.message));
  }
}

export default function* homeSagas() {
  yield takeLatest(HOME_FETCH_POKEDEXS_REQUEST, fetchPokedexs);
}
