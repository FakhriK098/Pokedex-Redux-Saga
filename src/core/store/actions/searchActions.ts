import {
  SEARCH_CLEAR_QUERY,
  SEARCH_FETCH_POKEDEXS_FAILURE,
  SEARCH_FETCH_POKEDEXS_REQUEST,
  SEARCH_FETCH_POKEDEXS_SUCCESS,
  SEARCH_SET_QUERY,
} from '@actionTypes/searchActionTypes';
import { PokemonResult } from '@models/pokedex';

export const fetchPokedexsRequest = () => ({
  type: SEARCH_FETCH_POKEDEXS_REQUEST,
});
export const fetchPokedexsSuccess = (payload: { list: PokemonResult[] }) => ({
  type: SEARCH_FETCH_POKEDEXS_SUCCESS,
  payload,
});
export const fetchPokedexFailure = (error: string) => ({
  type: SEARCH_FETCH_POKEDEXS_FAILURE,
  error,
});

export const searchSetQuery = (payload: { q: string }) => ({
  type: SEARCH_SET_QUERY,
  payload,
});

export const searchClearQuery = () => ({
  type: SEARCH_CLEAR_QUERY,
});

// Tipe util opsional
export type SearchActions =
  | ReturnType<typeof fetchPokedexsRequest>
  | ReturnType<typeof fetchPokedexsSuccess>
  | ReturnType<typeof fetchPokedexFailure>
  | ReturnType<typeof searchSetQuery>
  | ReturnType<typeof searchClearQuery>;
