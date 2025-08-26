import { PokemonResult } from '@models/pokedex';
import { BASE_URL_IMAGE } from '@env';
export const getId = (poke: PokemonResult): string => {
  const idMatch = poke.name.match(/\/(\d+)\/$/);
  return idMatch ? idMatch[1] : poke.name;
};

export const getOffset = (url: string): number => {
  const match = url.match(/[?&]offset=(\d+)/);
  return match ? Number(match[1]) : 0;
};

export const createImgLink = (id: number, url?: string): string => {
  let imgUrl: string = '';
  if (id > 0) {
    imgUrl = `${BASE_URL_IMAGE}${id}.png`;
  } else {
    const urlSplit = url?.split('/');
    if (urlSplit) {
      const idUrl = urlSplit[urlSplit?.length - 2];
      imgUrl = `${BASE_URL_IMAGE}${idUrl}.png`;
    }
  }

  return imgUrl;
};
