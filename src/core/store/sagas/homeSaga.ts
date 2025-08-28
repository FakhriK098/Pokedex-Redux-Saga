import { FilterPokemon, Pokemon, PokemonListResponse } from '@models/pokedex';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getPokemonByColors,
  getPokemonById,
  getPokemonByMoves,
  getPokemonByTypes,
  getPokemonColors,
  getPokemonList,
  getPokemonMoves,
  getPokemonTypes,
  speciesPokemon,
} from '@repository/pokedexRepository';
import {
  fetchFilterFailure,
  fetchFilterSuccess,
  fetchPokedexFailure,
  fetchPokedexsRequest,
  fetchPokedexsSuccess,
  resultFilter,
  setFilter,
} from '@actions/homeActions';
import {
  FETCH_FILTER_REQUEST,
  HOME_FETCH_POKEDEXS_REQUEST,
  SET_FILTER,
} from '@actionTypes/homeActionTypes';

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

export function* fetchfilters() {
  try {
    const [moves, types, colors]: [
      PokemonListResponse,
      PokemonListResponse,
      PokemonListResponse,
    ] = yield all([
      call(getPokemonMoves),
      call(getPokemonTypes),
      call(getPokemonColors),
    ]);
    const filter: FilterPokemon = {
      types: types,
      moves: moves,
      colors: colors,
    };

    yield put(fetchFilterSuccess({ filter }));
  } catch (err: any) {
    yield put(fetchFilterFailure(err.message));
  }
}

export const intersectArrays = (...arrays: string[][]): string[] => {
  return arrays.reduce((acc, arr) => acc.filter(item => arr.includes(item)));
};

export function* filterPokemon(action: ReturnType<typeof setFilter>) {
  try {
    const { typeSelected, moveSelected, colorSelected } = action.payload.filter;

    const countFilter = [moveSelected, typeSelected, colorSelected].filter(
      Boolean,
    ).length;
    const fetchPromises: Promise<string[]>[] = [];

    if (typeSelected) {
      fetchPromises.push(getPokemonByTypes(typeSelected));
    }
    if (moveSelected) {
      fetchPromises.push(getPokemonByMoves(moveSelected));
    }
    if (colorSelected) {
      fetchPromises.push(getPokemonByColors(colorSelected));
    }

    const resAll: string[][] = yield all(fetchPromises);

    let results = intersectArrays(...resAll);

    if (resAll.length === 1) {
      results = resAll[0];
    }

    const detailedList: Pokemon[] = yield all(
      results.map(item => call(getPokemonById, item)),
    );

    const finalResult: Pokemon[] = yield all(
      detailedList.map(item => call(speciesPokemon, item)),
    );

    yield put(
      resultFilter({ filtered: finalResult, countFilter: countFilter }),
    );
  } catch (err: any) {
    yield put(fetchFilterFailure(err.message));
  }
}

export default function* homeSagas() {
  yield takeLatest(HOME_FETCH_POKEDEXS_REQUEST, fetchPokedexs);
  yield takeLatest(SET_FILTER, filterPokemon);
  yield takeLatest(FETCH_FILTER_REQUEST, fetchfilters);
}
