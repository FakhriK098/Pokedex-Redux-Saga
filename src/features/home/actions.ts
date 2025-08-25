import { Pokemon } from '@models/pokedex';
import { HOME_FETCH_POKEDEXS_REQUEST } from './actionTypes';
import { HOME_FETCH_POKEDEXS_SUCCESS } from './actionTypes';
import { HOME_FETCH_POKEDEXS_FAILURE } from './actionTypes';

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
