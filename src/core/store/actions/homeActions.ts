import {
  HOME_FETCH_POKEDEXS_FAILURE,
  HOME_FETCH_POKEDEXS_REQUEST,
  HOME_FETCH_POKEDEXS_SUCCESS,
} from '@actionTypes/homeActionTypes';
import { Pokemon } from '@models/pokedex';

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

// Tipe util opsional
export type HomeActions =
  | ReturnType<typeof fetchPokedexsRequest>
  | ReturnType<typeof fetchPokedexsSuccess>
  | ReturnType<typeof fetchPokedexFailure>;
