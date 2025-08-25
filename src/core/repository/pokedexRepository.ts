import api from '@api';
import {
  ColorResponse,
  MoveResponse,
  Pokemon,
  PokemonListResponse,
  TypeResponse,
} from '@models/pokedex';
import { getId } from '@utils/strings';
import { AxiosResponse } from 'axios';

export const getPokemonList = async (
  offset: number = 0,
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(`/pokemon`, {
    params: { limit: 20, offset },
  });
  return response.data;
};

export const getPokemonById = async (id: number | string): Promise<Pokemon> => {
  const response = await api.get<Pokemon>(`/pokemon/${id}`);
  return response.data;
};

export const searchPokemon = async (): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(`/pokemon?limit=10000`);
  return response.data;
};

export const getPokemonMoves = async (): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(`/move`);
  return response.data;
};

export const getPokemonByMoves = async (move: string): Promise<string[]> => {
  const response = await api.get<MoveResponse>(`/move/${move}`);
  return response.data.learned_by_pokemon.map(item => getId(item));
};

export const getPokemonTypes = async (): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(`/type`);
  return response.data;
};

export const getPokemonByTypes = async (type: string): Promise<string[]> => {
  const response = await api.get<TypeResponse>(`/type/${type}`);
  return response.data.pokemon.map((item: any) => getId(item.pokemon));
};

export const getPokemonColors = async (): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(`/pokemon-color`);
  return response.data;
};

export const getPokemonByColors = async (color: string): Promise<string[]> => {
  const response = await api.get<ColorResponse>(`/pokemon-color/${color}`);
  return response.data.pokemon_species.map(item => getId(item));
};

export const speciesPokemon = async (item: Pokemon): Promise<Pokemon> => {
  const res: AxiosResponse<any> = await api.get(item.species.url);
  return {
    ...item,
    colors: { name: res.data.color.name },
    evolutionChain: { url: res.data.evolution_chain.url },
  };
};
