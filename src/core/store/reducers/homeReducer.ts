import { HomeActions } from '@actions/homeActions';
import {
  HOME_FETCH_POKEDEXS_FAILURE,
  HOME_FETCH_POKEDEXS_REQUEST,
  HOME_FETCH_POKEDEXS_SUCCESS,
} from '@actionTypes/homeActionTypes';
import { Pokemon, PokemonListResponse } from '@models/pokedex';

interface HomeState {
  pokemonList: Pokemon[];
  pokemonMoves: PokemonListResponse | null;
  pokemonTypes: PokemonListResponse | null;
  pokemonColors: PokemonListResponse | null;
  loading: boolean;
  filterLoading: boolean;
  error: string | null;
  moveSelected: string | null;
  typeSelected: string | null;
  colorSelected: string | null;
  countFilter: number;
  offset: number;
}

const initialState: HomeState = {
  pokemonList: [],
  pokemonMoves: null,
  pokemonTypes: null,
  pokemonColors: null,
  loading: false,
  filterLoading: false,
  error: null,
  moveSelected: null,
  typeSelected: null,
  colorSelected: null,
  countFilter: 0,
  offset: 0,
};

export default function homeReducer(
  state = initialState,
  action: HomeActions,
): HomeState {
  switch (action.type) {
    case HOME_FETCH_POKEDEXS_REQUEST:
      console.log('action.payload.offset', action.payload.offset);
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
      console.log('action.payload', action.payload);
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
    default:
      return state;
  }
}

const dedupeById = (items: Pokemon[]) => {
  const m = new Map<number, Pokemon>();
  for (const it of items) m.set(it.id, it);
  return [...m.values()];
};
