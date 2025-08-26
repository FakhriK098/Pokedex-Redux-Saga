import {
  fetchDetailPokedexFailure,
  fetchDetailPokedexRequest,
  fetchDetailPokedexSuccess,
} from '@actions/detailActions';
import { DETAIL_FETCH_POKEDEXS_REQUEST } from '@actionTypes/detailActionTypes';
import api from '@api';
import {
  Evolution,
  EvolutionResponse,
  Evolves,
  Pokemon,
  SpeciesResponse,
} from '@models/pokedex';
import {
  evolutionPokemon,
  getPokemonById,
  speciesDetailPokemon,
} from '@repository/pokedexRepository';
import { createImgLink } from '@utils/strings';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetchDetailPokedex(
  action: ReturnType<typeof fetchDetailPokedexRequest>,
) {
  try {
    const { id } = action.payload;
    const resDetail: Pokemon = yield call(getPokemonById, id);
    console.log('resDetail', resDetail);
    const species: SpeciesResponse = yield call(
      speciesDetailPokemon,
      resDetail.species.url,
    );
    console.log('species', species);
    const evolution: EvolutionResponse = yield call(
      evolutionPokemon,
      species.evolution_chain.url,
    );
    console.log('evolution', evolution);

    const chain = evolution.chain;
    const evolutionResult: Evolution[] = [];
    let hasEvolution = true;

    if (chain) {
      hasEvolution = chain.evolves_to.length > 0;
      let evolve: Evolves = chain;
      while (hasEvolution) {
        const evol: Evolution = {
          evolutionFrom: evolve.species.name,
          level: evolve.evolves_to[0].evolution_details[0].min_level,
          evolutionTo: evolve.evolves_to[0].species.name,
          evolutionImgFrom: createImgLink(0, evolve.species.url),
          evolutionImgTo: createImgLink(0, evolve.evolves_to[0].species.url),
        };

        evolutionResult.push(evol);
        hasEvolution = evolve.evolves_to[0].evolves_to.length > 0;
        evolve = evolve.evolves_to[0];
      }
    }

    const final = {
      ...resDetail,
      colors: { name: species.color.name },
      evolutionChain: { url: species.evolution_chain.url },
      evolutions: evolutionResult,
    };

    yield put(fetchDetailPokedexSuccess({ detail: final }));
  } catch (err: any) {
    yield put(fetchDetailPokedexFailure(err.message));
  }
}

export default function* detailSagas() {
  yield takeLatest(DETAIL_FETCH_POKEDEXS_REQUEST, fetchDetailPokedex);
}
