import {
  CLEAR_FILTER,
  FETCH_FILTER_FAILURE,
  FETCH_FILTER_REQUEST,
  FETCH_FILTER_SUCCESS,
  HOME_FETCH_POKEDEXS_FAILURE,
  HOME_FETCH_POKEDEXS_REQUEST,
  HOME_FETCH_POKEDEXS_SUCCESS,
  RESULT_FILTER,
  SET_FILTER,
} from '@actionTypes/homeActionTypes';
import { FilterPokemon, Pokemon } from '@models/pokedex';
import { FilterSelected } from '@types/home';

export const fetchPokedexsRequest = (payload: { offset: number }) => ({
  type: HOME_FETCH_POKEDEXS_REQUEST,
  payload,
});
export const fetchPokedexsSuccess = (payload: {
  list: Pokemon[];
  offset: number;
}) => ({
  type: HOME_FETCH_POKEDEXS_SUCCESS,
  payload,
});
export const fetchPokedexFailure = (error: string) => ({
  type: HOME_FETCH_POKEDEXS_FAILURE,
  error,
});

export const fetchFilterRequest = () => ({
  type: FETCH_FILTER_REQUEST,
});
export const fetchFilterSuccess = (payload: { filter: FilterPokemon }) => ({
  type: FETCH_FILTER_SUCCESS,
  payload,
});
export const fetchFilterFailure = (error: string) => ({
  type: FETCH_FILTER_FAILURE,
  error,
});

export const setFilter = (payload: { filter: FilterSelected }) => ({
  type: SET_FILTER,
  payload,
});

export const clearFilter = () => ({
  type: CLEAR_FILTER,
});

export const resultFilter = (payload: {
  filtered: Pokemon[];
  countFilter: number;
}) => ({
  type: RESULT_FILTER,
  payload,
});

// Tipe util opsional
export type HomeActions =
  | ReturnType<typeof fetchPokedexsRequest>
  | ReturnType<typeof fetchPokedexsSuccess>
  | ReturnType<typeof fetchPokedexFailure>
  | ReturnType<typeof fetchFilterRequest>
  | ReturnType<typeof fetchFilterSuccess>
  | ReturnType<typeof fetchFilterFailure>
  | ReturnType<typeof setFilter>
  | ReturnType<typeof clearFilter>
  | ReturnType<typeof resultFilter>;
