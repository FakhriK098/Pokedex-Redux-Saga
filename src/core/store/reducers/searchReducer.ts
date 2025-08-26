import { SearchActions } from '@actions/searchActions';
import {
  SEARCH_CLEAR_QUERY,
  SEARCH_FETCH_POKEDEXS_FAILURE,
  SEARCH_FETCH_POKEDEXS_REQUEST,
  SEARCH_FETCH_POKEDEXS_SUCCESS,
  SEARCH_SET_QUERY,
} from '@actionTypes/searchActionTypes';
import { PokemonResult } from '@models/pokedex';

interface SearchState {
  pokemons: PokemonResult[];
  searchResult: PokemonResult[];
  query: string | null;
  loading: boolean;
  error?: string | null;
}

const initialState: SearchState = {
  pokemons: [],
  searchResult: [],
  query: null,
  loading: false,
  error: null,
};

export default function searchReducer(
  state = initialState,
  action: SearchActions,
): SearchState {
  switch (action.type) {
    case SEARCH_FETCH_POKEDEXS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_FETCH_POKEDEXS_SUCCESS:
      return {
        ...state,
        pokemons: action.payload.list,
        loading: false,
        error: null,
      };
    case SEARCH_FETCH_POKEDEXS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SEARCH_SET_QUERY:
      return {
        ...state,
        query: action.payload.q,
      };
    case SEARCH_CLEAR_QUERY:
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
}
