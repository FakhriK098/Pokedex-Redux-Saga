import { HomeActions } from '@actions/homeActions';
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
import { FilterPokemon, Pokemon, PokemonListResponse } from '@models/pokedex';

interface HomeState {
  pokemonList: Pokemon[];
  pokemonMoves: PokemonListResponse | null;
  pokemonTypes: PokemonListResponse | null;
  pokemonColors: PokemonListResponse | null;
  loading: boolean;
  filterLoading: boolean;
  error: string | null;
  offset: number;

  filterPokemonList: Pokemon[];
  filters: FilterPokemon | null;
  loadingFilter: boolean;
  errorFilter: string | null;
  moveSelected: string | null;
  typeSelected: string | null;
  colorSelected: string | null;
  countFilter: number;
}

const initialState: HomeState = {
  pokemonList: [],
  pokemonMoves: null,
  pokemonTypes: null,
  pokemonColors: null,
  loading: false,
  filterLoading: false,
  error: null,
  offset: 0,
  filters: null,
  loadingFilter: false,
  errorFilter: null,
  moveSelected: null,
  typeSelected: null,
  colorSelected: null,
  countFilter: 0,
  filterPokemonList: [],
};

export default function homeReducer(
  state = initialState,
  action: HomeActions,
): HomeState {
  switch (action.type) {
    case HOME_FETCH_POKEDEXS_REQUEST:
      return {
        ...state,
        offset: action.payload.offset,
        loading: true,
        error: null,
      };
    case HOME_FETCH_POKEDEXS_SUCCESS:
      const res =
        state.offset === 0
          ? action.payload.list
          : dedupeById([...state.pokemonList, ...action.payload.list]);
      return {
        ...state,
        pokemonList: res,
        offset: res.length,
        loading: false,
        error: null,
      };
    case HOME_FETCH_POKEDEXS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_FILTER_REQUEST:
      return {
        ...state,
        loadingFilter: true,
        errorFilter: null,
      };
    case FETCH_FILTER_SUCCESS:
      return {
        ...state,
        filters: action.payload.filter,
        loadingFilter: false,
        errorFilter: null,
      };
    case FETCH_FILTER_FAILURE:
      return {
        ...state,
        loadingFilter: false,
        errorFilter: action.error,
      };
    case SET_FILTER:
      return {
        ...state,
        moveSelected: action.payload.filter.moveSelected,
        typeSelected: action.payload.filter.typeSelected,
        colorSelected: action.payload.filter.colorSelected,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filterPokemonList: [],
        countFilter: 0,
        moveSelected: null,
        typeSelected: null,
        colorSelected: null,
      };
    case RESULT_FILTER:
      return {
        ...state,
        filterPokemonList: action.payload.filtered,
        countFilter: action.payload.countFilter,
      };
    default:
      return state;
  }
}

const dedupeById = (items: Pokemon[]) => {
  const m = new Map<number, Pokemon>();
  for (const it of items) m.set(it.id, it);
  return [...m.values()];
};
