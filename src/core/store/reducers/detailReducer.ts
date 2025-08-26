import { DetailActions } from '@actions/detailActions';
import {
  DETAIL_FETCH_POKEDEXS_FAILURE,
  DETAIL_FETCH_POKEDEXS_REQUEST,
  DETAIL_FETCH_POKEDEXS_SUCCESS,
} from '@actionTypes/detailActionTypes';
import { Pokemon } from '@models/pokedex';

interface DetailState {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const initialState: DetailState = {
  pokemon: null,
  loading: false,
  error: null,
};

export default function detailReducer(
  state = initialState,
  action: DetailActions,
): DetailState {
  switch (action.type) {
    case DETAIL_FETCH_POKEDEXS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DETAIL_FETCH_POKEDEXS_SUCCESS:
      return {
        ...state,
        pokemon: action.payload.detail,
        loading: false,
        error: null,
      };
    case DETAIL_FETCH_POKEDEXS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
