import {
  DETAIL_FETCH_POKEDEXS_FAILURE,
  DETAIL_FETCH_POKEDEXS_REQUEST,
  DETAIL_FETCH_POKEDEXS_SUCCESS,
} from '@actionTypes/detailActionTypes';
import { Pokemon } from '@models/pokedex';

export const fetchDetailPokedexRequest = (payload: { id: string }) => ({
  type: DETAIL_FETCH_POKEDEXS_REQUEST,
  payload,
});
export const fetchDetailPokedexSuccess = (payload: { detail: Pokemon }) => ({
  type: DETAIL_FETCH_POKEDEXS_SUCCESS,
  payload,
});
export const fetchDetailPokedexFailure = (error: string) => ({
  type: DETAIL_FETCH_POKEDEXS_FAILURE,
  error,
});

export type DetailActions =
  | ReturnType<typeof fetchDetailPokedexRequest>
  | ReturnType<typeof fetchDetailPokedexSuccess>
  | ReturnType<typeof fetchDetailPokedexFailure>;
