import { RootState } from 'src/app/rootReducer';
import { createSelector } from 'reselect';
import { BASE_URL } from '@env';

const selectedPokemons = (s: RootState) => s.search.pokemons;
const selectedQuery = (s: RootState) => s.search.query;

export const searchFilter = createSelector(
  [selectedPokemons, selectedQuery],
  (pokemons, query) => {
    const q = query?.trim().toLowerCase();
    if (!q) return pokemons;

    if (/^\d+$/.test(q)) {
      const filtered = pokemons.filter(result => {
        return result.url
          .replace(`${BASE_URL}/pokemon/`, '')
          .replace('/', '')
          .includes(q.toLowerCase());
      });
      return filtered;
    } else {
      const filtered = pokemons.filter(result => {
        return result.name.toLowerCase().includes(q.toLowerCase());
      });
      return filtered;
    }
  },
);
